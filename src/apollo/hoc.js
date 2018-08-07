import React from 'react'
import aws_exports from "../aws-exports";
import {Auth} from "aws-amplify";
import AWSAppSyncClient from "aws-appsync";
import {ApolloProvider} from "react-apollo";
import {Rehydrated} from "aws-appsync-react";

const client = new AWSAppSyncClient({
    url: aws_exports.graphqlEndpoint,
    region: aws_exports.region,
    auth: {
        type: aws_exports.authenticationType,
        jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
    }
});

export const ApolloHoc = Comp => ({children, ...props}) => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <Comp {...props}>
                {children}
            </Comp>
        </Rehydrated>
    </ApolloProvider>
);