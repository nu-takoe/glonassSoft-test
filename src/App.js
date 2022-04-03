import React, { useState } from 'react';
import Graph from './components/Graph';
import Tabs from './components/Tabs';
import { storeContext } from './StoreContext';

function App() {
  const [store, setStore] = useState({
    first: [],
    second: [],
    third: [],
    id: 0
  })

  const [visible, setVisible] = useState(true)

  const { Provider } = storeContext

  return (
    <div className="App">
      <Provider value={[store, setStore]}>
        {visible && (<div><p>максимальный y = +/-15 x = 85, можно больше, но выходит за пределы ┐(シ)┌ </p><p onClick={() => setVisible(prev => !prev)} style={{ cursor: 'pointer', width: 100, textAlign: 'center' }}>кликни меня</p></div>)}
        <Tabs />
        <Graph name='first' color="rgb(200,0,0)" />
        <Graph name='second' color="rgb(0,200,0)" />
        <Graph name='third' color="rgb(0,0,200)" />
      </Provider>
    </div>
  );
}

export default App;
