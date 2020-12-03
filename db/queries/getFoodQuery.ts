import { gql } from "graphql-request";

export const getFoodQuery = gql`
    query getFood {
        __typename
        allFoods {
        nodes {
            foodName
            id
        }
        }
    }
`;
