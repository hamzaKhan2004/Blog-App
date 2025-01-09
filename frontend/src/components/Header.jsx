import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className="border-b-2 dark:text-gray-200">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-comming"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Hamza
        </span>{" "}
        Blog
      </Link>
      <div className=" md:w-auto md:flex md:items-center">
        <form className="w-full ">
          <TextInput
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-9 lg:hidden" color="gray">
          <AiOutlineSearch />
        </Button>
        <Navbar.Collapse className="hidden md:flex md:items-center md:ml-5">
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link
              to="/"
              className={`${
                path === "/"
                  ? " text-green-700 border-b-2    border-b-green-500"
                  : " text-black dark:text-gray-200"
              } ml-3 text-base transition-all  duration-200`}
            >
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link
              to="/about"
              className={`${
                path === "/about"
                  ? " text-green-700 border-b-2   border-b-green-500"
                  : " text-black dark:text-gray-200"
              }  text-base transition-all duration-200`}
            >
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link
              to="/projects"
              className={`${
                path === "/projects"
                  ? " text-green-700 border-b-2   border-b-green-500"
                  : " text-black dark:text-gray-200"
              } text-base transition-all duration-200`}
            >
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </div>

      <div className="flex gap-2 md:order2">
        <Button
          className="w-12 h-10 hidden sm:inline "
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            inline
            arrowIcon={false}
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToPink" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle className="" />
      </div>

      <Navbar.Collapse className="md:hidden sm:w-full  ">
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link
            to="/"
            className={`${
              path === "/"
                ? "  bg-green-700  text-white border-b-2 border-green-600"
                : " text-black dark:text-gray-200 "
            } inline-block w-full  p-4 font-semibold text-lg`}
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link
            to="/about"
            className={`${
              path === "/about"
                ? "  bg-green-700  text-white border-b-2 border-green-600"
                : " text-black dark:text-gray-200"
            } inline-block w-full  p-4 font-semibold text-lg`}
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link
            to="/projects"
            className={`${
              path === "/projects"
                ? "  bg-green-700  text-white border-b-2 border-green-600"
                : " text-black dark:text-gray-200"
            } inline-block w-full  p-4 font-semibold text-lg`}
          >
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
