import PropTypes from 'prop-types';
const ProductSizeList = ({ variants }) => {
    return (
        <div className='flex gap-4'>
            {variants.map((variant, index) => {
                return (
                    <div key={index}>
                        <input
                            type="radio"
                            name="size"
                            value={variant.brandSize}
                            id={variant.brandSize}
                        />
                        <label htmlFor={variant.brandSize}>{variant.brandSize}</label>
                    </div>
                );
            })}
        </div>        
    )
}

ProductSizeList.propTypes = {
    variants: PropTypes.array.isRequired,
};
export default ProductSizeList;
