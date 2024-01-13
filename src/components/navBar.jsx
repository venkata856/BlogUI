import useAuth from "../hooks/useAuth";
import "../index.css"
import { NavLink } from "react-router-dom";

function NavBar() {

  const {auth} = useAuth();
  return (
    <nav className="navigation">
        <div className="LogoSection">
            <div className = 'companyLogo'><NavLink to ='/'>Blog</NavLink></div>
        </div>
        <section className='menuitems'>
         <ul className="items">
            <li className="item"><NavLink to ='/'>Home</NavLink></li>
            {auth?.user ? (<li className="item"><NavLink to ='/logout'>Logout</NavLink></li>) : (<li className="item"><NavLink to ='/login'>Login</NavLink></li>)}
            {!(auth?.user) && (<li className="item"><NavLink to ='/signup'>Signup</NavLink></li>)}
            
         </ul>
        </section>
        </nav>
  )
}

export default NavBar;