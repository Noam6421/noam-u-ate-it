import { gql } from 'graphql-request';

export const deleteFoodPrefMutation = gql`
    mutation deleteFoodPref($userId: Int!, $foodId: Int!) {
    deleteFoodPreferenceByUserIdAndFoodId(
        input: { userId: $userId, foodId: $foodId }
    ) {
        foodPreference {
        foodId
        userId
        }
    }
    }
`;
