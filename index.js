const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const torrentParser = require('./src/torrent-parser');
const download = require('./src/download');

// const decoded = torrentParser.open('puppy.old.torrent');
const ADDRESS = 'http://localhost';
const PORT = process.env.port || 3000;

// let info = download(decoded);
// app.get('/', function(req, res){
//     res.send(info);
// });

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');},
    filename : (req, file, callback) => {
        callback(null, Date.now()+file.originalname );
    }
});


var upload = multer({ storage: storage}).single('torrent');
//enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
  
app.post('/torrent', function(req, res){
    upload(req, res, function(err){
        if(err){
            return res.send("error");
        }
        const decoded = torrentParser.open(req.file.path);
        download(decoded, function(theList){
            res.send(theList);
        });
    });
});
app.listen(PORT, function(){
    console.log('the app is listening on 3000');
})