const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('firebase/app');
const firestore = require('firebase/firestore');

const exp = express();

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
const db =  firestore.getFirestore(server);

async function addTodo(id, dateTime) {
    await firestore.addDoc(firestore.collection(db, "isDone"), {
        id: id,
        date: dateTime
    });
    console.log("data sent!");
};

// allow CORS
exp.use(cors({ origin: true }));
// to support JSON-encoded bodies
exp.use( bodyParser.json() ); 
// to support URL-encoded bodies      
exp.use(bodyParser.urlencoded({     
  extended: true
})); 

exp.post("/add_to_do", (req,res) =>{
    var id = req.body.id;
    var date = req.body.date;
    // send to firestore
    addTodo(id,date);
    res.send("a task is selected successfully");
})


exp.listen(8000, ()=>{console.log("server started on port 8000")})