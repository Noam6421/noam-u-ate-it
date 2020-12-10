import { gql } from 'graphql-request';

export const updateUserMutation = gql`
    mutation updateUser(
        $email: String!
        $name: String!
        $lastName: String!
        $birthDate: Date!
        $idNum: String!
        $phone: String!
        $beer: String
    ) {
    updateUserByEmail(
        input: {
        email: $email
        userPatch: {
            beer: $beer
            birthDate: $birthDate
            idNum: $idNum
            lastName: $lastName
            name: $name
            phone: $phone
        }
        }
    ) {
        user {
        id
        }
    }
    }
`;
