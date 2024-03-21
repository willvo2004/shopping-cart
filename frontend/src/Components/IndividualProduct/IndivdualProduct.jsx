import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NavBar from "../NavBar";
import AddProduct from "./AddProduct";
import RecentlyViewed from "./RecentlyViewed";

const apiKey = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "asos2.p.rapidapi.com",
  },
};

const IndividualProduct = () => {
  const { productid } = useParams();
  const productQuery = useQuery({
    queryKey: ["product", productid],
    queryFn: async () => {
      const response = await fetch(
        `https://asos2.p.rapidapi.com/products/v4/detail?id=${productid}&lang=en-US&store=US&sizeSchema=US&currency=USD`,
        options
      );
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  });
  
  const priceQuery = useQuery({
    queryKey: ["price", productid],
    queryFn: async () => {
      const response = await fetch(`https://asos2.p.rapidapi.com/products/v4/get-stock-price?productIds=${productid}&lang=en-US&store=US&sizeSchema=US&currency=USD`, 
        options);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  });
  const [focusImage, setFocusImage] = useState([]);
  return (
    <>
      <div className="fixed top-0">
        <NavBar />
      </div>
      {productQuery.isLoading || priceQuery.isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="flex justify-evenly w-screen">
          <div className="flex gap-6 sticky">
            <img src={"https://" + focusImage} className="h-max"></img>
            <div className="other-images flex flex-col gap-7 flex-wrap items-stretch m-0 p-0 min-h-0 min-w-0">
              {productQuery.data.media.images.map((image) => (
                <img
                  key={image.url}
                  src={"https://" + image.url}
                  onClick={() => setFocusImage(image.url)}
                  className="h-20 cursor-pointer"
                ></img>
              ))}
            </div>
          </div>
          <div className="product-info w-1/3">
            <AddProduct data={productQuery.data} price={priceQuery.data[0].productPrice.current.text} />
          </div>
          <RecentlyViewed data={productQuery.data.media.images[0].url}/>
        </div>
      )}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
    </>
  );
};

export default IndividualProduct;
