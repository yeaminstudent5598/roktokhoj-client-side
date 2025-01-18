import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const MainLayOut = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signUp')
    return (
        <div>
            {noHeaderFooter || <Navbar/>}
            <Outlet></Outlet>
            {noHeaderFooter ||  <Footer/>}
        </div>
    );
};

export default MainLayOut;