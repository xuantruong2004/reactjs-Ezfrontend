import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import { useSnackbar } from 'notistack';
import { PropTypes } from 'prop-types';

Register.propTypes = {
  handleCloseDialog: PropTypes.func,
};
function Register(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      const { handleCloseDialog } = props;
      if (handleCloseDialog) handleCloseDialog();
      console.log('New user', user);
      enqueueSnackbar('Register is success', { variant: 'success' });
    } catch (error) {
      console.log('Failed to register', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
