const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const USERS_TABLE = process.env.USERS_TABLE;

const client = new DynamoDBClient({ region: process.env.REGION });
const dynamoDb = DynamoDBDocumentClient.from(client);

module.exports.subscribeUser = async (event, context) => {
    try {
        const data = JSON.parse(event.body);
        console.log("EVENT--->", data);

        if (typeof data.email !== "string") {
            console.error("Validation Failed");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid email format" }),
            };
        }

        const timestamp = new Date().toISOString()

        const params = {
            TableName: USERS_TABLE,
            Item: {
                userId: uuidv4(),
                email: data.email,
                subscriber: true,
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        };

        await dynamoDb.send(new PutCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error:  new Error(error)}),
        };
    }
};
