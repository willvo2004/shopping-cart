import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import AddProduct from "./AddProduct";
import RecentlyViewed from "./RecentlyViewed";

const IndividualProduct = () => {
  const location = useLocation();
  const { from } = location.state;
  const [focusImage, setFocusImage] = useState(from.imageUrl);
  useEffect(() => {
    setFocusImage(from.imageUrl);
    scrollTo(0, 0);
  }, [ from ]);
  return (
<>
      <div className="fixed top-0">
        <NavBar />
      </div>
        <div className="flex justify-evenly w-screen py-64 h-screen bg-slate-400 bg-opacity-70">
          <div className="flex gap-6 ">
            <img src={"https://" + focusImage} ></img>
            <div className="other-images flex flex-col gap-7 flex-wrap items-stretch m-0 p-0 min-h-0 min-w-0">
              <img src={"https://" + from.imageUrl} className="h-20 cursor-pointer" onClick={() => setFocusImage(from.imageUrl)}></img>
              {from.additionalImageUrls.map((image, index) => (
                <img
                  key={index}
                  src={"https://" + image}
                  onClick={() => setFocusImage(image)}
                  className="h-20 cursor-pointer"
                ></img>
              ))}
            </div>
          </div>
          <div className="product-info w-1/3">
            <AddProduct data={from} price={from.price.current.text} />
          </div>
        </div>
        <RecentlyViewed image={from.imageUrl} contents={from}/>
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
    </>
  );
};
export default IndividualProduct;