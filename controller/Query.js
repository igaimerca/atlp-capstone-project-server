
const mongoose = require('mongoose');
const Query = require("../models/Query");
const { QuerySchema } = require("../utils/joiValidate.js");


const getQueries = async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json(queries);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const createQuery = async (req, res) => {
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

module.exports = {
    getQueries, createQuery 
}