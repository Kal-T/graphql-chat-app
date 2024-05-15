import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    gql,
    Observable,
    ApolloLink,
    split,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";