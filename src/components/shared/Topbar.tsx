import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { CgLogOut } from "react-icons/cg";
import { CgMenuLeftAlt } from "react-icons/cg";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Topbar = () => {
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <>
      <section className="topbar">
        <div className="flex-between py-4 px-5">
          <div onClick={() => setActive(!active)}>
            <CgMenuLeftAlt
              className={`${active ? "text-primary-500" : ""}`}
              style={{ fontSize: "30px" }}
            />
          </div>
          <Link to="/" className="flex gap-3 items-center">
            <img
              className="spiner"
              src="/assets/images/logo.png"
              alt="logo"
              width={30}
              height={30}
            />
            <h1 className="font-bold text-2xl tracking-wide">Detta-Stack</h1>
          </Link>

          <div className="flex gap-4">
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </section>
      <section
        className={` flex flex-col bg-dark-2 none ${
          active ? "active-menu" : ""
        }`}>
        <div className="icons" onClick={() => setActive(false)}>
          <IoMdClose />
        </div>
        <div className="bottom-bar">
          {bottombarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <Link
                key={`bottombar-${link.label}`}
                to={link.route}
                className={`${
                  isActive && "rounded-[10px] bg-primary-500 "
                } flex-center flex-col gap-1 p-2 transition`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={16}
                  height={16}
                  className={`${isActive && "invert-white"}`}
                />

                <p className="tiny-medium text-light-2">{link.label}</p>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-around items-center p-4 ">
          <Button className="icons-menus" onClick={() => signOut()}>
            {/* <img src="/assets/icons/logout.svg" alt="logout" /> */}
            {/* <CgLogOut className="logout" /> */}
            Đăng Xuất
          </Button>
        </div>
      </section>
    </>
  );
};

export default Topbar;
