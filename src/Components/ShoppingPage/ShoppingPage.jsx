import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { useEffect, useState } from "react";

const ShoppingPage = () => {
    const params = useParams();
    const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&q=${params.shopid}&currency=USD&sizeSchema=US&lang=en-US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6ebc7344f1msh45391a8a40e5271p10d4f1jsn765c44e93617',
            'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchShopData = async () => {
            const response = await fetch(url, options);
            const data = await response.json();
            setProducts(data.products);
            console.log(data.products);
        }
        fetchShopData();
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <h1>Shopping Page - {params.shopid}</h1>
                <div className="product-images flex flex-wrap gap-2 w-full">
                    {products.map(product => (
                        <img key={product.id} src={'https://'+product.imageUrl} alt={product.id} />
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
                </div>
            </div>
        </>
    );
}

export default ShoppingPage;
