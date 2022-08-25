import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import PropTypes from 'prop-types';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box padding={1}>
      <Box>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        {product.salePrice} - {product.promotionPercent}%
      </Typography>
    </Box>
  );
}

export default Product;
