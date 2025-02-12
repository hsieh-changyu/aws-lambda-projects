const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const USERS_TABLE = process.env.USERS_TABLE;

// Initialize AWS SDK v3 DynamoDB Client
const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

module.exports.getSubscribers = async (event) => {
  const params = {
    TableName: USERS_TABLE,
  };

  try {
    const data = await dynamoDb.send(new ScanCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error("DynamoDB Scan Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal Server Error" }),
    };
  }
};
