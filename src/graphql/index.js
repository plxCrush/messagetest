import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

// QUERIES
export const me = gql`
query Me {
    me {
        id
        cognitoId
        username
    }
}`;

export const allUsers = gql`
query AllUsers {
    allUser {
        id
        cognitoId
        username
    }
}`;

// OPERATIONS
export const operations = {

    Me: graphql(me, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
    }),
    AllUsers: graphql(allUsers, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
    }),

};