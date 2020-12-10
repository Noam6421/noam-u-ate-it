import { gql } from 'graphql-request';

export const createFoodPrefMutation = gql`
    mutation createFoodPref($userId: Int!, $foodId: Int!) {
    createFoodPreference(input: {foodPreference: {foodId: $foodId, userId: $userId}}) {
        clientMutationId
        foodPreference {
        foodId
        userId
        }
    }
    } 
`;
