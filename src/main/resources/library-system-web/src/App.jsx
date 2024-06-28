import './App.css'
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="containerApp">
        <Sidebar/>
        <div>
            <Navbar />
            <Outlet />  
        </div>
    </div>
  );
}

export default App
