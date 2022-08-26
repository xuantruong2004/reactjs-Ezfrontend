import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './styles.scss';

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};
const listService = [
  { value: 'isPromotion', label: 'Co khuyen mai' },
  { value: 'isFreeShip', label: 'FreeShip' },
];
function FilterByService({ filters = {}, onChange }) {
  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className="price-wrapper">
      <Typography variant="subtitle2">DICH VU</Typography>
      <ul className="category_list">
        {listService.map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="secondary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
