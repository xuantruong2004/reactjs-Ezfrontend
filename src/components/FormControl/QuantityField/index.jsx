import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, FormHelperText, IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityField(props) {
  const { form, name, disabled } = props;
  const { formState, setValue } = form;
  const { errors } = formState;
  const hasErrors = !!errors[name];

  return (
    <div>
      <FormControl error={hasErrors} fullWidth margin="normal" variant="outlined" size="small">
        <Controller
          control={form.control}
          name={name}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { isTouched, error },
            formState,
          }) => (
            <Box
              style={{
                display: 'flex',
              }}
            >
              <IconButton
                onClick={() =>
                  setValue(name, Number.parseInt(value) + 1 ? Number.parseInt(value) + 1 : 1)
                }
              >
                <AddCircleOutline />
              </IconButton>
              <OutlinedInput
                id={name}
                type="number"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                error={!!error}
              />
              <IconButton
                onClick={() =>
                  setValue(name, Number.parseInt(value) - 1 ? Number.parseInt(value) - 1 : 1)
                }
              >
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          )}
        />
        <FormHelperText error={!!errors}>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuantityField;
