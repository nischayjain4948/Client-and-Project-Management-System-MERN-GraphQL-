import { gql } from '@apollo/client'

const DELETE_ClIENT = gql`
mutation deleteClient($id:ID!){
    deleteClient(id:$id){
        id
        name
        email
        phone
    }
}
`;


export { DELETE_ClIENT }