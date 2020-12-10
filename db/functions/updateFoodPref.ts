import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { getFoodPrefQuery } from '../queries/getFoodPrefQuery';
import { deleteFoodPrefMutation } from '../mutations/deleteFoodPrefMutation';
import { createFoodPrefMutation } from '../mutations/createFoodPrefMutation';

interface FoodList{
    id: number;
    name: string;
};

const updateFoodPref = async (req: Request, res: Response) => {
    try {
        const prevFoodPrefData = await request(String(process.env.GRAPHQL_URL), getFoodPrefQuery, {
            userId: req.body.userId
        });
        const prevFoodPref: Array<FoodList> = [];
        prevFoodPrefData.allFoodPreferences.nodes.map((node: any) => {
            prevFoodPref.push({name: node.foodByFoodId.foodName, id: node.foodByFoodId.id})
        });
        const foodPref = req.body.foodPref;
        let newPrevFoodPref: Array<FoodList> = prevFoodPref;
        // comparing between foodPrefList in db with foodPrefList the client send
        foodPref.forEach(async food => {
            if (prevFoodPref.some(prevFood => prevFood.name === food.name)){  
                newPrevFoodPref = newPrevFoodPref.filter(prevFood => prevFood.name !== food.name);
            } else if (!(prevFoodPref.some(prevFood => prevFood.name === food.name))) {
                await request(String(process.env.GRAPHQL_URL), createFoodPrefMutation, {
                    userId: req.body.userId,
                    foodId: food.value
                });
            };
        });
        newPrevFoodPref.forEach(async prevFood => {
            await request(String(process.env.GRAPHQL_URL), deleteFoodPrefMutation, {
                userId: req.body.userId,
                foodId: prevFood.id
            });
        });
        res.send('FoodPref updated')  
    } catch (error) {
        return res.status(400).send(error)
    }
};

export default updateFoodPref;
