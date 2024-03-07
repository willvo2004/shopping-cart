import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../ProductCard";
import NavBar from "../NavBar";

const apiKey = import.meta.env.VITE_API_KEY;

const ProductPage = () => {
  const { shopid, category } = useParams();
  console.log(shopid, category);

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      },
    }),
    []
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&q=${shopid}%20${category.replace(
            " ",
            "%20"
          )}&currency=USD&sizeSchema=US&lang=en-US`,
          options
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProductData();
  }, [options, shopid, category]);
  // abstract into a new component ProductCard
  return (
    <>
      <div className="navBar-wrapper sticky top-0 w-screen flex-col justify-center">
        <NavBar />
      </div>
      <div className="w-full overflow-x-clip">
        <ProductCard contents={products} />
      </div>
    </>
  );
};

export default ProductPage;
