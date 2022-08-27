import { Box, Container, Grid, Paper, Skeleton, styled } from '@mui/material';
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
    padding: theme.spacing(2),
  },
  [`& .${classes.pagination}`]: {},
}));
function DetailPage(props) {
  const {
    url,
    params: { productId },
  } = useRouteMatch();

  const { product, loading } = useDetailProduct(productId);
  const handleAddCartForm = (formValues) => {
    console.log('form value', formValues);
  };
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
