import { Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
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
    paddingBottom: theme.spacing(3),
    borderBottom: `solid 1px ${theme.palette.grey[300]}`,
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
    borderRadius: '5px',
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
    textDecoration: 'line-through',
    marginRight: theme.spacing(2),
  },
  [`& .${classes.promotionPercent}`]: {
    padding: theme.spacing(0, 0.5),
    border: 'solid 1px white',
    borderRadius: '5px',
  },
}));

function ProductInfo({ product }) {
  const { name, originalPrice, promotionPercent, salePrice, shortDescription } = product;

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
        {promotionPercent > 0 && (
          <Box className={classes.boxSale}>
            <Box className={classes.originalPrice} component="span">
              {FormatPrice(originalPrice)}
            </Box>
            <Box className={classes.promotionPercent} component="span">
              -{promotionPercent}%
            </Box>
          </Box>
        )}
      </Box>
    </Root>
  );
}

export default ProductInfo;
