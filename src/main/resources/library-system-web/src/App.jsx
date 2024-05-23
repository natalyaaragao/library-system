import './App.css'
import Sidebar from './components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="containerApp">
      <Sidebar/>
      <Outlet />
    </div>
  );
}

export default App
