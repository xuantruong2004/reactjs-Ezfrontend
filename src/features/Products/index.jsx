import { Box } from '@mui/material';
import NotFound from 'components/NotFound';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={`${match.url}`} component={ListPage} exact />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
