import { Box, Paper } from '@mui/material';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product }) {
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper
      style={{
        padding: '20px',
      }}
    >
      <Box dangerouslySetInnerHTML={{ __html: safeDescription }}></Box>
    </Paper>
  );
}

export default ProductDescription;
