import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/login.css";

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const login = async () => {
        console.log(loginDetails);
        await axios.post("https://backend-blog-hglt.onrender.com/login", loginDetails).then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            navigate("/blogs");
        }).catch((e) => { console.log(e); })
    }

    return (
        <div>
            <div className="greetings-login">
                <h1>Welcome to Blogs App</h1>
            </div>
            <div className="login-form-container">
                <div className="form">
                    <section id="login-text">
                        <h1>Login</h1>
                    </section>
                    <section>
                        <input className="input-login" type="email" placeholder="email" onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} />
                    </section>
                    <section>
                        <input className="input-login" type="password" minLength="8" placeholder="password" onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} />
                    </section>
                    <section>
                        <section className="login-register">
                            <button className="btn-login" onClick={login}>Login</button>
                        </section>
                        <section className="register-btn">
                            <div>New User?</div>
                            <Link to="/register"><button className="btn-login">Register</button></Link>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Login;