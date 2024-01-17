const { getBoatsData, connectToDatabase } = require('./helpers/db');


exports.handler = async function() {
    // ... (your existing function code
    try {
        console.log("2");
        const db = await connectToDatabase();
        console.log("2");
        const data = await getBoatsData(db);
        console.log("2");

        var formattedData = await data.map(item => ({
            Location: item.Location,
            BoatNum: item._id
        }));
        // console.log(formattedData[0].Location[0]);

        if(formattedData){
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify(formattedData),
            };
        }
    }catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: "error"}),
        };
    }     
}
