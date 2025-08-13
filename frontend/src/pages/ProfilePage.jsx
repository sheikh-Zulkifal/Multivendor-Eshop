import React from "react";
import Header from "../Components/layout/Header.jsx"
import styles from "../styles/styles";
import ProfileSidebar from "../Components/Profile/ProfileSidebar.jsx";
import ProfileContent from "../Components/Profile/ProfileContent.jsx";

const ProfilePage = () => {
  const [active, setActive] = React.useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10 min-h-screen`}>
        <div className=" w-[335px] sticky mt-[16%] md:mt-0 ">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
