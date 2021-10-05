import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectItems } from "../slices/basketSlice";
import { selectCountValue, increaseCount } from "../slices/countSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, price, descriptgit add .ion, category, image}) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  let newId = useSelector(selectCountValue);
  let items = useSelector(selectItems);
  const [hasPrime] = useState(Math.random() < 0.5);
  const addItemToBasket = () => {
    let newArray = items.filter(item => item.id === id);
    if(newArray.length > 0) {
      dispatch(increaseCount());
      id = newId;
    }
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime
    }
    dispatch(addToBasket(product));
  };

  return (
    <div className="flex relative flex-col z-30 bg-white m-5 p-10 rounded shadow-md">
      <p className="absolute top-2 right-3 text-xs italic text-gray-400">{category}</p>
      <Image loading="lazy" src={image} width={200} height={200} objectFit="contain" />
      <h4 className="my-3 font-semibold">{title}</h4>
      <div className="flex">
        {Array(rating).fill().map((_,i) => (
          <StarIcon key={i} className="h-5 text-yellow-500" />
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
      <button onClick={addItemToBasket} className="button mt-auto">Add to Basket</button>
    </div>
  )
}

export default Product;
