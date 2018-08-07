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

export const createConversation = gql`
mutation CreateConversation ($createdAt: String!, $id: String!, $name: String!) {
    createConversation(createdAt: $createdAt, id: $id, name: $name) {
        id
        name
        createdAt
    }
}`;

export const myConversations = gql`
query MyConversations {
  me {
    id,
    conversations {
      nextToken
      userConversations{
        conversation {
          __typename
          id
          name
        }
      }
    }
    username
  }
}
`;

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
    // CreateConversation: graphql(createConversation, {
    //     // options: {
    //     //     fetchPolicy: 'cache-and-network'
    //     // },
    //     // props: ({mutate}) => {
    //     //     createConversation: conversation => mutate({variables: conversation})
    //     // }
    //     options: {
    //         refetchQueries: [{ query: myConversations }],
    //         update: (dataProxy, { data: { createConversation } }) => {
    //             const query = myConversations;
    //             const data = dataProxy.readQuery({ query });
    //             console.log('DATA IN UPDATE', data);
    //             data.me.conversations.userConversations = {
    //                 ...data.me.conversations.userConversations,
    //                 createConversation
    //             };
    //             dataProxy.writeQuery({ query, data });
    //         }
    //     },
    //     props: (props) => ({
    //         createConversation: conversation => {
    //             return props.mutate({
    //                 variables: conversation,
    //                 optimisticResponse: () => {
    //                     return {
    //                         createConversation: { ...conversation, __typename: 'Conversation' }
    //                     }
    //                 },
    //             });
    //         }
    //     })
    // }),
    MyConversations: graphql(myConversations, {
        options: {
            fetchPolicy: 'cache-and-network'
        },
    }),

};