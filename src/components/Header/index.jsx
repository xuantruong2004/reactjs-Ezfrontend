import CodeIcon from '@mui/icons-material/Code';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './styles.scss';

import { AccountCircle, Close } from '@mui/icons-material';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartItemsCountSelector } from 'features/Cart/selector';

export default function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const history = useHistory();

  const cartItemCount = useSelector(cartItemsCountSelector);
  const MODE = {
    REGISTER: 'register',
    LOGIN: 'login',
  };
  const [mode, setMode] = useState(() => MODE.LOGIN);

  const handleClose = (event: {}, reason: 'backdropClick') => {
    if (reason === 'backdropClick') {
      return;
    } else {
      setMode(MODE.LOGIN);
      setOpen(false);
    }
  };

  const handleBackdropClick = (event) => {
    //these fail to keep the modal open
    event.stopPropagation();
    return false;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const action = logout();
    handleCloseMenu();
    dispatch(action);
  };

  const handleClickCart = () => {
    history.push('/cart');
  };

  const IconStyled = styled(CodeIcon)({
    marginRight: 10,
  });
  const ButtonStyle = styled(Button)({
    textTransform: 'UpperCase',
    '&:hover': {
      color: 'red',
    },
    '&:active': {
      color: 'red',
    },
  });
  const IconButtonStyle = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '8px',
    right: '8px',
    'z-index': 3,
    color: theme.palette.grey[500],
  }));
  const DialogContentStyle = styled(DialogContent)({
    minWidth: '500px',
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconStyled />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="nav-link" to={'/products'}>
              SSL school
            </Link>
          </Typography>
          <NavLink className="nav-link" to={'/todo'} activeClassName="active-menu">
            <ButtonStyle color="inherit">todo</ButtonStyle>
          </NavLink>
          <NavLink className="nav-link" to={'/album'} activeClassName="active-menu">
            <ButtonStyle color="inherit">album</ButtonStyle>
          </NavLink>
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              login
            </Button>
          )}
          {isLoggedIn && (
            <IconButton onClick={handleClick} color="inherit">
              <AccountCircle />
            </IconButton>
          )}
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleClickCart}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Dialog
        onClose={handleClose}
        onBackdropClick={handleBackdropClick}
        disableEscapeKeyDown
        open={open}
      >
        <IconButtonStyle onClick={handleClose}>
          <Close />
        </IconButtonStyle>
        <DialogContentStyle>
          {mode === MODE.REGISTER && (
            <>
              <Register handleCloseDialog={handleClose} />
              <Box textAlign="center">
                <Button style={{ marginTop: '4px' }} onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account.Login here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login handleCloseDialog={handleClose} />
              <Box textAlign="center">
                <Button style={{ marginTop: '4px' }} onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContentStyle>
      </Dialog>
    </Box>
  );
}
