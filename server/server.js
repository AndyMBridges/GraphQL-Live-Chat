const fs = require('fs');
const http = require('http')
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('xkMBdsE+P6242Z2dPV3RD91BPbLIko7t', 'base64');

const app = express();
app.use(cors(), bodyParser.json(), expressJwt({
  credentialsRequired: false,
  secret: jwtSecret
}));

const typeDefs = fs.readFileSync('./schema.graphql', {encoding: 'utf8'});
const resolvers = require('./resolvers');

function context({ req, connection }) {
  // HTTP requests
  if (req?.user) {
    return {userId: req.user.sub};
  }
  // Websocket connection
  if (connection?.context?.accessToken) {
    const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret)
    return { userId: decodedToken.sub }
  }
  return {};
}

const apolloServer = new ApolloServer({typeDefs, resolvers, context});
apolloServer.applyMiddleware({app, path: '/graphql'});

app.post('/login', (req, res) => {
  const {name, password} = req.body;
  const user = db.users.get(name);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

const httpServer = http.createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)
httpServer.listen(port, () => console.log(`Server started on port ${port}`));
