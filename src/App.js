import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Completed from "./Pages/Completed";
import Deleted from "./Pages/Deleted";
import Home from "./Pages/Home";
import { VscSymbolKeyword } from 'react-icons/vsc';
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Footer from "./components/Footer";

function App() {

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';

  return (
    <div className="drawer drawer-mobile bg-white dark:bg-gray-700">
      <input id="sidebar-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative">
        {!isLoginPage && !isSignUpPage ? <Header /> : null}
        <Routes >
          <Route path="/" element={<Home />}></Route>
          <Route path="/completed" element={<Completed />}></Route>
          <Route path="/deleted" element={<Deleted />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        {!isLoginPage && !isSignUpPage ? <Footer /> : null}
        <label htmlFor="sidebar-menu" className={`${!isLoginPage && !isSignUpPage ? 'block' : 'hidden'} fixed top-5 left-5 z-40 bg-gray-100 hover:bg-green-500 rounded-full p-1 drawer-button lg:hidden transition-all ease-in duration-150`}><VscSymbolKeyword className="text-3xl" /></label>

        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-menu" className="drawer-overlay"></label>
        <ul className={`menu ${!isLoginPage && !isSignUpPage ? 'w-20 md:w-44 p-2' : 'w-0'} bg-gray-800 pt-20 lg:pt-5 text-base-content`}>
          {/* <!-- Sidebar content here --> */}
          <label htmlFor="sidebar-menu" className={`${!isLoginPage && !isSignUpPage ? 'block' : 'hidden'} fixed top-5 left-5 z-40 bg-gray-100 hover:bg-green-500 rounded-full p-1 drawer-button lg:hidden transition-all ease-in duration-150`}><VscSymbolKeyword className="text-3xl" /></label>

          {!isLoginPage && !isSignUpPage ? <Sidebar /> : null}

        </ul>
      </div>
    </div>

  );
}

export default App;

