import PropTypes from 'prop-types';
const CartItems = ({ cartItems, handleRemoveFromCart }) => {
    return (
        <>
            <h2 className='flex flex-col gap-4 mt-64 ml-8'>{cartItems.map(cartItem => {
                return (
                    <div key={cartItem.id + cartItem.size} className={'flex items-top gap-4 mb-8 pb-8 border-b-2 border-blue-400'}>
                        <img src={"https://" + cartItem.image} className="h-72"></img>
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <h2 className="font-semibold text-xl">{cartItem.name}</h2>
                                <button className="rounded-md text-xs absolute right-1/3" onClick={() => handleRemoveFromCart(cartItem)}>X</button>
                            </div>
                            <h2>Product ID: {cartItem.id}</h2>
                            <h2>Size: {cartItem.size}</h2>
                            <h2>Price: USD ${cartItem.price}</h2>
                            <h2>Quantity: {cartItem.quantity}</h2>
                        </div>
                    </div>
                )
            })}</h2>
        </>
    )
}

CartItems.propTypes = {
    cartItems: PropTypes.array.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired,
};
export default CartItems;