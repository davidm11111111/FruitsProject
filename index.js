const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/fruitsDB";

const client = new MongoClient(uri);

async function createFruitsCollection() {
    try {
        await client.connect();
        const database = client.db('fruitsDB');
        await database.createCollection('fruits'); // Create the "fruits" collection
        console.log("fruits collection created successfully!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function insertFruits() {
    try {
        await client.connect();
        const database = client.db('fruitsDB');
        const fruitsCollection = database.collection('fruits'); // Get a reference to the "fruits" collection

        // Documents to be inserted
        const fruits = [
            { name: "Apple", score: 8, review: "Great fruit" },
            { name: "Orange", score: 6, review: "Kinda sour" }
        ];

        const result = await fruitsCollection.insertMany(fruits); // Insert the documents
        console.log(`${result.insertedCount} documents inserted successfully!`);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function findDocuments() {
    try {
        await client.connect();
        const database = client.db('fruitsDB');
        const fruitsCollection = database.collection('fruits'); // Get a reference to the "fruits" collection

        const cursor = fruitsCollection.find(); // Find all documents in the collection
        const fruits = await cursor.toArray(); // Convert cursor to array of documents

        console.log("All documents in the 'fruits' collection:");
        console.log(fruits);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function deleteFruitsCollection() {
    try {
        await client.connect();
        const database = client.db('fruitsDB');
        await database.collection('fruits').drop(); // Drop the "fruits" collection
        console.log("fruits collection deleted successfully!");
    } finally {
        await client.close();
    }
}

deleteFruitsCollection().then(() => {
    createFruitsCollection().then(() => {
        insertFruits().then(() => {
            findDocuments().catch(console.dir);
        }).catch(console.dir);
    }).catch(console.dir);
}).catch(console.dir);
