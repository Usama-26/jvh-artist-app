import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import ModalOverlay from "@/components/ModalOverlay";
import SideNav from "@/components/SideNav";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function AppLayout({ children }) {
  const isMobileScreen = useMediaQuery("(max-width: 720px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <SideNav isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className="main-margin bg-[#171717]">
        {isMobileScreen ? (
          <MobileHeader onToggle={toggleSidebar} />
        ) : (
          <Header />
        )}
        {children}
      </div>
      <ModalOverlay isOpen={isSidebarOpen} />
    </div>
  );
}
