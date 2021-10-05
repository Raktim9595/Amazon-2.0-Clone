import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { increaseCount, selectCountValue } from "../slices/countSlice";

function CheckoutCard({ id, price, rating, description, image, category, hasPrime, title }) {
  const dispatch = useDispatch();
  let newId = useSelector(selectCountValue);

  const addItemToBasket = () => {
    const product = { id: newId, price, rating, description, image, category, hasPrime, title };
    dispatch(increaseCount());
    dispatch(addToBasket(product));
  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({id}));
  }

  return (
    <div className="grid grid-cols-5">
      <Image
        loading="lazy"
        src={image}
        height={200}
        width={200}
        objectFit="contain"
      />
      <div className="col-start-2 col-end-6 md:col-span-3 mx-5">
        <p className="text-default font-semibold">{title}</p>
        <div className="flex mt-2">
          {Array(rating).fill().map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
          ))}
        </div>
        <p className="text-xs text-gray-500 line-clamp-3 mt-3">{description}</p>
        <div className="mt-1 text-default font-semibold">
          <Currency quantity={price} currency="GBP" />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img className="w-12" src="https://links.papareact.com/fdw" />
            <p className="text-xs text-gray-400">has next-day delivery</p>
          </div>
        )}
      </div>
      <div className="flex space-x-3 md:space-x-0 mt-2 md:mt-0 md:flex-col md:space-y-3 md:justify-center md:justify-self-end col-start-2 col-end-6 md:col-start-5">
        <button onClick={addItemToBasket} className="button py-2 px-4 text-xs md:text-default">Add more</button>
        <button onClick={removeItemFromBasket} className="button py-2 px-4 text-xs md:text-default">Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckoutCard;
