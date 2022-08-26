import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './styles.scss';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };
  return (
    <Box className="productItem" onClick={handleClick}>
      <Box className="none-hover" padding={2}>
        <Box minHeight="215px">
          <img
            style={{
              borderRadius: '10px',
            }}
            src={thumbnailUrl}
            alt={product.name}
            width="100%"
          />
        </Box>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" color="red">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              product.salePrice
            )}
          </Box>
          {product.promotionPercent > 0 ? (
            <Box
              component="span"
              style={{
                marginLeft: '10px',
                padding: '0 2px',
                fontSize: '12px',
                color: 'red',
                border: 'solid 1px red',
                backgroundColor: '#fff0f1',
              }}
            >
              -{product.promotionPercent}%
            </Box>
          ) : (
            ''
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
