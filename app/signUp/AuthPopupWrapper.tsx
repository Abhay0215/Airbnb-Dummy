"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import AuthPopup from "./page"; 
import PasswordVerify from "../pages/googleOtp/page"
import RegisterModal from "../pages/registerModal/page"
// import MyProfile from "../profile/page"

type NavbarProps = {
  onAuthTrigger: (login: boolean) => void;
};

export default function AuthPopupWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Navbar
        onAuthTrigger={(login: boolean) => {
          setIsLogin(login);
          setAuthOpen(true);
        }}
      />
      <PasswordVerify/>
      <RegisterModal/>
      {/* <MyProfile /> */}
      <AuthPopup/>
      {children}
    </>
  );
}
