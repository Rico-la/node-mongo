const WilderModel = require("../models/Wilder");
const createError = require('http-errors')


module.exports = {
    create: async (req, res, next) => {
      try {
        const wilder =  new WilderModel(req.body);
        const result = await wilder.save();
        res.json({ success: true, result });
        
      } catch (error) {
        throw createError(400, { message: 'Something wrong ' + error.message , stack: error.stack })
      } 
    },

    read : async (req, res, next) => {
      try {
        const result = await WilderModel.find();
        res.json({ success: true, result: result})
      } catch (error) {
        next(error)
      }
    },

    update: async (req, res, next) => {
      try {
        const result = await WilderModel.updateOne({_id: req.body._id}, req.body)
        res.json(result)
      } catch (error) {
        next(error)
        
      }
    },
    
      delete: async (req, res, next) => {
        try {
          const result = WilderModel.remove({ _id: req.body._id});
          res.json({ success: true, result: result })
        } catch (error) {
          next(error) 
        }
    },
    
}