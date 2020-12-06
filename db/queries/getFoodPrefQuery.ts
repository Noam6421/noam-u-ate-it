import { gql } from "graphql-request";

export const getFoodPrefQuery = gql`
    query getFoodPref ($userId: Int!) {
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
