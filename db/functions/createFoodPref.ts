import { request } from "graphql-request";
import { Request, Response } from 'express';

import { createFoodPrefMutation } from "../mutations/createFoodPrefMutation";

export default async function createFoodPref(req: Request, res: Response) {
    req.body.foodPref.map(async (foodPrefItem) => {
        const data = await request(String(process.env.GRAPHQL_URL), createFoodPrefMutation, {
            userId: req.body.userId,
            foodId: parseInt(foodPrefItem.value)
        })
    })
}
