import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Body from './components/body/Body';

function Biblioteca() {
  return (
    <div className="containerApp">
        <Sidebar/>
        <Body />
    </div>
  );
}

export default Biblioteca;
