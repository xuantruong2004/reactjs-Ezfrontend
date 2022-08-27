import { Link, styled } from '@mui/material';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const PREFIX = 'ProductMenu';
const classes = {
  root: `${PREFIX}-root`,
  item: `${PREFIX}-item`,
};
const Root = styled('ul')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: 0,
    justifyContent: 'center',
    listStyleType: 'none',
    '& > li': {
      padding: theme.spacing(2, 5),
    },
    '& > li > a': {
      textDecoration: 'none',
    },
    '& >li :hover': {
      borderBottom: `solid 1px ${theme.palette.warning.main}`,
      color: theme.palette.warning.main,
    },
    '& > li > a.active': {
      borderBottom: `solid 1px ${theme.palette.warning.main}`,
      color: theme.palette.warning.main,
    },
  },
  [`&. ${classes.item}`]: {},
}));

function ProductMenu(props) {
  const { url } = useRouteMatch();
  return (
    <Root className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Root>
  );
}

export default ProductMenu;
