import React from "react";
import Header from "../components/header/header";
import "../styles/homepage.css";
import { NavLink } from "react-router-dom";
import { TbForbid2 } from "react-icons/tb";
import BotpressChatbot from "../components/bot";
import "../styles/global.css";
import { BiRun } from "react-icons/bi";
import { motion } from "framer-motion";
import Services from "../components/homepage/Services";

export default function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1>
            Welcome, <span>Debre Markos</span>  Project Team
          </h1>

          <p>
            Ignite Success with Debre Markos 
            University Employee-Exclusive Platform.
          </p>

          <NavLink to={"/login"}>
            Get Started <BiRun />
          </NavLink>
        </div>
      </section>
      {/* <BotpressChatbot/> */}
      < Services/>
    </div>
  );
}