import { Link } from "react-router-dom";
const CartSummary = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log(totalPrice);
    return (
        <>
        <div className="w-auto border-2">
            <h2 className="p-5 font-bold font-mono">Order Summary</h2>
            <div className="flex justify-between gap-40 p-5">
                <h2>Subtotal</h2>
                <h2>USD  ${Math.round(totalPrice * 100) / 100}</h2>
            </div>
        </div>
        
        <div className="w-full mt-8 flex flex-col">
            <Link to="/checkout" className="w-full">Checkout</Link>
            <Link to ="/" className="w-full mt-4">Continue Shopping</Link>
        </div>
        </>
    )
}

export default CartSummary;