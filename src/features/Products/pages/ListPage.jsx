import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import productApi from 'api/productApi';
import { Box } from '@mui/system';
import { Container, Grid, Pagination, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './styles.scss';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import ProductListFilter from '../components/ProductListFilter';

ListPage.propTypes = {};

const PREFIX = 'ListPage';
const classes = {
  root: `${PREFIX}-root`,
  left: `${PREFIX}-left`,
  right: `${PREFIX}-right`,
  paper: `${PREFIX}-paper`,
  pagination: `${PREFIX}-pagination`,
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
  [`& .${classes.pagination}`]: {
    marginTop: '20px',
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: 'salePrice:ASC',
  });
  const { limit, total } = pagination;
  const count = Math.ceil(total / limit);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch Product List ', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  const handleFilter = (e, page) => {
    setFilters((prev) => ({
      ...prev,
      _page: page,
    }));
  };
  const handleSortFilter = (newSortValue) => {
    setFilters((prev) => ({
      ...prev,
      _sort: newSortValue,
    }));
  };

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };

  return (
    <Root className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductListFilter filters={filters} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortFilter} />
              {loading ? (
                <ProductSkeletonList length={limit} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={count}
                  page={pagination.page}
                  onChange={handleFilter}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
}

export default ListPage;
