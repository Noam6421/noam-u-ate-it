import { gql } from 'graphql-request';

export const getFoodQuery = gql`
    query getFood {
        allFoods(orderBy: FOOD_NAME_ASC) {
        nodes {
            foodName
            id
        }
        }
    }
`;
