import { request } from "graphql-request";
import { Request, Response } from 'express';

import { getUserByEmailQuery } from "../queries/getUserByEmailQuery";

const getUser = async (req: Request, res: Response) => {
    const data = await request(String(process.env.GRAPHQL_URL), getUserByEmailQuery, {
        email: req.query.email
    })
    if (!data) {
        return res.status(400).send(data)
    } else if (data.userByEmail === null) {
        return res.send({userId: 'newUser'})
    }
    res.send({userId: data.userByEmail.id, userData: data.userByEmail});
};

export default getUser;
