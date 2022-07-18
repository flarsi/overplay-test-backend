
const animationsData = require("../public/animation_data.json")
const { validationResult } = require("express-validator");
async function getAnimationsData(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      res.status(200).send(animationsData);
    } catch (e) {
      res.status(500).send({ message: `Something wrong --> ${e.message}` });
    }
  }

  module.exports = {
    getAnimationsData
  };