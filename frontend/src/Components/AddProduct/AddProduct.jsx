import PropTypes from "prop-types";
import { useState } from "react";
import ProductSizeList from "../ProductSizeList/ProductSizeList";

const AddProduct = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  const handleCheckOut = async () => {
    setLoadingCart(true);
    const product = {
      id: data.id,
      name: data.name,
      price: data.price.current.text,
      quantity: quantity,
    };

    let updatedCart = [...cart];

    // Check if the product already exists in the cart
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists, update the quantity
      updatedCart[existingProductIndex].quantity += product.quantity;
    } else {
      // Product does not exist, add it to the cart
      updatedCart.push(product);
    }
    setCart(updatedCart);

    // Retrieve the existing cart from local storage
    const existingLocalStorageCart = 
    JSON.parse(localStorage.getItem("cart")) || [];

    // Merge the existing cart with the updated cart, excluding duplicates
    existingLocalStorageCart.forEach(existingItem => {
        const index = updatedCart.findIndex(item => item.id === existingItem.id);
        if (index !== -1) {
            updatedCart[index].quantity = existingItem.quantity + product.quantity;
        } else {
            updatedCart.push(existingItem);
        }
    });

    // Save the updated cart back to local storage
    await localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    
    setTimeout(() => {
        setLoadingCart(false);
      }, 1000);
    console.log('Cart:', updatedCart);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold">{data.name.toUpperCase()}</h1>
      <h1>USD {data.price.current.text}</h1>
      <ProductSizeList variants={data.variants} />
      <div className="flex items-center gap-2">
        <h2>Quantity </h2>
        <div className="flex items-center gap-3">
          <button className="p-2" onClick={handleDecrease}>
            -
          </button>
          <h2>{quantity}</h2>
          <button className="p-2" onClick={handleIncrease}>
            +
          </button>
        </div>
      </div>
      <button onClick={handleCheckOut} value={data.id}>
        {loadingCart ? "Adding to cart..." : "Add to cart"}
      </button>
    </div>
  );
};

AddProduct.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AddProduct;
