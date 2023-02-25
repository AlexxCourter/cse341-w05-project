const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Achievements API',
    description:
      'This API allows the client to create, read, update, and delete Users of the Gamified Goal-setting Achievements Application.'
  },
  host: 'achievementsapp.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    oauth: {
      type: "oauth2",
      authorizationUrl: "/auth",
      flow: "implicit",
      scopes: {
        read_Users: 'Authority to read Users in database granted on authentication.',
        write_Users: 'Authority to write Users to database granted on authentication.',
        read_Achievements: 'Authority to read Achievements in database granted on authentication.',
        write_Achievements: 'Authority to write Achievements to database granted on authentication.'
      }
    }
  },
  definitions: {
    User: {
      userName:"Alexx",
      email:"example@test.com",
      pass:"dgfg2235135",
      bio:"A short user-submitted self-description",
      achievements:[{id: "63f1be5d8d3384a384ba324b", completed: true}],
      points: 2000,
      createdDate:"12/04/1994"
    },
    Achievement: {
      taskName: "Clean Kitchen",
      taskPoints: 2000
    }
  }

};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
     'endpointsFiles' only the root file where the route starts,
     such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
