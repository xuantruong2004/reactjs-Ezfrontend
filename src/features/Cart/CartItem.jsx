import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@mui/material';
import QuantityField from 'components/FormControl/QuantityField';
import { STATIC_HOST } from 'constants';
import { FormatPrice } from 'utils';

CartItem.propTypes = {
  product: PropTypes.object,
};

const PREFIX = 'CartItem';
const classes = {
  root: `${PREFIX}-root`,
  img: `${PREFIX}-img`,
};
const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottom: 'solid 1px #ccc',
  },
  [`& .${classes.img}`]: {
    width: '160px',
    height: '160px',
  },
}));

function CartItem({ product, quantity, index }) {
  const url = `${STATIC_HOST}${product.thumbnail.url}` || undefined;
  return (
    <Root className={classes.root}>
      <Typography>{index + 1}</Typography>
      <Box className={classes.img}>
        <img src={url} alt={product.name} width="100%" />
      </Box>
      <Typography variant="subtitle1">{product.name}</Typography>
      <Typography>{FormatPrice(product.salePrice)}</Typography>
      {/* <QuantityField /> */}
      <Typography>{quantity}</Typography>
    </Root>
  );
}

export default CartItem;
