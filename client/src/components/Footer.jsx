import React from "react";
import { FaFacebookF, FaInstagram, FaRss, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <section id="footer">
        <ul className="icons">
          <li>
            {/* for example : 
                    <Link to={"/instagram.com"}>
                    </Link> */}
            <Link>
              <FaTwitter size={18} style={{ color: "red" }} />
            </Link>
          </li>
          <li>
            <Link>
              <FaFacebookF size={18} style={{ color: "red" }} />
            </Link>
          </li>
          <li>
            <Link>
              <FaInstagram size={18} style={{ color: "red" }} />
            </Link>
          </li>
          <li>
            <Link>
              <FaRss size={18} style={{ color: "red" }} />
            </Link>
          </li>
          <li>
            <Link>
              <MdOutlineEmail size={18} style={{ color: "red" }} />
            </Link>
          </li>
        </ul>
        <p className="copyright">
          &copy; Untitled. Design:{" "}
          <Link to="https://walidalitr.github.io/My-Portfolio/" target="_blank">
            Walid Ali
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Footer;
