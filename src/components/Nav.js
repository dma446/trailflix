import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.svg";
import tmdb_logo from "../assets/tmdb_logo.svg"
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);    
    useEffect(() => {
        window.addEventListener("scroll" , () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, []);



    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src={logo}
                alt="Trailflix Logo"
            />
            <img
                className="nav__tmdb"
                src={tmdb_logo}
                alt="TMDB Logo"
            />
        </div>
    )
}

export default Nav;
