import { gql } from "graphql-request";

export const getFoodPrefQuery = gql`
    query getFoodPref ($userId: Int!) {
    __typename
    allFoodPreferences(condition: {userId: $userId}) {
        nodes {
            foodByFoodId {
                foodName
                id
            }
        }
    }
    }
`;
