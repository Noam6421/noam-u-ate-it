import { gql } from "graphql-request";

export const getPrefFoodQuery = gql`
    query getPrefFood {
        userById(id: 1) {
        foodPreferencesByUserId {
            nodes {
            foodByFoodId {
                foodName
            }
            }
        }
        }
    }
`;
