const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
require("dotenv").config();
const mongoose = require("mongoose");

const {findOrCreateUser} = require('./controllers/userController');
/**
 * Connect to mongo db
 */

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log(`MongoDB Connected`)
}).catch(err => console.error(err));

/**
 * start the apolloServer for gql
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req})=>{
    let authToken = null;
    let currentUser = null;
    try{
      authToken = req.headers.authorization;
      
      if(authToken){
        //find user if exist in db or create new user
        

        currentUser = await findOrCreateUser(authToken);
        console.log({currentUser})
      }
    }catch(err){
      console.error(`Unable to authenticate user with token ${authToken}`)
    }
    return {currentUser}
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url} `);
});
