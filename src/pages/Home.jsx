import '../index.css'
import NavBar from '../components/navBar'
import { Outlet } from 'react-router-dom';

const Home=() =>{
  return (
    <div>
    <div className='section_onee'><NavBar/></div>
    <div className='section_two'><Outlet/></div>
    </div>
    
  );
};

export default Home;