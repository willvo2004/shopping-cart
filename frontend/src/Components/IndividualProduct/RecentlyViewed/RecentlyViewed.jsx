import { useParams, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';

const RecentlyViewed = ({ image, contents }) => {

    const { productid } = useParams();
    const location = useLocation();

    const info = useQuery({
        queryKey: ["viewedProduct"],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/viewed/track-viewed-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productID: productid, productImage: "https://" + image, location: location.pathname, productInfo: contents}),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
    const { data } = useQuery({
        queryKey: ["viewedProducts"],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/viewed/viewed-products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
    return (
        <div className="px-6">
            <h1 className="font-semibold">Recently Viewed</h1>
            <div className="flex flex-wrap gap-2">
                {data && data.map((product, index) => (
                    <Link to={product.location} key={index} state={{from: product.productInfo}}>
                    <img src={product.productImage} className="h-64" />
                    </Link>
                ))}               
            </div>
        </div>
    )
}

RecentlyViewed.propTypes = {
    image: PropTypes.string.isRequired,
    contents: PropTypes.object.isRequired
};
export default RecentlyViewed;