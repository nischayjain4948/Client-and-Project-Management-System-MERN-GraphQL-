

// mongoose models
const { Client, Project } = require('../models/index');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require("graphql");

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
        name: { type: GraphQLString },
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

        // client Mutations

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
        },
        // Project Mutation
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' }
                        }
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const { name, description, clientId, status } = args;
                const project = new Project({
                    name,
                    description, status, clientId
                })
                return await project.save();

            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const { id: _id
                } = args;
                return await Project.findOneAndDelete({ _id });
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' }
                        }
                    }),
                },
            },
            async resolve(parent, args) {
                const { id: _id, name, description, status } = args;
                return await Project.findByIdAndUpdate({ _id }, { $set: { name, description, status } });
            }
        }
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation

})