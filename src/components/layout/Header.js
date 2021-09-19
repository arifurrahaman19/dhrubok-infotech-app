import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container flex">
          <div className="flex items-center ml-auto">
            <img src="/assets/svg/location.svg" alt="location" />
            <p>75/3, Palashnagar, Mirpur-11, Dhaka-1216,</p>
          </div>
        </div>
      </div>

      <div className="header__main">
        <div className="container">
          <div className="flex items-center">
            <Link className="brand" to={"/"}>
              Arifur <span>Rahaman</span>
            </Link>

            <div className="flex items-center ml-auto">
              <div className="flex items-center mr-12">
                <img src="/assets/svg/email.svg" alt="email" />
                <a href="mailto:dpt.arif03@gmail.com">dpt.arif03@gmail.com</a>
              </div>

              <div className="flex items-center">
                <img src="/assets/svg/phone.svg" alt="mobile-number" />
                <a href="tel:+8801750686711">01750686711</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
