import "./header.styles.scss";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>Nehanshu's Store</h1>
      </Link>
      <nav className="navigation">
        <NavLink to="/">
          <div className="navigation_item">Home</div>
        </NavLink>
        <NavLink to="/shop">
          <div className="navigation_item">Shop</div>
        </NavLink>
        <NavLink to="/signin">
          <div className="navigation_item">Sign In</div>
        </NavLink>
        {/* <NavLink to="/about">
          <div className="navigation_item">About</div>
        </NavLink> */}
      </nav>
    </header>
  );
};