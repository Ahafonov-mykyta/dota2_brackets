import { NavLink } from "react-router-dom";
import "./Menu.css";
import { nanoid } from "nanoid";
import dotalogo from "../../images/dota.png";

function Menu({ links }) {
  return (
    <div className="menu">
      <a href="/" className="logo_link">
        {" "}
        <img src={dotalogo} alt="dota log" className="menu_logo" />
      </a>

      {links.map((link) => {
        return (
          <NavLink to={link.path} key={nanoid()} className="navlink">
            {link.title}
          </NavLink>
        );
      })}
      <NavLink to="/find_match" key={nanoid()} className="navlink">
        Find match
      </NavLink>
    </div>
  );
}
export default Menu;
