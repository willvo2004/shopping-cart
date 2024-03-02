import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import CategoryList from "../CategoryList";
import NavBar from "../NavBar";
// tops bottoms outerwear new-arrivals 
const ShoppingPage = () => {
    const { shopid } = useParams();
    
    const options = useMemo(() => ({
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fbaa4f53a7msh700d4772ef98bc6p10c999jsn62923bda8fee',
            'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
    }), []);
    const catergories = useMemo(() => ['%20shirts', '%20pants', '%20outerwear', '%20new%20arrivals'], []);
   
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const fetchShopData = async (category) => {
            try {
                const response = await fetch(`https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=4&country=US&sort=freshness&q=${shopid}${category}&currency=USD&sizeSchema=US&lang=en-US`, options);
                if (response.ok) {
                    const data = await response.json();
                    if (data.products && data.products.length > 0) {
                        setProducts(prevData => ({
                            ...prevData,
                            [category]: data.products[0]
                        }));
                    }
                } else {
                    console.error('Error fetching data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        const fetchAllCategories = async () => {
            try {
                await Promise.all(catergories.map(category => fetchShopData(category)));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllCategories();
    }, [catergories, options, shopid]);

    return (
        <> 
            <div className="navBar-wrapper fixed top-0 w-screen flex-col justify-center">
                <NavBar />
                <h1 className="flex justify-center text-blue-950">Shopping Page - {shopid}</h1>

            </div>
            <div className="flex items-center content-center w-screen">
                <div className="product-images flex flex-wrap gap-2 w-full justify-center">
                    {loading ? <h2>Loading...</h2> : 
                    <CategoryList catergories={catergories} products={products}/>}
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
