const express = require('express');
//const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./db/graphql-schema');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.use(passport.initialize());

app
  //serve API docs
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  //set headers
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
    res.setHeader('Content-Type', 'application/json');
    //allow domains with access to execute all HTTP CRUD methods.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  
  //serve graphQL
  /*.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
  );
  */

/*
 * One line link to routes
 */
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`L05 App listening on port ${port}`);
});
