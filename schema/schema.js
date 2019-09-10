const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

//Consctructor Function Passing Name and Field as an object
const PlayerType = new GraphQLObjectType({
  name: "Player",
  fields:()=> ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type:GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args: {id:{type:GraphQLString}},
            resolve(root, args){
            return axios.get(`http://localhost:3000/players/${args.id}`)
              .then(response => response.data);
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery
})
