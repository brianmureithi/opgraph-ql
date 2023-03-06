import { gql } from "@apollo/client";

const ADD_PROJECT = gql `
mutation addProject($name:String!, $description:String!,$status:ProjectStatus!,
$clientID:ID! ){
    addProject(name:$name, description:$description,status:$status, clientId:$clientId){
        id
        name
        description
        status
        client{
            name
            email
            phone
            id
        }
    }
}
`
export {ADD_PROJECT}