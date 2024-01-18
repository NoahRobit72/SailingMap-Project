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


async function getBoatsData(client) {
  try {
    const collection = client.db('HomePage').collection('Page1');
    const result = await collection.aggregate([
        {
            $unwind: "$Location"
        },
        {
            $group: {
                _id: "$BoatNum",
                Location: {
                    $push: {
                        lat: "$Location.lat",
                        lon: "$Location.lon",
                        angle: "$Location.Angle"
                    }
                }
            }
        }
    ]).toArray();
    await client.close();

    return result
  } catch(error) {
    Console.log("There was an error");
  }
}




module.exports = {
    connectToDatabase,
    getCords,
    getBoatsData
}