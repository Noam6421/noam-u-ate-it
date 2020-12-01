import { gql } from "graphql-request";

export const getUserDataByEmail = gql`
    query getUserData($email: String) {
        __typename
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
