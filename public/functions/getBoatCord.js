const { getCords, connectToDatabase } = require('./helpers/db');


exports.handler = async function() {
    // ... (your existing function code
    try {
        const db = await connectToDatabase();
        const data = await getCords(db, "Boat");
        if(data){
            console.log(data);
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({ lat: data.lat, lon: data.lon }),
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
