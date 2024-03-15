import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProductSizeList = ({ variants, onChange }) => {
  const [size, setSize] = useState(
    variants.length > 0 ? variants[0].brandSize : ""
  );

  useEffect(() => {
    setSize(size);
  }, [size]);

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setSize(value);
    onChange(value);
  };

  return (
    <div className="flex gap-4">
      {variants.map((variant, index) => {
        return (
          <dl key={index}>
            <dt>
              <label htmlFor={variant.brandSize}>{variant.brandSize}</label>
            </dt>
            <dd>
              <input
                type="radio"
                id={variant.brandSize}
                name="size"
                value={variant.brandSize}
                onChange={handleSizeChange}
                checked={size === variant.brandSize}
              />
            </dd>
          </dl>
        );
      })}
    </div>
  );
};

ProductSizeList.propTypes = {
  variants: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductSizeList;
