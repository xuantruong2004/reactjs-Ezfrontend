import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Product from './Product';

ProductList.propTypes = {
  data: PropTypes.object,
};

function ProductList({ data = [] }) {
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
