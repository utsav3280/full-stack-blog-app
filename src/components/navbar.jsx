import { Link } from "react-router-dom";
import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="navbar">
            <div className="brand-text">
                <h1>Blog APP</h1>
            </div>
            <div className="navbar-btns">
                <Link to="/blogs"><button className="home-btn">Home</button></Link>
                <Link to="/blogs/create"><button className="create-btn">Create</button></Link>
                <button className="logout-btn" onClick={logout}>Log out</button>
            </div>
        </div>
    )
}

export default NavBar;