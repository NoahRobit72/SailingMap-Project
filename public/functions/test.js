exports.handler = async function(event, context) {
    try {
        // Perform your logic here (e.g., fetch data from a database)
        const data = {hi: "SailingView is working"};
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Internal Server Error' }),
        };
    }
};