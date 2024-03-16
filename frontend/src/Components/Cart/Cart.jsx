import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import NavBar from "../NavBar";

const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const handleRemoveFromCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartItems.findIndex(
      (item) => item.id === product.id && item.size === product.size
    );
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.location.reload();
  };
  if (cartItems.length === 0) {
    return (
      <>
        <div className="fixed top-0 z-10">
          <NavBar />
        </div>
        <div className="flex gap-64">
          <div className="absolute left-8 top-32">
            <h1 className="font-bold font-mono">SHOPPING CART</h1>
          </div>
          <div>
            <h2 className="text-center font-semibold left-8 relative font-mono">Your cart is empty</h2>
          </div>
        </div>
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="fixed top-0 z-10">
        <NavBar />
      </div>
      <div className="flex gap-64">
        <div className="absolute left-8 top-32">
          <h1 className="font-bold font-mono">SHOPPING CART</h1>
        </div>
        <div>
          <CartItems
            cartItems={cartItems}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      </div>
      <div className="fixed right-5 top-64">
        <CartSummary />
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
    </>
  );
};

export default Cart;
