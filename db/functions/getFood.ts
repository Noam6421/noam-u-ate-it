import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { getFoodQuery } from '../queries/getFoodQuery';

const getFood = async (req: Request, res: Response) => {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), getFoodQuery)
        const foodList: Object[] = [];
        if (!data) {
            return res.status(400).send({data, a: process.env.GRAPHQL_URL })
        }
        data.allFoods.nodes.map((node: any) => {
            foodList.push({name: node.foodName, value: node.id})
        })
        res.send(foodList)    
    } catch (error) {
        return res.status(400).send(error)
    }
};

export default getFood;

