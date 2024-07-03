/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('marketPortfolio');

// Insert a few documents into the sales collection.
db.getCollection('Stock').insertMany([
    {
        "id": 1,
        "companyName": "HDFC Bank",
        "symbol": "HDFC",
        "currentPrice": 1783.8,
        "previousPrice": 1794,
        "changeAmount": 67,
        "changePercentage": 4.3
      }
      {
        "id": 2,
        "companyName": "ICICI Bank",
        "currentPrice": 650.7,
        "previousPrice": 660,
        "changeAmount": 5,
        "changePercentage": 0.8
      },
      {
        "id": 3,
        "companyName": "Reliance Industries",
        "currentPrice": 2350.2,
        "previousPrice": 2370,
        "changeAmount": 12,
        "changePercentage": 0.5
      },
      {
        "id": 4,
        "companyName": "Tata Motors",
        "currentPrice": 460.5,
        "previousPrice": 470,
        "changeAmount": 8,
        "changePercentage": 1.7
      },
      {
        "id": 5,
        "companyName": "Infosys",
        "currentPrice": 1530.15,
        "previousPrice": 1545,
        "changeAmount": 10,
        "changePercentage": 0.7
      },
      {
        "id": 6,
        "companyName": "Wipro",
        "currentPrice": 440.3,
        "previousPrice": 450,
        "changeAmount": 6,
        "changePercentage": 1.4
      },
      {
        "id": 7,
        "companyName": "Bharti Airtel",
        "currentPrice": 705.25,
        "previousPrice": 710,
        "changeAmount": 4,
        "changePercentage": 0.6
      },
      {
        "id": 8,
        "companyName": "Maruti Suzuki",
        "currentPrice": 7650.6,
        "previousPrice": 7700,
        "changeAmount": 20,
        "changePercentage": 0.3
      },
      {
        "id": 9,
        "companyName": "Hindustan Unilever",
        "currentPrice": 2335.75,
        "previousPrice": 2350,
        "changeAmount": 7,
        "changePercentage": 0.3
      },
      {
        "id": 10,
        "companyName": "Larsen & Toubro",
        "currentPrice": 1575.8,
        "previousPrice": 1590,
        "changeAmount": 9,
        "changePercentage": 0.6
      },
      {
        "id": 11,
        "companyName": "Bajaj Finance",
        "currentPrice": 7150.4,
        "previousPrice": 7200,
        "changeAmount": 15,
        "changePercentage": 0.2
      },
      {
        "id": 12,
        "companyName": "HCL Technologies",
        "currentPrice": 1055.6,
        "previousPrice": 1070,
        "changeAmount": 12,
        "changePercentage": 1.1
      },
      {
        "id": 13,
        "companyName": "Axis Bank",
        "currentPrice": 715.5,
        "previousPrice": 725,
        "changeAmount": 6,
        "changePercentage": 0.8
      },
      {
        "id": 14,
        "companyName": "SBI",
        "currentPrice": 425.8,
        "previousPrice": 430,
        "changeAmount": 3,
        "changePercentage": 0.7
      },
      {
        "id": 15,
        "companyName": "Mahindra & Mahindra",
        "currentPrice": 780.3,
        "previousPrice": 790,
        "changeAmount": 8,
        "changePercentage": 1
      },
      {
        "id": 16,
        "companyName": "TCS",
        "currentPrice": 3475.2,
        "previousPrice": 3500,
        "changeAmount": 18,
        "changePercentage": 0.5
      },
      {
        "id": 17,
        "companyName": "Titan Company",
        "currentPrice": 2005.75,
        "previousPrice": 2020,
        "changeAmount": 10,
        "changePercentage": 0.5
      },
      {
        "id": 18,
        "companyName": "Nestle India",
        "currentPrice": 18650.8,
        "previousPrice": 18700,
        "changeAmount": 20,
        "changePercentage": 0.1
      },
      {
        "id": 19,
        "companyName": "Kotak Mahindra Bank",
        "currentPrice": 1740.9,
        "previousPrice": 1750,
        "changeAmount": 6,
        "changePercentage": 0.3
      },
      {
        "id": 20,
        "companyName": "Asian Paints",
        "currentPrice": 3105.25,
        "previousPrice": 3120,
        "changeAmount": 12,
        "changePercentage": 0.4
      },
      {
        "id": 21,
        "companyName": "Hindalco",
        "currentPrice": 385.6,
        "previousPrice": 390,
        "changeAmount": 7,
        "changePercentage": 1.8
      },
      {
        "id": 22,
        "companyName": "ITC",
        "currentPrice": 245.7,
        "previousPrice": 250,
        "changeAmount": 5,
        "changePercentage": 2
      },
      {
        "id": 23,
        "companyName": "Power Grid",
        "currentPrice": 210.8,
        "previousPrice": 215,
        "changeAmount": 4,
        "changePercentage": 1.9
      },
      {
        "id": 24,
        "companyName": "JSW Steel",
        "currentPrice": 670.5,
        "previousPrice": 675,
        "changeAmount": 6,
        "changePercentage": 0.9
      },
      {
        "id": 25,
        "companyName": "Adani Ports",
        "currentPrice": 745.35,
        "previousPrice": 750,
        "changeAmount": 8,
        "changePercentage": 1.1
      },
      {
        "id": 26,
        "companyName": "Tech Mahindra",
        "currentPrice": 1135.45,
        "previousPrice": 1145,
        "changeAmount": 5,
        "changePercentage": 0.4
      },
      {
        "id": 27,
        "companyName": "Ultratech Cement",
        "currentPrice": 7215.5,
        "previousPrice": 7250,
        "changeAmount": 25,
        "changePercentage": 0.3
      },
      {
        "id": 28,
        "companyName": "Grasim",
        "currentPrice": 1520.75,
        "previousPrice": 1530,
        "changeAmount": 7,
        "changePercentage": 0.5
      },
      {
        "id": 29,
        "companyName": "Sun Pharma",
        "currentPrice": 825.8,
        "previousPrice": 835,
        "changeAmount": 6,
        "changePercentage": 0.7
      },
      {
        "id": 30,
        "companyName": "IndusInd Bank",
        "currentPrice": 1025.6,
        "previousPrice": 1035,
        "changeAmount": 8,
        "changePercentage": 0.8
      },
      {
        "id": 31,
        "companyName": "BPCL",
        "currentPrice": 380.2,
        "previousPrice": 385,
        "changeAmount": 4,
        "changePercentage": 1.1
      },
      {
        "id": 32,
        "companyName": "Cipla",
        "currentPrice": 990.5,
        "previousPrice": 1000,
        "changeAmount": 5,
        "changePercentage": 0.5
      },
      {
        "id": 33,
        "companyName": "Dr. Reddy's",
        "currentPrice": 4925.4,
        "previousPrice": 4950,
        "changeAmount": 15,
        "changePercentage": 0.3
      },
      {
        "id": 34,
        "companyName": "Eicher Motors",
        "currentPrice": 2580.25,
        "previousPrice": 2600,
        "changeAmount": 10,
        "changePercentage": 0.4
      }
]);



