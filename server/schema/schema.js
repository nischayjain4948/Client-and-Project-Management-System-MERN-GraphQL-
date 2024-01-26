

// mongoose models
const { Client, Project } = require('../models/index');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require("graphql");

// ClientType Defenitation
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            async resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        }


    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        projects: {
            type: new GraphQLList(ProjectType),
            async resolve(parent, args) {
                return await Project.find();
            }


        },

        project: {    // typeDef Query
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {  //particular resolve or handler for the above query
                return await Project.findById(args.id);
            }
        },


        clients: {
            type: new GraphQLList(ClientType),
            async resolve(parent, args) {
                return await Client.find();
            }


        },

        client: {    // typeDef Query
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {  //particular resolve or handler for the above query
                return Client.findById(args.id);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                let { name, email, phone } = args;
                const client = new Client({ name, email, phone });
                return await client.save();
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                return await Client.findByIdAndDelete(args.id);
            }
        },

        updateClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let { id: _id, name = '', email = '', phone = '' } = args;
                return await Client.findOneAndUpdate({ _id }, { $set: { name, email, phone } })
            }
        }
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation

})