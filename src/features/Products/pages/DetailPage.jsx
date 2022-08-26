import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Skeleton, styled } from '@mui/material';
import ProductThumbnail from '../components/ProductThumbnail';
import queryString from 'query-string';
import { useHistory, useRouteMatch } from 'react-router-dom';
import productApi from 'api/productApi';
import useDetailProduct from '../hooks/useDetailProduct';
import ProductInfo from '../components/ProductInfo';

DetailPage.propTypes = {};

const PREFIX = 'DetailPage';
const classes = {
  root: `${PREFIX}-root`,
  left: `${PREFIX}-left`,
  right: `${PREFIX}-right`,
  paper: `${PREFIX}-paper`,
  pagination: `${PREFIX}-pagination`,
};
const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {},
  [`& .${classes.left}`]: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `solid 1px ${theme.palette.grey[300]}`,
  },
  [`& .${classes.right}`]: {
    flex: '1 1',
  },
  [`& .${classes.pagination}`]: {},
}));
function DetailPage(props) {
  const {
    params: { productId },
  } = useRouteMatch();
  console.log('match: ', productId);

  const { product, loading } = useDetailProduct(productId);
  if (loading) {
    return (
      <Root className={classes.root}>
        <Container>
          <Paper elevation={0}>
            <Grid container>
              <Grid item className={classes.left}>
                <Skeleton variant="rectangular" width="100%" height={400} />
              </Grid>
              <Grid item className={classes.right}>
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width="100%" />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Root>
    );
  }
  return (
    <Root className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Root>
  );
}

export default DetailPage;
