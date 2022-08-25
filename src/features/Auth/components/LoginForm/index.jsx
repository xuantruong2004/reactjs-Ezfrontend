import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/FormControl/InputField';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import PasswordField from 'components/FormControl/PasswordField';
import 'App.css';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const PREFIX = 'LoginForm';
const classes = {
  root: `${PREFIX}-root`,
  avatar: `${PREFIX}-avatar`,
  title: `${PREFIX}-title`,
  submit: `${PREFIX}-submit`,
  input: `${PREFIX}-input`,
  progress: `${PREFIX}-input`,
};
const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    position: 'relative',
    paddingTop: theme.spacing(2),
  },
  [`& .${classes.avatar}`]: {
    backgroundColor: theme.palette.secondary.light,
    margin: '0 auto',
  },
  [`& .${classes.title}`]: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 3, 0),
    fontWeight: '700',
    color: theme.palette.primary.main,
  },
  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 0, 0),
  },
  [`& .${classes.progress}`]: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
  },
}));

function LoginForm({ onSubmit }) {
  const schema = yup
    .object({
      identifier: yup.string().required('Please enter your email').email(),
      password: yup.string().required('Password is required'),
    })
    .required();
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;
  const handleTodoSubmit = async (values) => {
    console.log('form submit ', values);

    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <Root className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h1" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleTodoSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          size="large"
        >
          Sign in
        </Button>
      </form>
    </Root>
  );
}

export default LoginForm;
