import PropTypes from "prop-types";
import { Link, useLocation} from "react-router-dom";
const ProductCard = ({ contents }) => {
  const location = useLocation();

  return (
    <div className="product-card-wrapper flex flex-wrap gap-0">
      {contents.map((content) => (
        <div key={content.id} className="flex-col">
        <Link key={content.id} to={`${location.pathname}/${content.id}`} state={{from: content}}>
        <div className="product-item">
          <img
            src={"https://" + content.imageUrl}
            alt={content.name}
            className="w-60 h-auto border-2 border-black"
          />
        </div>
        </Link>
        <div className="text-container bg-slate-50 text-black border-2 border-black p-2 max-w-60">
            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">
                {content.name}
            </h2>
            <p>{content.price.current.text}</p>
        </div>
        </div>
      ))}
    </div>
  );
};
ProductCard.propTypes = {
  contents: PropTypes.array.isRequired,
};

export default ProductCard;
