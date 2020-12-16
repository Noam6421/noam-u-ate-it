import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import {postgraphile} from 'postgraphile';

import getUser from './db/functions/getUser';
import getFood from './db/functions/getFood';
import createUser from './db/functions/createUser';
import updateUser from './db/functions/updateUser';
import createFood from './db/functions/createFood';
import getFoodPref from './db/functions/getFoodPref';
import createFoodPref from './db/functions/createFoodPref';
import updateFoodPref from './db/functions/updateFoodPref';

require('dotenv').config();
const app = express();
const publicPath = path.join(__dirname, 'client', 'build');
const port = process.env.PORT || 8080;

app.use(postgraphile(
    "postgres://vinsblex:qlaqK5kGOSeAHcdyaq3T-b7EOFFk2DXJ@kandula.db.elephantsql.com:5432/vinsblex",
    'u-ate-it-schema', 
    {
        graphiql: true,
        enhanceGraphiql: true,
    }
));

app.use(express.static(publicPath));

app.get('/', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'))
})
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User paths from client to DB
app.get('/user', getUser);
app.post('/user', createUser);
app.put('/user', updateUser);

// Food paths from client to DB
app.get('/food', getFood);
app.post('/food', createFood);

// FoodPref paths from client to DB
app.get('/foodPref', getFoodPref);
app.post('/foodPref', createFoodPref);
app.put('/foodPref', updateFoodPref);


app.get('*', (req,res) =>{
    res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
