import Image from "next/image";
import Link from "next/link";
import React from "react";
import VSTechLogo from "./VSTechLogo";
import { SignIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex  items-center justify-between">
      <div>
        <Link href={"/"}>
          <VSTechLogo />
        </Link>
      </div>
      <div className="px-5 flex space-x-2 items-center">
        {/* Theme toggler */}
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
