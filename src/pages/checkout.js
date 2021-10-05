import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutCard from "../components/CheckoutCard";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";

function checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  let total = useSelector(selectTotal);

  return (
    <div className="bg-gray-200 pb-0.5 relative">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto absolute top-24">
        {/* left section   */}
        <div className="flex-grow m-5 shadow-sm">
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
              <button className={`button mt-2 py-2 px-4 rounded-sm ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
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
