import { gql } from "graphql-request";

export const createUserMutation = gql`
    mutation createUser(
        $email: String!
        $name: String!
        $lastName: String!
        $birthDate: Date!
        $idNum: BigFloat!
        $phone: BigFloat!
        $beer: String
    ) {
        createUser(
        input: {
            user: {
            name: $name
            lastName: $lastName
            birthDate: $birthDate
            idNum: $idNum
            phone: $phone
            email: $email
            beer: $beer
            }
        }
        ) {
        clientMutationId
        user{
            id
        }
        }
    }  
`;
