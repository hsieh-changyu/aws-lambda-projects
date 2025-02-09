import Head from 'next/head';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const sendMessage = async (event) => {
    event.preventDefault();

    const res = await fetch(
      "https://pw3xxuzwec.execute-api.us-west-2.amazonaws.com/dev/contact-us",
      {
        body: JSON.stringify({
          to: event.target.to.value,
          from: event.target.from.value,
          subject: event.target.subject.value,
          message: event.target.message.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <Head>
        <title>Customer Support Form</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Customer Support Form</h1>

        <form onSubmit={sendMessage} className="space-y-4">
          <div>
            <label htmlFor='to' className="block text-gray-700 font-medium">To:</label>
            <input id='to' name='to' type='email' required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label htmlFor='from' className="block text-gray-700 font-medium">From:</label>
            <input id='from' name='from' type='email' required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label htmlFor='subject' className="block text-gray-700 font-medium">Subject:</label>
            <input id='subject' name='subject' type='text' required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label htmlFor='message' className="block text-gray-700 font-medium">Message:</label>
            <textarea id='message' name='message' rows="4" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <button type='submit' className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Send</button>
        </form>
      </main>

      <footer className="mt-8 text-gray-500">Powered by Gogovisor</footer>
    </div>
  );
}
