const fs = require('fs');
const data = fs.readFileSync('./data/data.json', 'utf8');
// const words=JSON.parse(data);
const cors = require('cors')
const bodyparser = require('body-parser');
const express = require('express');

const app = express();

app.use(cors());

const server = app.listen(5000,listening);

function listening () {
    console.log("Server started at port 5000");
}
app.use(express.static('website'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/',sendAll);
 
function sendAll(request,response){
    response.send(data);
};