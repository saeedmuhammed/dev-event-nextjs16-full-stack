import Link from "next/link";
import FlexRow from "../shared/FlexRow";
import Image from "next/image";

const ExploreEventsBtn = () => {
  return (
    <Link
      href={"#events"}
      className="px-7.5 py-3.5 border border-[#182830] rounded-full shadow-[8px_24px_32px_0px_#0000001F]
      "
    >
      <FlexRow className="gap-x-1">
        <h3 className="font-medium">Explore Events</h3>
        <Image
          src={"/icons/arrow-down.svg"}
          width={24}
          height={24}
          alt="arrow-down"
        />
      </FlexRow>
    </Link>
  );
};

export default ExploreEventsBtn;
