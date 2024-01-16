const { MongoClient } = require('mongodb');
require('dotenv').config();


const connectToDatabase = async () => {
    const client = await MongoClient.connect(
        process.env.DBURI
    );
    return client;
}


const getCords = async (client, inputCourseElement) => {
    const filter = {
        'Name': inputCourseElement
      };

    const coll = client.db('HomePage').collection('CourseLayout');
    const cursor = coll.find(filter);
    const result = await cursor.toArray();
    return result[0].Location;
}

module.exports = {
    connectToDatabase,
    getCords
}