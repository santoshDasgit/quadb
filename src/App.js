import logo from './logo.svg';
import './App.css';
import Base from './component/Base';
import { Routes, Route } from 'react-router-dom';
import Detail from './component/Detail';
function App() {
  return (
    <div className="App">


      <Routes>
        // all route
        <Route path='/' element={<Base />}></Route>
        <Route path='/details/:id' element={<Detail />}></Route>
      </Routes>

    </div>


  );
}

export default App;
