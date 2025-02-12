# AWS-Lambda-Projects
There are two Lambda projects developed in this repo
1. Customer Support Form using Next.js with AWS node.js Lambda and SES
2. Thumbnail generation through AWS Lambda using Serverless framework
3. Subscription for inspiration quote through AWS Lambda using Serverless framework


## Customer Support Form using Next.js with AWS Lambda and SES
folder: aws-nodejs-ses-email

The aim of this project is to demonstrate the capability of using aws simple email service and lambda function. The next.js front-end was applied for a fast deployment for the customer support form.


**Flow Diagram:**
<br />
![FlowDiagram](https://drive.google.com/uc?id=1f0ljnCvjjyHK3cp8fUbOx1gwo6GDJcPv)
<br />
Fig. A simple Node.js lambda functions with AWS SES support was applied to fulfill the above flow diagram. Next.js was used for the fast developement of the front-end.


## Thumbnail generation through AWS Lambda using Serverless framework
folder: aws-python-thumbnail

The goal of this project is try to demonstrate the capability of using serveral aws lambda functions applied in the following diagram


**Flow Diagram:**
<br />
![FlowDiagram](https://drive.google.com/uc?id=1dfQ7WMUDFx8SpsY4ZO_sJ1YaA0xRIS_T)
<br />
Fig. Four lambda functions have been applied in order to fulfill the tasks described in the above diagram.

In order for aws lambda to work properly using PIL library, we must include a ARN layer, please see https://github.com/keithrozario/Klayers?tab=readme-ov-file for more details


## Subscription for inspiration quote through AWS Lambda using Serverless framework
folder: aws-email-subscription-compaign

The aim of this project is to give a user subscription through email for an inspirational quote everyday. We have three phases shown in the figure.


**Flow Diagram:**
<br />
![FlowDiagram](https://drive.google.com/uc?id=1LqIDjiriC-UCiyBENdKiAp-GtSEwEZ-p)
<br />

Phase 1: \
We used Next.js with tailwind.css to have a form for users to register subscriptions. We also write user information to DynamoDB.
The S3 bucket is used to save a quote json file. \
Phase 2: \
Prepare email body to publish a simple notification topic once a user registers the subscription. This will notify the admin through email. \
Phase 3: \
We set-up a cron job through Cloudwatch EventBridge to ensure users receive inspiration quotes everyday.

  


