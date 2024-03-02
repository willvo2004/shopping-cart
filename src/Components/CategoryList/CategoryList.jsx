import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const CategoryList= ({ catergories, products, page }) => {
    return (
        <div className='flex gap-2'>
        {catergories.map(category => (
            <div key={category} className="product-image flex-col justify-center items-center">
                <h2 className="text-black border-2 border-black flex justify-center">{category.replace(/[^a-zA-Z\s]/g, ' ')}</h2>
                <Link to={`/shop/${page}/${category}`}>
                {products[category] && (
                    <img className="border-2 border-black border-t-0"src={'https://' + products[category].imageUrl} alt={products[category].name} />
                )}
                </Link>
            </div>
        ))}
        </div>
    )
}
CategoryList.propTypes = {
    catergories: PropTypes.array.isRequired,
    products: PropTypes.object.isRequired,
    page: PropTypes.string.isRequired
};

export default CategoryList;