require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const { graphql } = require("graphql");
const colors = require("colors");
const passport = require("./auth/passport");

// Cross origin Resource cors

const cors = require("cors");

app.use(cors());


const schema = require("./schema/schema");


// require DB
require('./config/db')();



app.use(passport.initialize());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",


}))



app.listen(PORT, () => {
    console.log(`Server is listining on port ${PORT}`.yellow.underline.bold);
})
