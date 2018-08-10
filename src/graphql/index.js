import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

// QUERIES
export const createUser = gql`
mutation CreateUser ($username: String!) {
    createUser(username: $username) {
        __typename
        username
    }
}`;

export const createConversation = gql`
mutation CreateConversation ($id: ID!, $name: String!) {
    createConversation(id: $id, name: $name) {
        __typename
        id
        name
    }
}`;

export const createUserConversations = gql`
mutation CreateUserConversations ($conversationId: ID!, $userId: ID!) {
    createUserConversations(conversationId: $conversationId, userId: $userId) {
        __typename
        conversationId
        userId
    }
}`;

export const me = gql`
query Me {
    me {
        id
        username
    }
}`;

export const myConversations = gql`
query Me {
    me {
        id
        username
        conversations {
            userConversations {
                conversation {
                    id
                    name
                }
            }
        }
    }
}`;

export const allUser = gql`
query AllUser {
    allUser {
        id
        username
        conversations {
            userConversations {
                conversation {
                    id
                    name
                }
            }
        }
    }
}`;

export const createMessage = gql`
mutation CreateMessage(
    $content: String,
    $conversationId: ID!,
    $createdAt: String!,
    $id: ID!) {
    createMessage(
        content: $content,
        conversationId: $conversationId,
        createdAt: $createdAt,
        id: $id
    ) {
        __typename
        content
        createdAt
        conversationId
        id
        sender
        author {
            id
            username
        }
             
    }
}`;

export const allMessage = gql`
query AllMessage($conversationId: ID!) {
    allMessage(conversationId: $conversationId) {
        __typename
        id
        content
        sender
        createdAt
        author {
            __typename
            id
            username
        }
    }
}`;

export const subscribeToNewMessage = gql`
subscription SubscribeToNewMessage($conversationId: ID!) {
    subscribeToNewMessage(conversationId: $conversationId) {
        __typename
        id
        content
        sender    
        createdAt
          
    }
}`;


// OPERATIONS
export const operations = {

    CreateUser: graphql(createUser, {
            props: (props) => ({
                onCreateUser: ({username}) => {
                    return props.mutate({
                        variables: {username},
                        optimisticResponse: () => {
                            return {
                                createUser: {username, __typename: "User"}
                            }
                        },
                    });
                }
            })
        }
    ),

    CreateConversation: graphql(createConversation, {
            props: (props) => ({
                onCreateConversation: ({id, name}) => {
                    return props.mutate({
                        variables: {id, name},
                        optimisticResponse: () => {
                            return {
                                createConversation: {id, name, __typename: "Conversation"}
                            }
                        },
                    });
                }
            })
        }
    ),

    CreateUserConversations: graphql(createUserConversations, {
            props: (props) => ({
                onCreateUserConversations: ({conversationId, userId}) => {
                    return props.mutate({
                        variables: {conversationId, userId},
                        optimisticResponse: () => {
                            return {
                                createUserConversations: {conversationId, userId, __typename: "UserConversation"}
                            }
                        },
                    });
                }
            })
        }
    ),

    Me: graphql(me, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: (props) => ({
            me: props.data.me,
            loading: props.data.loading
        }),
    }),

    MyConversations: graphql(myConversations, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: (props) => ({
            conversations: props.data.me && props.data.me.conversations ? props.data.me.conversations.userConversations : [],
            loading: props.data.loading
        }),
    }),

    AllUser: graphql(allUser, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: (props) => ({
            users: props.data.allUser,
            loading: props.data.loading
        }),
    }),

    CreateMessage: graphql(createMessage, {
        options: props => ({
            fetchPolicy: 'cache-and-network',
            update: (proxy, {data: {createMessage}}) => {
                const query = allMessage;
                const variables = {conversationId: props.navigation.state.params.conversation.id};
                const data = proxy.readQuery({query, variables});
                data.allMessage.push(createMessage);
                proxy.writeQuery({query, variables, data});
            },
        }),
        props: (props) => ({
            onCreateMessage: ({...message}) => {
                return props.mutate({
                    variables: {...message},
                    optimisticResponse: () => {
                        return {
                            createMessage: {
                                ...message,
                                author: {...message.author, __typename: "User"},
                                __typename: "Message"}
                        }
                    }
                })
            }
        }),
    }),

    AllMessage: graphql(allMessage, {
        options: (ownProps) => ({
            fetchPolicy: 'cache-and-network',
            variables: {
                conversationId: ownProps.navigation.state.params.conversation.id,
            }
        }),
        props: props => {
            return {
                messages: props.data.allMessage,
                subscribeToNewMessage: ({conversationId}) => {
                    props.data.subscribeToMore({
                        document: subscribeToNewMessage,
                        variables: {
                            conversationId: conversationId ,
                        },
                        updateQuery: (prev, { subscriptionData: { data: { subscribeToNewMessage } } }) => {
                            return {
                                ...prev,
                                allMessage: [...prev.allMessage.filter(message => message.id !== subscribeToNewMessage.id),
                                    subscribeToNewMessage]
                            }
                        }
                    })
                }
            }
        }
    }),

};