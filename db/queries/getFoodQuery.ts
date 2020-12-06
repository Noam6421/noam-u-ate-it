import { gql } from "graphql-request";

export const getFoodQuery = gql`
    query getFood {
        allFoods {
        nodes {
            foodName
            id
        }
        }
    }
`;
