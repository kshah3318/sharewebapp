import mongoose from "mongoose";
import express from "express";
import User from './models/User.js';
import Stock from "./models/Stock.js";
import bcrypt from 'bcryptjs';
import cors from 'cors';


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000
let conn = await mongoose.connect("mongodb://127.0.0.1:27017/marketPortfolio")
console.log("my abc")

app.get('/', (req, res) => {
  
//   const stock = new Stock({
//     "id": 1,
//     "companyName": "HDFC Bank",
//     "symbol": "HDFC",
//     "currentPrice": 1783.8,
//     "previousPrice": 1794,
//     "changeAmount": 67,
//     "changePercentage": 4.3
//   })
//   stock.save() 
    res.send('Hello World!')
})




app.get('/allStocks', async (req, res) => {
    try {
        const stocks = await Stock.find({}); // Fetch all stocks
        console.log(stocks)
        res.status(200).json(stocks);
       
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching stocks' });
    }
})
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    //res.send('Hello World from sign up!')
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})