import { gql } from 'graphql-request';

export const getUserDataByEmailWithPref = gql`
    query getUserData($email: String) {
        userByEmail(email: $email) {
        name
        foodPreferencesByUserId {
            nodes {
            foodByFoodId {
                foodName
            }
            }
        }
        id
        idNum
        lastName
        phone
        email
        birthDate
        beer
        }
    }  
`;
