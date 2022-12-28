import axios from "axios";
import { useState } from "react";
import "./styles/register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {

    const [registerDetails, setRegisterDetails] = useState({ email: "", password: "", confirmpassword: "" })
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    const register = async () => {
        // console.log(registerDetails);
        if (registerDetails.password === registerDetails.confirmpassword) {
            let details = { email: registerDetails.email, password: registerDetails.password }
            await axios.post("https://backend-blog-hglt.onrender.com/register", details).then((res) => {
                console.log(res);
                if (res.data.status === "Failed") {
                    setText("Email already Exists")
                }
                else {
                    navigate("/");
                }
            }).catch((e) => { console.log(e); })
        }
        else {
            setShow(true);
            setText("Passwords do not match");
        }
    }

    return (
        <div>
            <div className="greetings-login">
                <h1>Welcome to Blogs App</h1>
            </div>
            <div className="login-form-container">
                <div className="form">
                    <section id="login-text">
                        <h1>Register</h1>
                    </section>
                    <section>
                        <input className="input-login" type="email" placeholder="email" onChange={(e) => setRegisterDetails({ ...registerDetails, email: e.target.value })} />                </section>
                    <section>
                        <input className="input-login" type="password" placeholder="password" onChange={(e) => setRegisterDetails({ ...registerDetails, password: e.target.value })} />
                    </section>
                    <section>
                        <input className="input-login" type="password" placeholder="confirm password" onChange={(e) => setRegisterDetails({ ...registerDetails, confirmpassword: e.target.value })} />
                    </section>
                    <section className="register-section">
                        <button className="btn-login" onClick={register}>Register</button>
                    </section>
                    {show ? <section id="displayText">{text}</section> : ""}
                    <section className="register-btn">
                        <div>Existing User?</div>
                        <Link to="/"><button className="btn-login">Login</button></Link>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Register;