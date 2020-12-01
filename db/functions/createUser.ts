import { Request, Response } from 'express';
import { request } from "graphql-request";
import { createUserMutation } from "../mutations/createUserMutation";

export default async function createUser(req: Request, res: Response) {
    const data = await request(String(process.env.GRAPHQL_URL), createUserMutation, {
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        idNum: req.body.idNum,
        phone: req.body.phone,
        beer: req.body.beer === '' ? undefined : req.body.beer 
    })
    if (!data) {
        return res.status(400).send(data)
    }
    res.send(JSON.stringify(data))
}
