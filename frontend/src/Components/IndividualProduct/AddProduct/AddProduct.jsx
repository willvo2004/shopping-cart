import PropTypes from "prop-types";
import { useState } from "react";
import ProductSizeList from "../../ProductSizeList/ProductSizeList";
import SideCartSlide from "../../SideCartSlide";

const AddProduct = ({ data, price }) => {
  const [quantity, setQuantity] = useState(1);
  const [loadingCart, setLoadingCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState('XS');
  const [show, setShow] = useState(false);

  const handleCheckOut = () => {
    setLoadingCart(true);
    const product = {
      id: data.id,
      name: data.name,
      image: data.media.images[0].url,
      price: price,
      size: selectedSize,
      quantity: quantity,
      // add a size property to the product object
    };

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartItems.findIndex((item) => item.id === product.id && item.size === product.size);
    if (index === -1) {
        cartItems.push(product);
    }
    else {
        cartItems[index].quantity += product.quantity;
    }
    
    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    setTimeout(() => {
        setLoadingCart(false);
        setShow(true);
      }, 1000);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleClose = () => {
    setShow(false);
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  }
  return (
    <>
        <div className="flex flex-col gap-8">
        <h1 className="font-bold">{data.name.toUpperCase()}</h1>
        <h1>USD {price} </h1>
        
        <ProductSizeList variants={data.variants} onChange={handleSizeChange} />
        
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
        
        <SideCartSlide show={show} close={handleClose}/>
    </>
  );
};

AddProduct.propTypes = {
  data: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired
};
export default AddProduct;
