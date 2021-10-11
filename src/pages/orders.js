import Header from "../components/Header";
import { useSession, getSession } from "next-auth/client";
import db from "../../firebase";
import moment from "moment";
import stripe from "stripe";
import Order from "../components/Order";
import Head from "next/head";

function orders({ ordersList }) {
  const [session] = useSession();
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto transform translate-y-24 p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-500">Your Orders</h1>
        {session ? (
          <h2>{ordersList.length} orders</h2>
        ) : "please sign in to see your orders" }
        <div className="mt-5 space-y-4 flex flex-col">
          {ordersList?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
            <Order 
              key={id}
              id={id} 
              amount={amount}
              amountShipping={amountShipping} 
              items={items.data}
              timestamp={timestamp}
              images={images}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default orders;

export async function getServerSideProps(context) {
  //get the users login credentials
  const session = await getSession(context);
  if(!session) {
    return {
      props: {}
    }
  }
  //order from firebase database
  const firebaseData = await db.collection("users").doc(session.user.email).collection("orders").orderBy('timestamp', 'desc').get();

  //order from stripe (getting orders from stripe)
  const stripeOrders = await Promise.all(
    firebaseData.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: ( 
        await stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.listLineItems(order.id, { limit: 100 })
       )
    }))
  );

  return {
    props: {
      ordersList: stripeOrders,
      session,
    }
  };
};
