import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const SideCartSlide = ({ show, close }) => {
    
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    return (
        <div className={show ? "side-cart-slide fixed right-0 top-0 bg-black m-0 p-5 h-screen" : "side-cart-slide hidden"}>
            <div className="side-cart-header flex justify-between items-center gap-2">
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <button onClick={close} className="text-sm font-bold">
                    &times;
                </button>
            </div>
            <div className="side-cart-body mt-6">
                <h2 className='flex flex-col gap-4'>{cartItems.map(cartItem => {
                    return (
                        <div key={cartItem.id + cartItem.size} className="flex items-center gap-2">
                            <img src={"https://" + cartItem.image} className="h-14"></img>
                            <div className="flex flex-col gap-1">
                                <h2>{cartItem.name}</h2>
                                <h2>Quantity: {cartItem.quantity} Size: {cartItem.size}</h2>
                            </div>
                        </div>
                    )
                })}</h2>
            </div>
            <button className='fixed bottom-4' onClick={close}>Continue Shopping</button>
            <Link to="/cart" className='fixed bottom-4 right-4 p-2 bg-slate-900 rounded-lg'>View Cart</Link>
        </div>
    )
}

SideCartSlide.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};
export default SideCartSlide;