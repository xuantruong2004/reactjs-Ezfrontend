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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const PREFIX = 'RegisterForm';
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

function RegisterForm({ onSubmit }) {
  const schema = yup
    .object({
      fullName: yup
        .string()
        .required('Please enter your fullname')
        .test('should has at least two words', 'Please enter at least two words', (value) => {
          return value.trim().split(' ').length >= 2;
        }),
      email: yup.string().required('Please enter your email').email(),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password at least 6 character'),
      retypePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    .required();
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;
  const handleTodoSubmit = async (values) => {
    console.log('form submit ', values);

    if (onSubmit) {
      await onSubmit(values);
    }

    // form.reset();
  };
  return (
    <Root className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h1" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleTodoSubmit)}>
        <InputField name="fullName" label="FullName" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="RetypePassword" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          size="large"
        >
          Create an account
        </Button>
      </form>
    </Root>
  );
}

export default RegisterForm;
