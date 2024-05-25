import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./components/home/Home";
import AddEditForm from "./components/jobs/AddEditForm";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addjob" element={<AddEditForm />} />
          <Route path="/editjob" element={<AddEditForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
