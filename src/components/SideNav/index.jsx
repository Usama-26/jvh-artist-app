import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaUser, FaUserCog } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { withAuth } from "../Helpers/withAuth";
import { useEffect, useRef, useState } from "react";
import socket from "../../../socket";
import { getUsers, logOutRequest } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BiChevronDown,
  BiChevronRight,
  BiCog,
  BiSolidBarChartSquare,
  BiImage,
} from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Menu } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import useMediaQuery from "@/hooks/useMediaQuery";

const SideNav = ({ isOpen, onToggle }) => {
  const user = useSelector(({ auth }) => auth.user);
  const isMobileScreen = useMediaQuery("(max-width: 720px)");
  const chatsCount = useRef(0);
  const [contactCount, setContactCount] = useState(0);
  const usersData = useSelector(({ auth }) => auth.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const userStatus = useSelector(({ auth }) => auth.userStatus);

  const styles = {
    "list-item":
      "menu-list-item block px-10 2xl:py-5 py-3 2xl:text-[18px] text-sm hover:bg-[#21DDB855] font-medium ",
    "list-item__icon": "w-5 h-5 inline stroke-white mr-2",
  };
  const getUsers1 = (page) => {
    let status = "isApproved";
    let value = false;
    let status2 = "isActive";
    let value2 = true;
    dispatch(getUsers(page, "staff", status, value, status2, value2));
  };
  socket.on("new-conversation", () => {
    chatsCount.current += 1;
  });
  socket.on("signup-approval", () => {
    getUsers1(1);
  });

  socket.off("contactFormData").on("contactFormData", () => {
    const count = localStorage.getItem("contactCount");
    if (count === null) {
      localStorage.setItem("contactCount", 1);
      setContactCount(1);
    } else {
      localStorage.setItem("contactCount", Number(count) + 1);
      setContactCount(count + 1);
    }
  });

  useEffect(() => {
    if (router.asPath === "/artist/notifications") {
      setContactCount(0);
      localStorage.setItem("contactCount", 0);
    } else {
      const count = localStorage.getItem("contactCount");
      count === null ? setContactCount(0) : setContactCount(count);
    }
  });

  useEffect(() => {
    getUsers1(1);
  }, []);
  useEffect(() => {
    if (usersData?.results?.length > 0) {
      if (
        usersData?.results[0] &&
        !usersData?.results[0]?.isApproved &&
        usersData?.results[0]?.isActive
      ) {
        setSignUpApprovals(usersData?.results?.length);
      }
    }
  }, [usersData]);

  useEffect(() => {
    const status = localStorage.getItem("userStatus");
    if (status == "Online") {
      socket.emit("new-staff-add", user?.id);
    } else {
      socket.emit("forceDisconnect", user?.id);
    }
  }, [userStatus]);

  const handleLogout = () => {
    dispatch(logOutRequest(user?.id, () => {}));
  };

  useEffect(() => {
    socket.once("user_inacive_by_admin", () => {
      handleLogout();
    });
    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("user_inacive_by_admin", handleLogout);
    };
  }, []);

  return (
    <div
      className={`sidenav fixed top-0 left-0 h-screen md:block transition-all duration-300 ${
        isOpen ? "ml-0 w-4/5" : "md:ml-0 -ml-96 "
      } sidenav-width  bg-[#1E1E1E] overflow-auto z-50`}
    >
      <Image
        src="/jvh-logo@2x.png"
        width={125}
        height={105}
        alt="Company Logo"
        className="md:w-24 w-20 mx-auto mb-4 md:mb-6"
      />
      {isMobileScreen && (
        <button onClick={onToggle} className="absolute top-2 right-2">
          <HiX className="w-6 h-6 fill-white" />
        </button>
      )}
      <ul className="my-4 text-white">
        <li>
          <Link
            href="/artist"
            className={`${styles["list-item"]} ${
              router.pathname === "/artist" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <MdDashboard className={styles["list-item__icon"]} />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/artist/exhibitions"
            className={`${styles["list-item"]} ${
              router.pathname === "/artist/exhibitions" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <IoMdCalendar className={styles["list-item__icon"]} />
            Exhibitions
          </Link>
        </li>

        <li>
          <Link
            href="/artist/submissions"
            className={`${styles["list-item"]} ${
              router.pathname === "/artist/submissions" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <FaListCheck className={styles["list-item__icon"]} />
            Submissions
          </Link>
        </li>

        <li>
          <Link
            href="/artist/profile"
            className={`${styles["list-item"]} ${
              router.pathname === "/artist/profile" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <div className="relative inline-flex items-center justify-center">
              <BiCog className={styles["list-item__icon"]} />
              Profile Settings
            </div>
          </Link>
        </li>
      </ul>
      <div className="border-t bg-[#1E1E1E] border-gray-700 sticky bottom-0 text-white">
        <Link
          href="/artist/logout"
          className={`block px-10 py-3 text-sm 2xl:text-[18px] text-[#21DDB8] hover:bg-gray-700`}
        >
          <FiLogOut className={"w-5 h-5 inline stroke-[#21DDB8] mr-2"} />
          Logout
        </Link>
      </div>
    </div>
  );
};
export default SideNav;
