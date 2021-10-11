import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/solid";

function success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto transform translate-y-24">
        <div className="flex flex-col bg-white p-10 rounded-md shadow-sm">
          <div className="flex space-x-2 mb-10">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank You, your order has been confirmed
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We will send a conformation once your item has been shipped, if you would want to check the status of your order('s) please check the link below
          </p>
          <button onClick={() => router.push("/orders")} className="button mt-8">Go to Orders</button>
        </div>
      </main>
    </div>
  )
}

export default success;
