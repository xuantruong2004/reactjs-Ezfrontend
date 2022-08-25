import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClick = () => {
    if (onChange) onChange(values);
  };
  const handleReset = () => {
    setValues({
      salePrice_lte: 0,
      salePrice_gte: 0,
    });
  };
  return (
    <Box className="price-wrapper">
      <Typography variant="subtitle2">CHON KHOANG GIA</Typography>
      <Box className="input-textFiled">
        <TextField
          size="small"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          size="small"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>
      <Box className="filter-btn">
        <Button fullWidth size="small" variant="outlined" color="primary" onClick={handleClick}>
          Ap dung
        </Button>
        <Button fullWidth size="small" variant="outlined" color="secondary" onClick={handleReset}>
          reset
        </Button>
      </Box>
    </Box>
  );
}

export default FilterByPrice;
