import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
  handleCloseDialog: PropTypes.func,
};
function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { handleCloseDialog } = props;
      if (handleCloseDialog) handleCloseDialog();
    } catch (error) {
      console.log('Failed to register', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
