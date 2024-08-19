import Link from "next/link";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="border-b-2 border-b-gray-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight bg-gradient-to-b from-slate-500 to-neutral-700 text-transparent bg-clip-text dark:from-slate-400 dark:to-neutral-300"
        >
          Itsie le dog
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
