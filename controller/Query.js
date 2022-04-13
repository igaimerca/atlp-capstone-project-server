
import mongoose from 'mongoose';
import Query from "../models/Query.js";
import { QuerySchema } from "../utils/joiValidate.js";


export const getQueries = async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json(queries);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

export const createQuery = async (req, res) => {
    try {
        let body = req.body;
        const { error, value } = QuerySchema.validate(body);
        if (error) {
            res.status(400).json({ success: false, msg: error.details[0].message });
        } else {
            const newQuery = new Query(value);
            await newQuery.save();
            res.status(201).json(newQuery);
        }
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}
