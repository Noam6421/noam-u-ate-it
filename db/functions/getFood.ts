import { Request, Response } from 'express';
import { request } from "graphql-request";
import { getFoodQuery } from "../queries/getFoodQuery";

export default async function getFood(req: Request, res: Response) {
    const data = await request(String(process.env.GRAPHQL_URL), getFoodQuery)
    const foodList: String[] = [];
    if (!data) {
        return res.status(400).send(data)
    }
    data.allFoods.nodes.map((node: any) => {
        foodList.push(node.foodName)
    })
    res.send(foodList)
}
