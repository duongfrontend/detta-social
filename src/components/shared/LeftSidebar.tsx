import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center justify-center">
          <img
            className="spiner"
            width={30}
            src="/assets/images/logo.png"
            alt=""
          />
          <h1 className="font-bold text-2xl tracking-wide">Detta - Social</h1>
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4 capitalize">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {/* {link.imgURL} */}
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        style={{ background: "red", borderRadius: "10px" }}
        variant="ghost"
        className="button-logout"
        onClick={(e) => handleSignOut(e)}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          <CiLogout style={{ fontWeight: "bold" }} />
        </div>
        <p className="small-medium lg:base-medium p-2">Đăng Xuất</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
