import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const Home = ({ randomQuote, error }) => {
  if (error) {
    return <div className="text-red-500 text-center mt-5">An error occurred: {error.message}</div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Welcome</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className="w-full max-w-2xl text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600">Welcome! </h1>
        <h3 className="text-lg text-gray-700 mt-3">
          📯 Go! Subscribe now to reeceive inspirational quotes daily
        </h3>
        
        <p className="mt-5 text-gray-600">👋 Your daily inspiration quote will be similar to this:</p>
        <div className="mt-4 p-5 border rounded-lg bg-gray-50">
          <p className="text-lg font-semibold">"{randomQuote.quote}"</p>
          <blockquote className="mt-2 text-sm text-gray-500">by {randomQuote.author}</blockquote>
        </div>

        <div className="mt-6 w-full">
          <form className="flex flex-col space-y-4" onSubmit={sendMessage}>
            <input className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" type='text' name='name' placeholder='Name' required />
            <input className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" type='email' name='email' placeholder='Email' required />
            <input className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" type='text' name='message' placeholder='Message' required />
            <button className="mt-3 p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all" type='submit'>
              Subscribe
            </button>
          </form>
        </div>
      </main>
      
      <footer className="mt-6 text-gray-500">Powered by Gogovisor</footer>
    </div>
  );
};

const sendMessage = async (event) => {
  event.preventDefault();
  
  await axios.post("https://pfyct4mruj.execute-api.us-west-2.amazonaws.com/dev/static-mailer", {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value,
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

Home.getInitialProps = async () => {
  try {
    const res = await axios.get("https://pfyct4mruj.execute-api.us-west-2.amazonaws.com/dev/quotes");
    const quotes = res.data;
    const randomQuote = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
    return { randomQuote };
  } catch (error) {
    return { error };
  }
};

export default Home;
