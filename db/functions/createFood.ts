import { request } from "graphql-request";
import { Request, Response } from 'express';

import { createFoodMutation } from "../mutations/createFoodMutation";

export default async function createFood(req: Request, res: Response) {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), createFoodMutation, {
            foodName: req.body.other
        })   
        res.send({id: data.createFood.food.id})
    } catch (error) {
        return res.status(400).send(error)
    }
}
