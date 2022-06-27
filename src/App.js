import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage/Homepage";
import Reportpage from "./pages/Reportpage/Reportpage";
import Userpage from "./pages/Userpage/Userpage";
import Forms from "./pages/Forms/Forms";
import NewForm from "./pages/Forms/NewForm";
import EditForm from "./pages/Forms/EditForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/logReg/Login";
import Register from "./pages/logReg/Register";
import FormReportPage from "./pages/Reportpage/FormReportPage/FormReportPage";
// import SingleForm from "./pages/SingleForm/SingleForm";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/form/edit/:id" element={<EditForm />} />
          <Route path="/forms/new" element={<NewForm />} />
          <Route path="/reports" element={<Reportpage />} />
          <Route path="/reports/:id" element={<FormReportPage />} />
          <Route path="/users" element={<Userpage />} />
          {/* <Route path="/edituser/:id" element={<EditUser />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
