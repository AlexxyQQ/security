import { MinusCircle, PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  cartSelector,
  clearCart,
  removeItem,
  removeItemCompletely,
} from "../redux/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsWithQuantities = useSelector(cartSelector);

  const totalItems = itemsWithQuantities.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = itemsWithQuantities.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-20 p-6 ">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {itemsWithQuantities.length === 0 ? (
        <p className="text-gray-500">Cart is empty. Start adding some items.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {itemsWithQuantities.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 py-4 flex bg-gray-100 rounded-lg shadow-md"
              >
                <div className="pl-4">
                  <img
                    className="h-48 w-48 object-cover transform transition-all rounded-lg duration-500 hover:scale-110"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">Price: {item.price}</p>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span>Quantity:</span>
                    <button
                      onClick={() => dispatch(addItem(item))}
                      className="rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      <PlusCircle className="h-4 w-4 text-green-500" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      <MinusCircle className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => dispatch(removeItemCompletely(item.id))}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Total Items: {totalItems}</p>
            <p className="text-lg font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <button
              onClick={() => {
                navigate("/");
                toast.success(`${totalItems} items are placed for shipping!`);
                dispatch(clearCart());
              }}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
