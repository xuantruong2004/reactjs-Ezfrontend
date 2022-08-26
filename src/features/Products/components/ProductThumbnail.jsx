import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton } from '@mui/material';
import { STATIC_HOST } from 'constants';
import { THUMBNAIL_PLACEHOLDER } from 'constants';

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
