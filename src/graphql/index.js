import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

// QUERIES

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
mutation CreateUser ($id: ID!, $username: String!) {
    createUser(input: {id: $id, username: $username}) {
        __typename
        id
        username
    }
}`;

export const createConversation = gql`
mutation CreateConversation ($id: ID!, $createdAt: String!, $name: String!) {
    createConversation(input: {id: $id, createdAt: $createdAt, name: $name}) {
        __typename
        id
        name
        createdAt
    }
}`;

export const createUserConversation = gql`
mutation CreateUserConversation ($conversationId: ID!, $userId: ID!) {
    createUserConversation(input: {conversationId: $conversationId, userId: $userId}) {
        __typename
        conversationId
        userId
    }
}`;

// OPERATIONS
export const operations = {

    CreateUser: graphql(createUser, {
            props: (props) => ({
                onCreateUser: ({id, username}) => {
                    return props.mutate({
                        variables: {id, username},
                        optimisticResponse: () => {
                            return {
                                createUser: {id, username, __typename: "User"}
                            }
                        },
                    });
                }
            })
        }
    ),

    CreateConversation: graphql(createConversation, {
            props: (props) => ({
                onCreateConversation: ({id, createdAt, name}) => {
                    return props.mutate({
                        variables: {id, createdAt, name},
                        optimisticResponse: () => {
                            return {
                                createConversation: {id, createdAt, name, __typename: "Conversation"}
                            }
                        },
                    });
                }
            })
        }
    ),

    CreateUserConversation: graphql(createUserConversation, {
            props: (props) => ({
                onCreateUserConversation: ({conversationId, userId}) => {
                    return props.mutate({
                        variables: {conversationId, userId},
                        optimisticResponse: () => {
                            return {
                                createUserConversation: {conversationId, userId, __typename: "UserConversation"}
                            }
                        },
                    });
                }
            })
        }
    ),

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