import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import AddProduct from "../AddProduct";

const IndividualProduct = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { category, productid, shopid } = useParams();

  const [productInfo, setProductInfo] = useState([]);
  const [focusImage, setFocusImage] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      },
    }),
    [apiKey]
  );

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `https://asos2.p.rapidapi.com/products/v4/detail?id=${productid}&lang=en-US&store=US&sizeSchema=US&currency=USD`,
          options
        );
        
        const getPrice = await fetch(`https://asos2.p.rapidapi.com/products/v4/get-stock-price?productIds=${productid}&lang=en-US&store=US&sizeSchema=US&currency=USD`, 
          options);
        if (response.ok && getPrice.ok) {
          const data = await response.json();
          const price = await getPrice.json();
          data.price = price[0].productPrice.current.value;
          setProductInfo(data);
          setLoading(false);
          setFocusImage(data.media.images[0].url);
      }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchProductData();
  }, [options, productid]);

  return (
    <>
      <div className="fixed top-0">
        <NavBar />
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="flex justify-evenly w-screen">
          <div className="flex gap-6 sticky">
            <img src={"https://" + focusImage} className="h-max"></img>
            <div className="other-images flex flex-col gap-7 flex-wrap items-stretch m-0 p-0 min-h-0 min-w-0">
              {productInfo.media.images.map((image) => (
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
            <AddProduct data={productInfo} />
          </div>
        </div>
      )}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
    </>
  );
};

export default IndividualProduct;
