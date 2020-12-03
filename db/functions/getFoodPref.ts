import { request } from "graphql-request";
import { Request, Response } from 'express';

import { getFoodPrefQuery } from "../queries/getFoodPrefQuery";

export default async function getFoodPref(req: Request, res: Response) {
    const data = await request(String(process.env.GRAPHQL_URL), getFoodPrefQuery, {
        userId: parseInt(String(req.query.userId))
    })
    const foodPrefList: Object[] = [];
    if (!data) {
        return res.status(400).send(data)
    }
    data.allFoodPreferences.nodes.map((node: any) => {
        foodPrefList.push({name: node.foodByFoodId.foodName, value: node.foodByFoodId.id})
    })
    res.send(foodPrefList)
}
