const fbapp = require("firebase/app");

//import { getAnalytics } from "firebase/analytics";
const fbfr=require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyALw4KXQzrH-TDOqVL1ECdMWuSpSs9BX4I",
    authDomain: "birds-1d792.firebaseapp.com",
    projectId: "birds-1d792",
    storageBucket: "birds-1d792.appspot.com",
    messagingSenderId: "737458750010",
    appId: "1:737458750010:web:1322497d6950faa309eb03",
    measurementId: "G-GK11E48R97"
};

const App = fbapp.initializeApp(firebaseConfig);
const db = fbfr.getFirestore(App);


const express = require('express');
const PORT = process.env.PORT || 3010;
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());

const todoItems = require('./todo-items.json');
app.get('/api/:id', async (req, res) => {
    const querySnapshot = await fbfr.getDocs(fbfr.collection(db, "birds"));
    querySnapshot.forEach(doc => {
        if (doc.data().id === req.params.id)
            res.json(doc.data());
    });


});

app.listen(PORT,  () => {
    console.log(`Server listening on ${PORT}`);
});

