import { Box, Container, Grid, LinearProgress, Paper, styled } from '@mui/material';
import { addToCart } from 'features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductAddition from '../components/ProductAddition';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReview from '../components/ProductReview';
import ProductThumbnail from '../components/ProductThumbnail';
import useDetailProduct from '../hooks/useDetailProduct';

DetailPage.propTypes = {};

const PREFIX = 'DetailPage';
const classes = {
  root: `${PREFIX}-root`,
  loading: `${PREFIX}-loading`,
  left: `${PREFIX}-left`,
  right: `${PREFIX}-right`,
  paper: `${PREFIX}-paper`,
  pagination: `${PREFIX}-pagination`,
};
const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {},
  [`&.${classes.loading}`]: {
    position: 'fixed',
    width: '100%',
    top: '64px',
    left: 0,
  },
  [`& .${classes.left}`]: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `solid 1px ${theme.palette.grey[300]}`,
  },
  [`& .${classes.right}`]: {
    flex: '1 1',
    padding: theme.spacing(2),
  },
  [`& .${classes.pagination}`]: {},
}));
function DetailPage(props) {
  const {
    url,
    params: { productId },
  } = useRouteMatch();
  const dispatch = useDispatch();
  const { product, loading } = useDetailProduct(productId);
  const handleAddCartForm = (formValues) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: formValues.quantity,
    });
    console.log('action', action);
    dispatch(action);
  };
  if (loading) {
    return (
      <Root className={classes.loading}>
        <LinearProgress color="success"></LinearProgress>
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
              <AddToCartForm onSubmit={handleAddCartForm} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} exact>
            <ProductAddition product={product} />
          </Route>
          <Route path={`${url}/reviews`} exact>
            <ProductReview product={product} />
          </Route>
        </Switch>
      </Container>
    </Root>
  );
}

export default DetailPage;
