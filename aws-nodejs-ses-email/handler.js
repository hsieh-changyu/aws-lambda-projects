"use strict";

//import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses"); 

const ses = new SESClient({ region: "us-west-2" });

exports.createContact = async (event, context) => {
  console.log("----Received:", event);
  const { to, from, subject, message } = JSON.parse(event.body);

  if (!to || !from || !subject || !message) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 400,
      body: JSON.stringify({ message: " to or from... are not set properly!" }),
    };
  }
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };
  try {
    const command = new SendEmailCommand(params);  
    await ses.send(command); 
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        message: "email sent successfully!",
        success: true,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 400,
      body: JSON.stringify({
        message: "The email failed to send",
        success: true,
      }),
    };
  }
};
