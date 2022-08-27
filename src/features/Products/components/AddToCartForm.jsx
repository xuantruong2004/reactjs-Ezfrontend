import { yupResolver } from '@hookform/resolvers/yup';
import { Button, styled, Typography } from '@mui/material';
import QuantityField from 'components/FormControl/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

const PREFIX = 'AddToCartForm';
const classes = {
  root: `${PREFIX}-root`,
  left: `${PREFIX}-left`,
  right: `${PREFIX}-right`,
  paper: `${PREFIX}-paper`,
  pagination: `${PREFIX}-pagination`,
};
const Root = styled('form')(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(1),
    maxWidth: theme.spacing(30),
  },
  [`& .${classes.left}`]: {},
  [`& .${classes.right}`]: {},
  [`& .${classes.pagination}`]: {},
}));

function AddToCartForm({ onSubmit }) {
  const schema = yup
    .object({
      quantity: yup
        .number()
        .required('Please enter quantity')
        .min(1, 'Minimum is 1')
        .typeError('Please enter a number'),
    })
    .required();
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <Root className={classes.root} onSubmit={form.handleSubmit(handleSubmit)}>
      <Typography component="h2" variant="subtitle2">
        So Luong
      </Typography>

      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button type="submit" variant="contained" color="primary" fullWidth size="large">
        Buy
      </Button>
    </Root>
  );
}

export default AddToCartForm;
