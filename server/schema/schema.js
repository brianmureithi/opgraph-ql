/* Mongoose Models */
const Project = require('../models/Project')
const Client = require('../models/Client')



const {GraphQLObjectType,
  GraphQLID,
   GraphQLString,
   GraphQLSchema,
   GraphQLList,
    GraphQLNonNull,
  GraphQLEnumType}=require('graphql')
const { response } = require('express')

/* Client Type */

const ClientType = new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},

    })
})
const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent, args){
              return Client.findById(parent.clientId)
                
            }
        }

    })
})
/* Query object type, everything is an object type, cool */
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        projects:{
        type:new GraphQLList(ProjectType),
        resolve(parents,args){
          return  Project.find({})
             
        }
        },
      project:{
        type:ProjectType,
        args:{id:{type:GraphQLID}
      },
      resolve(parent,args){
        return Project.findById(args.id)

      }  
    },
        clients:{
        type:new GraphQLList(ClientType),
        resolve(parents,args){
            return Client.find()
        }
        },
      client:{
        type:ClientType,
        args:{id:{type:GraphQLID}
      },
      resolve(parent,args){
        return Client.findById(args.id)

      }  
    }
}
})
//The parent in resolve has the data of the parent model. Can be useful in making deep queries. enhe


//Mutations object type
/* In mutationsin the fields we have arguments and the object type to be returned which are later used in the resolve function  */
const myMutations = new GraphQLObjectType({
  name:'Mutation',
  fields:{

    /* Add client */
    addClient:{
      type:ClientType,
      args:{
        name:{type:GraphQLNonNull(GraphQLString)},
        email:{type:GraphQLNonNull(GraphQLString)},
        phone:{type:GraphQLNonNull(GraphQLString)},
        
      },
      resolve(parent,args){
        const client = new Client({
          name:args.name,
          email:args.email,
          phone:args.phone,
        })
        return client.save()
      }

    },

    /* Delete  Client*/
    deleteClient:{
      type:ClientType,
      args:{
        id:{
          type:GraphQLNonNull(GraphQLID)
        }
      },
      async resolve(parent,args){
       await Project.deleteMany({clientId:args.id})
       return Client.findByIdAndRemove(args.id)
       

      }
    },

    // Add a project

    addProject:{
      type:ProjectType,
      args:{
        name:{type: GraphQLNonNull(GraphQLString)},
        description:{type:GraphQLNonNull(GraphQLString)},
        status:{type:new GraphQLEnumType({
          name:'ProjectStatus',
          values:{
            'new':{value:'Not Started'},
            'progress':{value:'In Progress'},
            'completed':{value:'Completed'},
          }
        }),
        defaultValue:'Not Started',
           
      },
      clientId:{type:GraphQLNonNull(GraphQLID)},
      },
      resolve(parent,args){
        const newProject = new Project({
          name:args.name,
          description:args.description,
          status:args.status,
          clientId:args.clientId
        })
       return newProject.save()
      
      }
    },
    /* Mutation to delete a project */
    deleteProject:{
      type:ProjectType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        return Project.findByIdAndRemove(args.id)

      }
    },
    /* Update a project mutation */
    updateProject:{
      type:ProjectType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)},
        name:{type: GraphQLString},
        description:{type:GraphQLString},
        status:{type:new GraphQLEnumType({
          name:'ProjectStatusUpdate',
          values:{
            'new':{value:'Not Started'},
            'progress':{value:'In Progress'},
            'completed':{value:'Completed'},
          }
        }),
   
           
      },
      clientId:{type:GraphQLID},
      },
      resolve(parent, args){
        return Project.findByIdAndUpdate(
          args.id,{
            $set:{
              name:args.name,
            description:args.description,
            status:args.status,
            clientId:args.clientId

            }
            
          },
          /* Create if not exist */
          {new:true}
        )

      }
    }

  }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:myMutations
})