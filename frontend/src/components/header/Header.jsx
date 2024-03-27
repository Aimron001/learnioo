import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../features/api/userApiSlice";
import { logout } from '../../features/auth/authSlice';
import { onUserLogout } from '../../features/books/bookSlice'
import { toast } from "react-toastify";

export default function Header(){
    const { userInfo } = useSelector(state=> state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [logoutApiCall ] = useLogoutMutation()
    async function handleLogout(){
        try {
            navigate("/")
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(onUserLogout())
        } catch (err) {
            toast.error(err);
        }
    }
    return (
        <header>
            <img src={logo} alt="logo" width="70px" height="70px" style={{borderRadius:"50%"}}/>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="workspace">Workspace</NavLink>
                {userInfo ? <button onClick={handleLogout}>Logout</button> :<NavLink to="login">Get Started</NavLink>}
            </nav>
        </header>
    )
}