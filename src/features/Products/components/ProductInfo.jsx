import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@mui/material';
import { FormatPrice } from 'utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const PREFIX = 'ProductInfo';
const classes = {
  root: `${PREFIX}-root`,
  name: `${PREFIX}-name`,
  shortDescription: `${PREFIX}-shortDescription`,
  boxPrice: `${PREFIX}-boxPrice`,
  salePrice: `${PREFIX}-salePrice`,
  boxSale: `${PREFIX}-boxSale`,
  originalPrice: `${PREFIX}-originalPrice`,
  promotionPercent: `${PREFIX}-promotionPercent`,
};
const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: theme.spacing(2),
  },

  [`& .${classes.name}`]: {
    color: theme.palette.info.main,
  },

  [`& .${classes.shortDescription}`]: {
    margin: theme.spacing(1, 0),
  },

  [`& .${classes.boxPrice}`]: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ff3d00',
    padding: theme.spacing(2),
    color: 'white',
  },

  [`& .${classes.salePrice}`]: {
    fontSize: '1.6rem',
    marginRight: theme.spacing(2),
  },

  [`& .${classes.boxSale}`]: {
    margin: '4px',
  },

  [`& .${classes.originalPrice}`]: {
    opacity: ' 0.6',
    position: 'relative',
    marginRight: theme.spacing(2),
    '::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '1px',
      backgroundColor: 'white',
      top: '50%',
    },
  },
  [`& .${classes.promotionPercent}`]: {},
}));

function ProductInfo({ product }) {
  const { name, originalPrice, productId, promotionPercent, salePrice, shortDescription } = product;

  return (
    <Root className={classes.root}>
      <Typography component="h1" className={classes.name} variant="h4">
        {name}
      </Typography>
      <Typography className={classes.shortDescription} variant="body2">
        {shortDescription}
      </Typography>
      <Box className={classes.boxPrice}>
        <Box className={classes.salePrice} component="span" variant="h3">
          {FormatPrice(salePrice)}
        </Box>
        <Box className={classes.boxSale}>
          <Box className={classes.originalPrice} component="span">
            {FormatPrice(originalPrice)}
          </Box>
          <Box component="span">-{promotionPercent}%</Box>
        </Box>
      </Box>
    </Root>
  );
}

export default ProductInfo;
