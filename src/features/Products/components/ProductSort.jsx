import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort(props) {
  const { currentSort, onChange } = props;
  const handleSortChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <Tabs
      onChange={handleSortChange}
      value={currentSort}
      textColor="primary"
      indicatorColor="primary"
      aria-label="secondary tabs example"
    >
      <Tab label="Gia thap toi cao" value="salePrice:ASC"></Tab>
      <Tab label="Gia cao toi thap" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
