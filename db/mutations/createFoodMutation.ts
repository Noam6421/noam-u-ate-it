import { gql } from 'graphql-request';

export const createFoodMutation = gql`
    mutation createFood ($foodName: String!) {
        createFood(
            input: { 
                food: { 
                    foodName: $foodName 
                } 
            }
        ) {
            food {
                foodName
                id
            }
        }
    }
`;
