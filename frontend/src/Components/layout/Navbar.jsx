import React from "react";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

function Navbar({active}) {
  return (
    <div className={` block md:${styles.noramlFlex}  `}>
         {
            navItems && navItems.map((i,index) => (
                <div className="flex">
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black md:text-[#fff]"} pb-[30px] md:pb-0 px-6 font-[500] cursor-pointer}`}
                    >
                        
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar
