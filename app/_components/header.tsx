"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "./sidebar";

const Header = () => {

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Sidebar />
    </div>
  );
};

export default Header;
