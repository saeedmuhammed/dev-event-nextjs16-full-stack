import Image from "next/image";
import FlexRow from "../shared/FlexRow";
import Link from "next/link";

interface INavItem {
  label: string;
  href: string;
}

const Nav = () => {
  const navItems: INavItem[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Events",
      href: "/",
    },
    {
      label: "Create Event",
      href: "/create-event",
    },
  ];
  return (
    <FlexRow className="py-7 justify-between border-b border-[#151024] site-shell bg-[#12121280]">
      <FlexRow className="gap-1.5">
        <Image
          src={"/icons/logo.png"}
          width={24}
          height={24}
          alt="dev-event-logo"
        />
        <div className="text-xl font-bold hidden md:block">DevEvent</div>
      </FlexRow>
      <FlexRow className="gap-x-6">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </FlexRow>
    </FlexRow>
  );
};

export default Nav;
