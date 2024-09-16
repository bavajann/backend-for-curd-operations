const { MongoClient } = require('mongodb');

// MongoDB connection string
const url = 'mongodb+srv://Bavajann:Bavajann99@cluster2.mf9sa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2';
const client = new MongoClient(url);

let db = null;

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('Bavajann');  // Replace with your database name
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

module.exports = connect;
/*const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Bavajann9:Bavajann9@cluster0.i7ngzk4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('your-database-name');  // Replace with your database name
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

module.exports = connect;
*/