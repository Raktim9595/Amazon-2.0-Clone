import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutCard from "../components/CheckoutCard";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";
import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  let total = useSelector(selectTotal);

  const createCheckoutSession = async() => {
    const stripe = await stripePromise;
    //calling to the backend to create the checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });
    //redirect user to checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if(!result) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100 pb-0.5 relative">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto transform translate-y-24 mb-28">
        {/* left section   */}
        <div className="flex-grow mb-5 ml-5 mr-5 shadow-sm">
          <div className="rounded-t-lg overflow-hidden">
            <Image 
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col p-5 space-y-10  bg-white shadow-md">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl border-b pb-4">
              {items.length === 0 ? "Your shopping basket is empty" : "Your Basket" }
            </h1>
            {items.length !== 0 && (
              <p className="text-xs text-gray-500 italic">This is just a test build and free version of stripe so you can add only 7 different types of items</p>
            )}
            {items.map(({ id, price, rating, description, image, category, hasPrime, title }) => (
              <CheckoutCard key={id} 
                id={id}
                price={price}
                rating={rating}
                description={description}
                image={image}
                category={category}
                hasPrime={hasPrime}
                title={title}
              />
            ))}
          </div>
        </div>

        {/* right section   */}
        <div className={`bg-white p-10 lg:p-6 m-5 mb-10 rounded-sm shadow-md ${items.length === 0 && "hidden"} flex flex-col space-y-2`}>
          {items.length>0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal({items.length}) items
                <span className="font-bold">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>
              <button onClick={createCheckoutSession} role="link" className={`button mt-2 py-2 px-4 rounded-sm ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                {!session ? 'SignIn to checkout' : 'proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default checkout;
