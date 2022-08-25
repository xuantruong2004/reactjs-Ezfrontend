import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import NotFound from 'components/NotFound';
import { Box } from '@mui/material';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={`${match.url}/listpage`} component={ListPage} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
