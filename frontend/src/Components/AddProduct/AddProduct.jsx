import PropTypes from 'prop-types';
import { useState } from 'react';
const AddProduct = ({ data }) => {
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    const handleCheckOut = async () => {
        const product = {
            id: data.id,
            name: data.name,
            price: data.price.current.text,
            quantity: quantity,
        };
        setCart([...cart, product]);
        console.log(cart);
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }
    return (
        <div className='flex flex-col gap-8'>
        <h1 className='font-bold'>{data.name.toUpperCase()}</h1>
        <h1>USD {data.price.current.text}</h1>
        <div className='flex items-center gap-2'>
            <h2>Quantity </h2>
            <div className='flex items-center gap-3'>
                <button className='p-2' onClick={handleDecrease}>-</button>
                <h2>{quantity}</h2>
                <button className='p-2' onClick={handleIncrease}>+</button>
            </div>
        </div>
        <button onClick={handleCheckOut}>ADD TO CART</button>
        </div>
    )
}

AddProduct.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AddProduct;