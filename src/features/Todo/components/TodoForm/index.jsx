import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/FormControl/InputField';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm({ onSubmit }) {
  const schema = yup
    .object({
      title: yup.string().required('Please enter title').min(5, 'title should > 5 character'),
    })
    .required();
  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const handleTodoSubmit = (value) => {
    console.log('form submit ', value);

    if (onSubmit) {
      onSubmit(value);
    }

    form.reset();
  };
  return (
    <form onSubmit={form.handleSubmit(handleTodoSubmit)}>
      <InputField name="title" label="Todo" form={form} />
    </form>
  );
}

export default TodoForm;
