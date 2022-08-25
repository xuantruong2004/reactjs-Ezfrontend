import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ButtonStyles = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 32,
  padding: '0 30px',
  marginRight: 10,
  '&:hover': {
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {},
});
function CounterFeature(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const handleIncrease = () => {
    const action = increase();
    dispatch(action);
  };
  const handleDecrease = () => {
    const action = decrease();
    dispatch(action);
  };
  return (
    <div>
      Counter: {count}
      <div>
        {' '}
        <ButtonStyles size="large" onClick={handleIncrease}>
          Increase
        </ButtonStyles>
        <ButtonStyles onClick={handleDecrease}>Decrease</ButtonStyles>
      </div>
    </div>
  );
}

export default CounterFeature;
