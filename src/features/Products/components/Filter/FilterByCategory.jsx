import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import './styles.scss';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(list.map((x) => ({ id: x.id, name: x.name })));
      } catch (error) {
        console.log('failed to fetch Category', error);
      }
    })();
  }, []);
  const handleCategoryClick = (category) => {
    if (!onChange) return;
    onChange(category.id);
  };

  return (
    <Box className="category-wrapper">
      <Typography variant="subtitle1">DANH MUC SAN PHAM</Typography>
      <ul className="category_list">
        {categoryList.map((category) => (
          <li
            className="category-item"
            key={category.id}
            onClick={() => handleCategoryClick(category)}
          >
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
