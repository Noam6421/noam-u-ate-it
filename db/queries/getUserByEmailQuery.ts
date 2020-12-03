import { gql } from "graphql-request";

export const getUserByEmailQuery = gql`
    query getUserByEmail($email: String!) {
    __typename
    userByEmail(email: $email) {
        name
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
