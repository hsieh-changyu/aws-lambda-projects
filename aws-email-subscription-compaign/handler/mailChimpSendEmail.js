const mailchimp = require("@mailchimp/mailchimp_transactional")(
    process.env.MAILCHIMP_TRANSACTIONAL_API_KEY
  );
  const axios = require("axios");
  
  module.exports.mailChimpSendEmail = async (event) => {
    const randQuote = await getQuote();
    const emailHTML = createEmailHTML(randQuote);
    const subs = await getSubs(); // List of subscriber emails
  
    // Prepare recipients
    const recipients = subs.map(email => ({
      email,
      type: "to"
    }));
  
    try {
      const response = await mailchimp.messages.send({
        message: {
          from_email: "customer.care@gogovisor.com", 
          subject: `[Gorgeous Words from the World most wisdom people]`,
          text: "Inspiration thought Today",
          html: emailHTML,
          to: recipients
        }
      });
  
      console.log("Mailchimp Response:", response);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Emails sent successfully" }),
      };
    } catch (error) {
      console.error("Mailchimp Error:", error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message || "Failed to send emails" }),
      };
    }
  };
  
  // Fetch subscribers
  const getSubs = async () => {
    const subscribers = await axios.get(
      "https://pfyct4mruj.execute-api.us-west-2.amazonaws.com/dev/getSubscribers"
    );
    return subscribers.data.map(sub => sub.email);
  };
  
  // Fetch a random quote
  const getQuote = async () => {
    const getQuotes = await axios.get(
      "https://pfyct4mruj.execute-api.us-west-2.amazonaws.com/dev/quotes"
    );
    const quotes = getQuotes.data.quotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  
  const createEmailHTML = (randQuote) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Inspirational Quote</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .quote-box {
          background: #ffebcc;
          padding: 20px;
          border-radius: 6px;
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          line-height: 1.6;
        }
        .quote-author {
          margin-top: 10px;
          font-size: 1rem;
          font-weight: 600;
          color: #555;
        }
        .footer-links {
          margin-top: 20px;
          font-size: 0.9rem;
        }
        .footer-links a {
          text-decoration: none;
          color: #007BFF;
          margin: 0 10px;
        }
        .footer-links a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 style="color: #333;">✨ Daily Inspiration ✨</h2>
        <div class="quote-box">
          <p>"${randQuote.quote}"</p>
          <p class="quote-author">— ${randQuote.author}</p>
        </div>
        <div class="footer-links">
          <a href="#">Unsubscribe</a> | <a href="#">About Us</a>
        </div>
      </div>
    </body>
    </html>`;
  };
  