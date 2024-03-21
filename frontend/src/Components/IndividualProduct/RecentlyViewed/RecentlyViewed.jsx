import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';

const RecentlyViewed = ({ data }) => {

    const { productid } = useParams();

    const info = useQuery({
        queryKey: ["viewedProduct"],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/viewed/track-viewed-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productID: productid, productImage: "https://" + data }),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("okay");
            return response.json();
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
    return (
        <>
            <h2>Recently Viewed</h2>
            <div className="flex justify-evenly">
                
            </div>
        </>
    )
}

RecentlyViewed.propTypes = {
    data: PropTypes.string.isRequired,
};
export default RecentlyViewed;