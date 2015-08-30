import R                 from 'ramda';
import React             from 'react';
import { connect }       from 'react-redux';
import { fetchTodos }    from 'app/client/actions/todos';

import fetchDataEnhancer from './../helpers/fetch-data-enhancer';

@fetchDataEnhancer(store => store.dispatch(fetchTodos()))
@connect(R.pick(['todos']))
class Todos extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h1>Todos List</h1>
        </div>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
}

export default Todos;
