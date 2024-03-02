import { useParams } from "react-router-dom";
const ProductPage = () => {
    const { shopid, category } = useParams();
    console.log(shopid, category);
    return (
        <div>
            <h1>Products</h1>
        </div>
    );
}

export default ProductPage;