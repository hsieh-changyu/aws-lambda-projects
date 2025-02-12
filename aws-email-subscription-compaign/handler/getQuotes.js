const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3"); 
const REGION = process.env.REGION;

const s3Client = new S3Client({ region: REGION });

module.exports.getQuotes = async (event, context, callback) => {
    console.log("Incoming event --->", event);

    const params = {
        Bucket: "gogovisor-json-quote-bucket",
        Key: "quotes.json"
    };

    try {
        const command = new GetObjectCommand(params);
        const s3_response = await s3Client.send(command);

        // Convert stream to string
        const streamToString = (stream) =>
            new Promise((resolve, reject) => {
                const chunks = [];
                stream.on("data", (chunk) => chunks.push(chunk));
                stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
                stream.on("error", reject);
            });

        const data = await streamToString(s3_response.Body);
        
        var json = JSON.parse(data)
        console.log("JSON--->", json);

        const resp = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": "*",
            },
            statusCode: 200,
            body: JSON.stringify(json)

        }
        callback(null, resp)
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }

}