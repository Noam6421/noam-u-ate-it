import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();
const app = express();
const publicPath = path.join(__dirname, 'client', 'public');
const port = process.env.PORT || 3001;
import fs from 'fs';
import {postgraphile} from "postgraphile";
import createUser from "./db/functions/createUser";
import getFood from './db/functions/getFood';

app.use(postgraphile(
    process.env.DATABASE_URL,
    "u-ate-it-schema", 
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
));

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', async (req, res) => {
    try {
        const foods = fs.readFileSync(`foodList.txt`, 'utf-8');
        res.send(foods);
    } catch (error) {
        res.status(400).send()
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = req.body.user;
        try {
            const data = fs.readFileSync(`users/${user}.json`, 'utf-8');
            res.send(data);
        } catch (error) {
            res.status(201).send()
        }
    } catch (err) {
        res.status(400).send();
    }
});

app.post('/home', async (req, res) => {
    try {
        const data = req.body;
        if (data.other !== '' && data.otherChecked){
            fs.appendFileSync('foodList.txt', `,${data.other}`);
            data.data.checkedList.push(data.other)
        }
        let JSONData = JSON.stringify(data.data);
        fs.writeFileSync(`users/${data.data.user}.json`, JSONData);
        res.status(200).send({data: data.data, mes: 'Details saved'});
    } catch (err) {
        res.status(400).send('Error!');
    }
});


app.post('/user', createUser);
app.get('/food', getFood);


app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
