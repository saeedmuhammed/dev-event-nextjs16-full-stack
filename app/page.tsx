import EventCard from "@/components/EventCard";
import ExploreEventsBtn from "@/components/ExploreEventsBtn";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Home() {
  const res = await fetch(`${BASE_URL}/api/events`);
  const { events } = await res.json();
  return (
    <div>
      <div className="w-full my-12.5 md:my-25 flex flex-col items-center gap-7.5">
        <div>
          <h1 className="text-center text-[40px] md:text-[64px] font-semibold leading-[110.00000000000001%]">
            The Hub for Every Dev <br />
            Event You Can’t Miss
          </h1>
          <p className="text-center text-sm md:text-lg">
            Hackathons, Meetups, and Conferences, All in One Place
          </p>
        </div>
        <ExploreEventsBtn />
      </div>
      <div className="mt-2.5 mb-25" id="events">
        <h3 className="font-bold text-xl md:text-2xl mb-6">Featured Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6.25 gap-y-12.5 md:gap-y-15">
          {events.map((event: MapperType, index: number) => {
            return (
              <EventCard
                key={index}
                {...{
                  date: event.date,
                  location: event.location,
                  time: event.time,
                  title: event.title,
                  imageSrc: event.image,
                  slug: event.slug,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
