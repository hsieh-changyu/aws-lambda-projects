const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const axios = require("axios");

// Initialize SNS Client
const snsClient = new SNSClient({ region: process.env.REGION });

const publishToSNS = async (message) => {
  try {
    const command = new PublishCommand({
      Message: message,
      TopicArn: process.env.SNS_TOPIC_ARN,
    });

    await snsClient.send(command);
    console.log("Message published to SNS");
  } catch (error) {
    console.error("Error publishing to SNS:", error);
    throw error;
  }
};

const buildEmailBody = (id, form) => {
  return `
         Message Content: ${form.message}
         Subscriber Name: ${form.name}
         Subsriber Email: ${form.email}
         Subscriber information: ${id.sourceIp} - ${id.userAgent}
      `;
};

module.exports.staticMailer = async (event) => {
  console.log("EVENT--->", event);
  
  try {
    const data = JSON.parse(event.body);
    const emailBody = buildEmailBody(event.requestContext.identity, data);

    await publishToSNS(emailBody);

    // Subscribe user via HTTP request
    try {
      const response = await axios.post(
        "https://pfyct4mruj.execute-api.us-west-2.amazonaws.com/dev/subscribe",
        { email: data.email }
      );
      console.log("Subscription response:", response.data);
    } catch (error) {
      console.error("Error subscribing user:", error);
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support
        "Access-Control-Allow-Credentials": false, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ message: "OK" }),
    };
  } catch (error) {
    console.error("Error in staticMailer:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
