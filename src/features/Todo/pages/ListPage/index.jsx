import { useState } from 'react';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      name: 'React',
      status: 'new',
    },
    {
      id: 2,
      name: 'Java',
      status: 'new',
    },
    {
      id: 3,
      name: 'PHP',
      status: 'completed',
    },
  ];
  const [todoList, setTodoList] = useState(initTodoList);
  const [show, setShow] = useState('all');
  const handleClick = (todo, index) => {
    const newTodoList = [...todoList];
    newTodoList[index] = {
      ...todo,
      status: todo.status === 'new' ? 'completed' : 'new',
    };
    setTodoList(newTodoList);
  };
  const handleShowAll = () => {
    setShow('all');
  };
  const handleShowComplete = () => {
    setShow('completed');
  };
  const handleShowNew = () => {
    setShow('new');
  };
  const renderFilter = todoList.filter((todo) => show === 'all' || todo.status === show);
  const handleFormSubmit = (value) => {
    console.log('form Todo value:', value.title);
    const newTodo = {
      id: todoList.length + 1,
      name: value.title,
      status: 'new',
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };
  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleFormSubmit} />
      <h3>TodoList</h3>
      <TodoList todoList={renderFilter} onTodoClick={handleClick} />
      <button onClick={handleShowAll}>showAll</button>
      <button onClick={handleShowComplete}>showCompleted</button>
      <button onClick={handleShowNew}>showNew</button>
    </div>
  );
}

export default ListPage;
