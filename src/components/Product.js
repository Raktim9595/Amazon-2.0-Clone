import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from 'react-currency-formatter';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, price, description, category, image}) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5)
  return (
    <div className="flex relative flex-col z-30 bg-white m-5 p-10 rounded shadow-md">
      <p className="absolute top-2 right-3 text-xs italic text-gray-400">{category}</p>
      <Image loading="lazy" src={image} width={200} height={200} objectFit="contain" />
      <h4 className="my-3 font-semibold">{title}</h4>
      <div className="flex">
        {Array(rating).fill().map((_,i) => (
          <StarIcon className="h-5 text-yellow-500" />
        ))}
      </div>
      <p className="text-xs my-2 line-clamp-2 text-gray-600">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className=" text-xs text-gray-500">has next-day delivery</p>
        </div>
      )}
      <button className="button mt-auto">Add to Basket</button>
    </div>
  )
}

export default Product;
