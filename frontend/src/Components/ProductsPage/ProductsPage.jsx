import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import NavBar from "../NavBar";

const apiKey = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "asos2.p.rapidapi.com",
  },
};

const ProductPage = () => {
  const { shopid, category } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", shopid, category],
    queryFn: () =>
    fetch(
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&limit=48&country=US&sort=freshness&q=${shopid}%20${category.replace(
        " ",
        "%20"
      )}&currency=USD&sizeSchema=US&lang=en-US`,
      options
    ).then((res) => res.json()),
  });
  if (error) return "An error has occurred: " + error.message;
  // abstract into a new component ProductCard
  return (
    <>
      <div className="navBar-wrapper sticky top-0 w-screen flex-col justify-center mb-16">
        <NavBar />
      </div>
      <div className="w-full overflow-x-clip">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ProductCard contents={data.products} />
        )}
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
    </>
  );
};

export default ProductPage;
