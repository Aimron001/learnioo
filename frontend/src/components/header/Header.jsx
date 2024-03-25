import "./header.css";
import { NavLink } from "react-router-dom";
import logo from "../../../public/logo.png";
export default function Header(){
    return (
        <header>
            <img src={logo} alt="logo" width="70px" height="70px" style={{borderRadius:"50%"}}/>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="workspace">Workspace</NavLink>
                <button>Get started</button>
            </nav>
        </header>
    )
}