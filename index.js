const express=require('express');
var path = require('path');
const app=express();    
var fs = require('fs');//Enable Https
var https = require('https');
const port=process.env.PORT||8080;
app.use(express.static(path.join(__dirname , 'dist')));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var config = {
    apiKey: "AIzaSyBGJWK3uT_AxlvpabOX5EmXMoCyKt0PMWA",
    authDomain: "lookback-5e389.firebaseapp.com",
    databaseURL: "https://lookback-5e389.firebaseio.com",
    projectId: "lookback-5e389",
    storageBucket: "lookback-5e389.appspot.com",
    messagingSenderId: "759527201976"
  };
  var firebaseClient = require('firebase');
  const admin=require('firebase-admin');
  const acckey=require('./keyfile.json');
  admin.initializeApp({
      credential: admin.credential.cert(acckey),
      databaseURL: config.databaseURL
  });
 
  firebaseClient.initializeApp(config);
  const db=admin.firestore();
app.get('/posts',(req,res)=>{
let alldatadesc=[];

    var data = db.collection('Posts');
    var alldata = data.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
       alldatadesc.push({
"docid":doc.id,
"desc":doc.data().desc,
"img":doc.data().image_url,
"time":doc.data().timestamp,
"error":"null"
       });
      });
      res.json(alldatadesc);
    })
    .catch(err => {
    res.send([{docid:"null",desc:"null",img:"null",time:"null",error:"null"}]);

    });

});
  
  app.get('/',(req,res)=>
{res.send('api working');});
app.get('/login',(req,res)=>
{
    username=req.query.username;
    password=req.query.password;
    console.log("username",username);
    console.log("password",password);
    firebaseClient.auth().signInWithEmailAndPassword(username, password).then(()=>
{
    console.log('signin ok');
   var user= firebaseClient.auth().currentUser.uid;
    console.log(user);
    res.send([{'username':username,'uid':user,'errormsg':'null'}]);
}).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        
        console.log('errormsg',errorMessage);
        res.send([{'username':'error','uid':'error','errormsg':errorMessage}]);
      });

});
app.get('/createuser',(req,res)=>{
    username=req.query.username;
    password=req.query.password;
    firebaseClient.auth().createUserWithEmailAndPassword(username,password).then(()=>{

        res.send([{'usercreation':'done'}]);
    }).catch((err)=>{
        var errmsg=err.message;
        res.send([{'usercreation': errmsg}]);
    });
});
app.get('/signout',(req,res)=>{
    firebaseClient.auth().signOut().then(()=>{
        res.send([{'signout':'successful'}]);
    }).catch((err)=>
    {
        res.send([{'signout':err}]);
    });
});
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname , 'dist/index.html'));
});
app.listen(process.env.PORT,()=>
{
console.log("server connected");
});
