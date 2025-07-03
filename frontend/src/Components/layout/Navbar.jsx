import React from "react";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

function Navbar({active}) {
  return (
    <div className={`${styles.noramlFlex}`}>
         {/* block 800px: */}
         {
            navItems && navItems.map((i,index) => (
                <div className="flex">
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black md:text-[#fff]"} px-6 font-[500] cursor-pointer}`}
                    >
                        {/* pb-[30px] 800px:pb-0   */}
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar
