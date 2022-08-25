import Header from 'components/Header';
import ProductFeature from 'features/Products';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import './App.css';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
  useEffect(() => {
    const fetchProduct = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productApi.getAll(params);
    };
    fetchProduct();
  }, []);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path={'/counter'} component={CounterFeature} exact />
        <Route path={'/'} component={CounterFeature} exact />
        <Route path={'/todo'} component={TodoFeature} />
        <Route path={'/album'} component={AlbumFeature} />
        <Route path={'/products'} component={ProductFeature} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
