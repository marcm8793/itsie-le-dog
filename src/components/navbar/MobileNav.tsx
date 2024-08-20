import { Dog } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "./theme-toggle";

const MobileNav = () => {
  return (
    <div className="flex justify-between items-center p-4 space-x-2">
      <ModeToggle />
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={"/sign-in"}
      >
        <Dog />
      </Link>
    </div>
  );
};

export default MobileNav;
