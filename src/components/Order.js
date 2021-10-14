import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <div className="relative border rounded-md shadow-md">
      <div className="flex items-center bg-gray-100 space-x-10 p-5 text-gray-600 text-sm">
        <div>
          <p className="text-xs font-bold">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="GBP" /> - Next day delivery - {" "} <Currency quantity={amountShipping} currency="GBP" />
          </p>
        </div>
        <p className="text-xs whitespace-nowrap self-end sm:text-xl flex-1 text-right text-blue-400">{items.length} items</p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate tex-xs">ORDER # {id}</p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map(image => (
            <img src={image} alt="" className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
