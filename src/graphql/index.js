import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

// QUERIES

// -Commented below were used for MyChatApp api -

// export const createUser = gql`
// mutation CreateUser ($id: ID!, $username: String!) {
//     createUser(input: {id: $id, username: $username}) {
//         __typename
//         id
//         username
//     }
// }`;
//
// export const createConversation = gql`
// mutation CreateConversation ($id: ID!, $name: String!) {
//     createConversation(input: {id: $id, name: $name}) {
//         __typename
//         id
//         name
//     }
// }`;
//
// export const createUserConversations = gql`
// mutation CreateUserConversations ($conversationId: ID!, $userId: ID!) {
//     createUserConversations(input: {conversationId: $conversationId, userId: $userId}) {
//         __typename
//         conversationId
//         userId
//     }
// }`;

export const test1 = gql`
mutation CreateTest1 ($name: String!) {
    createTest1(input: {name: $name}) {
        __typename
        name
    }
}`;

export const test2 = gql`
mutation CreateTest2 ($name: String!, $details: String!) {
    createTest2(input: {name: $name, details: $details}) {
        __typename
        name
        details
    }
}`;


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
            // update: (proxy, {data: {createMessage}}) => {
            //     const query = allMessage;
            //     const variables = {conversationId: props.navigation.state.params.conversation.id};
            //     const data = proxy.readQuery({query, variables});
            //     data.allMessage = {
            //         ...data.allMessage.filter(c => {
            //             return c.content !== createMessage.content &&
            //                 c.createdAt !== createMessage.createdAt
            //         }),
            //         createMessage,
            //     };
            //     proxy.writeQuery({query, data});
            // },
        }),
        props: (props) => ({
            onCreateMessage: ({content, conversationId, createdAt, id, sender}) => {
                return props.mutate({
                    variables: {content, conversationId, createdAt, id, sender},
                    optimisticResponse: () => {
                        return {
                            createMessage: {content, conversationId, sender, createdAt, id, __typename: "Message"}
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

    // CreateUser: graphql(createUser, {
    //         props: (props) => ({
    //             onCreateUser: ({id, username}) => {
    //                 return props.mutate({
    //                     variables: {id, username},
    //                     optimisticResponse: () => {
    //                         return {
    //                             createUser: {id, username, __typename: "User"}
    //                         }
    //                     },
    //                 });
    //             }
    //         })
    //     }
    // ),
    //
    // CreateConversation: graphql(createConversation, {
    //         props: (props) => ({
    //             onCreateConversation: ({id, name}) => {
    //                 return props.mutate({
    //                     variables: {id, name},
    //                     optimisticResponse: () => {
    //                         return {
    //                             createConversation: {id, name, __typename: "Conversation"}
    //                         }
    //                     },
    //                 });
    //             }
    //         })
    //     }
    // ),
    //
    // CreateUserConversations: graphql(createUserConversations, {
    //         props: (props) => ({
    //             onCreateUserConversations: ({conversationId, userId}) => {
    //                 return props.mutate({
    //                     variables: {conversationId, userId},
    //                     optimisticResponse: () => {
    //                         return {
    //                             createUserConversations: {conversationId, userId, __typename: "UserConversation"}
    //                         }
    //                     },
    //                 });
    //             }
    //         })
    //     }
    // ),

    CreateTest1: graphql(test1, {
        props: (props) => ({
            onCreate1: name => {
                return props.mutate({
                    variables: {name},
                    optimisticResponse: () => {
                        return {
                            createTest1: {name, __typename: "Test1"}
                        }
                    },
                });
            }
        })
        }
    ),

    CreateTest2: graphql(test2, {
            props: (props) => ({
                onCreate2: ({name, details}) => {
                    return props.mutate({
                        variables: {name, details},
                        optimisticResponse: () => {
                            return {
                                createTest2: {name, details, __typename: "Test2"}
                            }
                        },
                    });
                }
            })
        }
    ),

};