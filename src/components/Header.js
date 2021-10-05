import React from 'react';
import Image from "next/image";
import { SearchIcon, ShoppingCartIcon, MenuIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header className="fixed w-screen z-50">
      {/* top header  */}
      <div className="flex items-center bg-amazon_blue p-1 py-2 flex-grow">
        {/* amazon logo    */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* search bar   */}
        <div className="hidden sm:flex h-10 cursor-pointer items-center rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow">
          <input type="text" className="p-2 h-full flex-grow flex-shrink w-6 rounded-l-md focus:outline-none" />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* right hand side of the header  */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `${session.user.name}` : 'SignIn'}</p>
            <p className="font-extrabold hidden sm:inline-block">Account & Lists</p>
          </div>
          <div className="link flex sm:flex-col">
            <p>Return</p>
            <p className="font-extrabold hidden sm:inline-block md:text-sm">& Orders</p>
          </div>
          <div onClick={() => router.push("/checkout")} className="link relative flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">{items.length}</span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm hidden md:inline-block mt-2">Basket</p>
          </div>
        </div>
      </div>
      {/* bottom header  */}
      <div className="flex text-sm pl-6 items-center bg-amazon_blue-light text-white space-x-3 py-1.5">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  )
}

export default Header;
