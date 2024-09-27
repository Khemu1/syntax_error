"use client";


import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Nav from "./Nav";
import CustomProvider from "./CustomProvider";

const Holder: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const noHeaderFooterPaths = ["/signin"];
  const noFooterPaths = ["/admin", "/signin"];

  const shouldHideNav = noHeaderFooterPaths.some((path) =>
    pathName.startsWith(path)
  );
  const shouldHideFooter = noFooterPaths.some((path) =>
    pathName.startsWith(path)
  );

  return (
    <CustomProvider>
        {!shouldHideNav && <Nav />}
        {children}
        {!shouldHideFooter && <Footer />}
    </CustomProvider>
  );
};

export default Holder;
