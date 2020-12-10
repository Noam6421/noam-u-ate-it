import { request } from "graphql-request";
import { Request, Response } from 'express';

import { createFoodPrefMutation } from '../mutations/createFoodPrefMutation';

const createFoodPref = async (req: Request, res: Response) => {
    try {
        req.body.foodPref.map(async (foodPrefItem) => {
            const data = await request(String(process.env.GRAPHQL_URL), createFoodPrefMutation, {
                userId: req.body.userId,
                foodId: parseInt(foodPrefItem.value)
            })
        });
    } catch (error) {
        return res.status(400).send(error)
    };
};

export default createFoodPref;

