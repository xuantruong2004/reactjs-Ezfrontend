import { Box, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { FormatPrice } from 'utils';
import CartItem from './CartItem';
import { cartItemsCountSelector, cartTotalSelector } from './selector';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log('cartItems', cartItems);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const cartTotal = useSelector(cartTotalSelector);
  return (
    <Box
      style={{
        padding: '60px',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <Typography variant="h6">
          Danh sach san pham mua la:{' '}
          <Typography component="span" style={{ color: 'red', fontSize: '20px' }}>
            {cartItemsCount}
          </Typography>
        </Typography>
        <Typography variant="h6">
          Tong so tien thanh toan:{' '}
          <Typography component="span" style={{ color: 'red', fontSize: '20px' }}>
            {FormatPrice(cartTotal)}
          </Typography>
        </Typography>
      </Box>
      <Paper elevation={0}>
        {cartItems.map((cart, index) => (
          <CartItem key={cart.id} product={cart.product} index={index} quantity={cart.quantity} />
        ))}
      </Paper>
    </Box>
  );
}

export default CartFeature;
