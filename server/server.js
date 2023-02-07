const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('firebase/app');
const firestore = require('firebase/firestore');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const firebaseConfig = {
  apiKey: "AIzaSyDbDd57FY0vZFONeo96OpsjEQvle8Y0SPs",
  authDomain: "my-app-99460.firebaseapp.com",
  projectId: "my-app-99460",
  storageBucket: "my-app-99460.appspot.com",
  messagingSenderId: "817428706061",
  appId: "1:817428706061:web:5591cabe0385626ae63644",
  measurementId: "G-NG65SRZTZ0"
};

const server = app.initializeApp(firebaseConfig);
const db = firestore.getFirestore(server);

const exp = express();
async function addTodo(id, userid, dateTime, ttl) {
  await firestore.setDoc(firestore.doc(db, "data", userid), {
    id: id,
    userId: userid,
    date: dateTime,
    ttl: 7 * 24 * 60 * 3600
  });
  console.log("data sent!");
};

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition:{
    info: {
      title: 'Task Selection API',
      descriptoin: "Task Selection API Information",
      contact: {
        name: "Hangning Li"
      },
      servers: ['http://localhost:8000', 'http://10.0.2.2:8000']
    }
  },
  apis: ["server.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
exp.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// allow CORS
exp.use(cors({ origin: true }));
// to support JSON-encoded bodies
exp.use(bodyParser.json());
// to support URL-encoded bodies      
exp.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
/**
 * @swagger
 * /add_to_do:
 * post: 
 *  description: use to store task and user information
 *  responses:
 *    '200':
 *      description: A successful response
 */
exp.post("/add_to_do", (req, res) => {
  var id = req.body.id;
  var date = req.body.date;
  var userid = req.body.userid;
  // send to firestore
  addTodo(id, userid, date);
  // send the userid to the client to get that user's fcmtoken
  res.status(200).send(req.body.userId);
})


exp.listen(8000, () => { console.log("server started on port 8000") })