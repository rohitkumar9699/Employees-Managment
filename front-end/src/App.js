
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Home';
import AddEmployee from './AddEmployee';
import Update from './Update';
import ViewDetails from './ViewDetails';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<AddEmployee/>}/>
          
          <Route path='/update' element={<Update/>}/>
          <Route path="/update/:id" element={<Update/>} />

          <Route path='/viewdetail' element={<ViewDetails/>}/>
          <Route path="/viewdetail/:id" element={<ViewDetails/>} />
          
          {/* <Route path="/delete/:id" element={<ViewDetails/>} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

