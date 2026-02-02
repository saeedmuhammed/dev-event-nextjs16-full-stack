import Image from "next/image";
import FlexRow from "../shared/FlexRow";
import Link from "next/link";
export interface IEvent {
  imageSrc: string;
  location: string;
  title: string;
  date: string;
  time: string;
  slug: string;
}

const EventCard = ({ imageSrc, location, title, date, time, slug }: IEvent) => {
  return (
    <Link href={`/events/${slug}`} className="rounded-t-[14px] overflow-clip">
      <Image
        src={imageSrc}
        alt="event-image"
        height={300}
        width={400}
        className="w-full"
        objectFit="cover"
      />
      <div className="mt-4 flex flex-col gap-y-3">
        <FlexRow className="gap-x-1">
          <Image
            src={"/icons/pin.svg"}
            width={18}
            height={18}
            alt="location-pin"
          />
          <h4 className="text-sm font-light">{location}</h4>
        </FlexRow>
        <h3 className="text-xl font-semibold">{title}</h3>
        <FlexRow className="gap-x-4">
          <FlexRow className="gap-x-1 leading-0">
            <Image
              src={"/icons/calendar.svg"}
              width={18}
              height={18}
              alt="calendar-icon"
            />
            <h4 className="text-sm font-light ">{date}</h4>
          </FlexRow>
          <div className="w-0.5 h-full rounded-2xl bg-[#BDBDBD]" />
          <FlexRow className="gap-x-1 leading-0">
            <Image
              src={"/icons/clock.svg"}
              width={18}
              height={18}
              alt="clock-icon"
            />
            <h4 className="text-sm font-light">{time}</h4>
          </FlexRow>
        </FlexRow>
      </div>
    </Link>
  );
};

export default EventCard;
