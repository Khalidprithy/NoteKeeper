import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Completed from "./Pages/Completed";
import Deleted from "./Pages/Deleted";
import Home from "./Pages/Home";
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { VscSymbolKeyword } from 'react-icons/vsc';
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <div className="drawer drawer-mobile">
      <input id="sidebar-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative">
        <Header />
        <Routes >
          <Route path="/" element={<Home />}></Route>
          <Route path="/completed" element={<Completed />}></Route>
          <Route path="/deleted" element={<Deleted />}></Route>
        </Routes>
        <label htmlFor="sidebar-menu" className="fixed top-5 left-5 z-40 bg-gray-100 hover:bg-green-500 rounded-full p-1 drawer-button lg:hidden transition-all ease-in duration-150"><VscSymbolKeyword className="text-3xl" /></label>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-menu" className="drawer-overlay"></label>
        <ul className="menu p-2 w-20 md:w-44 bg-gray-800 pt-20 lg:pt-5 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <label htmlFor="sidebar-menu" className="fixed top-5 left-5 z-40 bg-gray-100 hover:bg-green-500 rounded-full p-1 drawer-button lg:hidden transition-all ease-in duration-150"><VscSymbolKeyword className="text-3xl" /></label>
          <Sidebar />
        </ul>
      </div>
    </div>

  );
}

export default App;

