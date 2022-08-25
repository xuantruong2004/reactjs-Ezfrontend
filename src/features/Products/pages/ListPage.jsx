import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import productApi from 'api/productApi';
import { Box } from '@mui/system';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './styles.scss';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';

ListPage.propTypes = {};

const PREFIX = 'ListPage';
const classes = {
  root: `${PREFIX}-root`,
  left: `${PREFIX}-left`,
  right: `${PREFIX}-right`,
  paper: `${PREFIX}-paper`,
};
const Root = styled(Box)((theme) => ({
  [`&.${classes.root}`]: {},
  [`& .${classes.left}`]: {
    width: '248px',
    color: 'red',
  },
  [`& .${classes.right}`]: {
    flex: '1 1',
  },
}));

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, limit] = [3, 10];
  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll({ _page: page, _limit: limit });
        setProductList(response.data);
      } catch (error) {
        console.log('Failed to fetch Product List ', error);
      }

      setLoading(false);
    })();
  }, []);
  return (
    <Root className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>left column</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? (
                <ProductSkeletonList length={limit} />
              ) : (
                <ProductList data={productList} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
}

export default ListPage;
