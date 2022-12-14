import Header from 'components/Header';
import CartFeature from 'features/Cart';
import ProductFeature from 'features/Products';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>

      <div className="container">
        <Switch>
          <Route path={'/counter'} component={CounterFeature} exact />
          <Route path={'/'} component={CounterFeature} exact />
          <Route path={'/todo'} component={TodoFeature} />
          <Route path={'/album'} component={AlbumFeature} />
          <Route path={'/products'} component={ProductFeature} />
          <Route path={'/cart'} component={CartFeature} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
