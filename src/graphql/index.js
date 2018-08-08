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

// OPERATIONS
export const operations = {

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