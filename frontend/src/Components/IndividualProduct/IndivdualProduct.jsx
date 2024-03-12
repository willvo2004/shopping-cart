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
          `https://asos2.p.rapidapi.com/products/v3/detail?id=${productid}&lang=en-US&store=US&sizeSchema=US&currency=USD`,
          options
        );
        if (response.ok) {
          const data = await response.json();
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
  console.log(productInfo);

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
    </>
  );
};

export default IndividualProduct;
