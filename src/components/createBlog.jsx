import { useState } from "react";
import NavBar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/createBlog.css"

const CreateBlog = () => {

    const [form, setForm] = useState({ title: "", description: "", author: "" })
    const [image, setImage] = useState([]);
    const navigate = useNavigate();

    const create = async () => {
        const formdata = new FormData();
        formdata.append("image", image);
        formdata.append("author", form.author);
        formdata.append("description", form.description);
        formdata.append("title", form.title);
        await axios.post("https://backend-blog-hglt.onrender.com/blogs/create", formdata, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res);
            navigate("/blogs");
        }).catch((e) => {
            console.log(e);
        });
        navigate("/blogs");
    }

    return (
        <div className="create-form-container">
            <NavBar />
            <div className="blog-form">
                <div className="form-container">
                    <section>
                        <input className="input-fields" type="text" placeholder="title" required onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    </section>
                    <section>
                        <input className="input-fields" id="description" type="decription" placeholder="decription" required onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </section>
                    <section>
                        <input className="input-fields" type="file" required onChange={(e) => { setImage(e.target.files[0]) }} />
                    </section>
                    <section>
                        <input className="input-fields" type="author" placeholder="author" required onChange={(e) => setForm({ ...form, author: e.target.value })} />
                    </section>
                    <section>
                        <button id="create-post-btn" onClick={create}>Post</button>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog;