const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItems');



router.post('/', async (req, res) => {
    try {
      const data = req.body;
      //Create a new person document using the Mongoose model.
      const newMenuItem = new MenuItem(data);
  
      //save  the new person to the database
      const response = await newMenuItem.save();
      console.log('Data saved!');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error" });
    }
  });
  
  
  router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('Data fetched!');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error" });
    }
  });
  
  router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy') {


            const response = await MenuItem.find({ taste: tasteType });
            console.log('Response fetched!');
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: "Invalid work type" });

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" });
    }
});


router.put('/:id', async (req, res) => {


  try {
      const menuItemId = req.params.id;
      const updateMenuItemData = req.body;

      const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuItemData, {
          new: true, //Return the update documents
          runValidators: true,//Run mongoose validation
      })


      if (!response) {
          return res.status(404).json({ error: "Menu not found" });
      }

      console.log('Data updated!');
      res.status(200).json(response);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error" });
  }
});


router.delete('/:id', async (req, res) => {
  try {
      const menuItemId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuItemId)

      if (!response) {
          return res.status(404).json({ error: "Menu not found" });
      }

      console.log('Data Deleted!');
      res.status(200).json({ message: "Menu deleted successfully" });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error" });
  }
});


  module.exports = router;
  