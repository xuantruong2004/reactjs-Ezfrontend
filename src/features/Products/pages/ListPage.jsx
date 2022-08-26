import React, { useEffect, useMemo, useState } from 'react';
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
import FilterViewer from '../components/Filter/FilterViewer';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

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
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });

  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));

  const { limit, total } = pagination;
  const count = Math.ceil(total / limit);

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch Product List ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handleFilter = (e, page) => {
    // setFilters((prev) => ({
    //   ...prev,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleSortFilter = (newSortValue) => {
    // setFilters((prev) => ({
    //   ...prev,
    //   _sort: newSortValue,
    // }));

    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterChange = (newFilter) => {
    // setFilters((prev) => ({
    //   ...prev,
    //   ...newFilter,
    // }));
    const filters = {
      ...queryParams,
      ...newFilter,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilter = (newFilter) => {
    // setFilters(newFilter);

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  };

  return (
    <Root className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductListFilter filters={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortFilter} />
              <FilterViewer filters={queryParams} onChange={setNewFilter} />
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
