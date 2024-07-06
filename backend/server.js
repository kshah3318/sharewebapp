import mongoose from "mongoose";
import express from "express";
import User from './models/User.js';
import Stock from "./models/Stock.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_DB_STRING = process.env.MONGO_DB_STRING;

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000
let conn = await mongoose.connect(MONGO_DB_STRING)

app.get('/', (req, res) => {
    res.send('Hello World!')
})




app.get('/allStocks', async (req, res) => {
    try {
        const stocks = await Stock.find({}); // Fetch all stocks
        res.status(200).json(stocks);
       
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching stocks' });
    }
})
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add-stock-watchlist', async (req, res) => {
  const { userId, stockId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.watchlist.includes(stockId)) {
      user.watchlist.push(stockId);
      await user.save();
    }

    res.status(200).json({ message: 'Stock added to watchlist' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/user-watchlist', async (req, res) => {
  const { userId, stockId } = req.body;
  try {
    const user = await User.findById(userId);
    console.log(user.watchlist)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const stockIds = user.watchlist;
  //  const getAllStocks = stockIds.map((stockId) => {
  //     const stock = await Stock.findById(stockId)

  //   })
    res.status(200).json({ addedStocks : stockIds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})