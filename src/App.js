import { BrowserRouter, Routes, Route } from "react-router-dom"
import Blogs from "./components/blogs";
import CreateBlog from "./components/createBlog";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
