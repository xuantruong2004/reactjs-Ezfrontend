import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched, error },
        formState,
      }) => (
        <TextField
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          label={label}
          fullWidth
          variant="outlined"
          margin="normal"
          disabled={disabled}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

export default InputField;
