import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="homeWrapper">
      <div className="container">
        <div className="grid grid-col-lg-2/8">
          <div className="siderbar">
            <Sidebar />
          </div>
          <div className="main-contents">{children}</div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Layout;
