import { Box } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import PropTypes from 'prop-types';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
};

function ProductThumbnail({ product, loading }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box>
      <img
        style={{
          borderRadius: '10px',
        }}
        src={thumbnailUrl}
        alt={product.name}
        width="100%"
      />
    </Box>
  );
}

export default ProductThumbnail;
