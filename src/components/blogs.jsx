import { useEffect } from "react";
import { useState } from "react";
import NavBar from "./navbar";
import axios from "axios";
import "./styles/blogs.css";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("https://backend-blog-hglt.onrender.com/blogs", {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res);
            setBlogs(res.data.blogs)
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    return (
        <>
            <NavBar />
            <div className="blogs-container">
                {
                    blogs.map((ele, idx) => {
                        return (
                            <div key={idx} className="blog">
                                <div className="blog-idx">
                                    <p>Title: {ele.title}</p>
                                    <img src={ele.image} alt="img" className="img-blog"/>
                                    <p>Description: {ele.description}</p>
                                    <p>Author: {ele.author}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Blogs;