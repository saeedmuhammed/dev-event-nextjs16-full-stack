import BookEventForm from "@/components/BookEventForm";
import EventCard from "@/components/EventCard";
import FlexRow from "@/components/shared/FlexRow";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetail = ({
  icon,
  alt,
  title,
}: {
  icon: string;
  alt: string;
  title: string;
}) => (
  <FlexRow className="gap-2.5">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{title}</p>
  </FlexRow>
);
const EventOverview = ({ overview }: { overview: string }) => (
  <section className="flex flex-col gap-2 my-6">
    <h2 className="text-xl font-semibold ">Overview</h2>
    <p>{overview}</p>
  </section>
);

const EventDetails = ({
  date,
  time,
  venue,
  mode,
  audience,
}: {
  date: string;
  time: string;
  venue: string;
  mode: string;
  audience: string;
}) => (
  <section className="flex flex-col gap-2 mb-6">
    <h2 className="text-xl font-semibold ">Event Details</h2>
    <EventDetail
      icon="/icons/calendar.svg"
      alt="calendar"
      title={new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    />
    <EventDetail icon="/icons/clock.svg" alt="clock" title={time} />
    <EventDetail icon="/icons/pin.svg" alt="venue" title={venue} />
    <EventDetail icon="/icons/mode.svg" alt="mode" title={mode} />
    <EventDetail icon="/icons/audience.svg" alt="audience" title={audience} />
  </section>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <section className="flex flex-col gap-2 mb-6">
    <h2 className="text-xl font-semibold ">Agenda</h2>
    <ul className="list-disc list-inside">
      {agendaItems?.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </section>
);

const EventTags = ({ tagsList }: { tagsList: string[] }) =>
  tagsList?.length > 0 && (
    <section className="flex gap-2.5 flex-wrap w-full my-6">
      <>
        {tagsList.map((tag: string, index: number) => (
          <div
            key={index}
            className="bg-[#0D161A] text-center py-2.5 px-5 rounded-md"
          >
            {tag}
          </div>
        ))}
      </>
    </section>
  );

const EventOrganizer = ({ organizer }: { organizer: string }) => (
  <section className="flex flex-col gap-2 mb-6">
    <h2 className="text-xl font-semibold ">About the Organizer</h2>
    <p>{organizer}</p>
  </section>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/events/${slug}`);
  const event = await res.json();
  const {
    title,
    description,
    image,
    agenda,
    audience,
    date,
    mode,
    organizer,
    overview,
    tags,
    time,
    venue,
  } = event;

  const similarEvents = await getSimilarEventsBySlug(slug);
  return (
    <div className=" py-12.5">
      <div>
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-17.5 my-6">
        <div className="flex-2">
          <Image
            src={image}
            alt={title}
            width={800}
            height={800}
            className="object-cover w-full rounded-xl "
          />
        </div>
        <aside className="flex-1 h-fit bg-[#0D161A] rounded-xl">
          <BookEventForm eventId={event?._id} />
        </aside>
      </div>
      <EventOverview overview={overview} />
      <EventDetails
        date={date}
        time={time}
        venue={venue}
        mode={mode}
        audience={audience}
      />
      <EventAgenda agendaItems={agenda} />
      <EventOrganizer organizer={organizer} />
      <EventTags tagsList={tags} />
      <section className="border-t">
        <h2 className="text-2xl font-semibold my-6">Similar Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6.25 gap-y-12.5 md:gap-y-15">
          {similarEvents.map((event: MapperType, index: number) => {
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
      </section>
    </div>
  );
};

export default EventDetailsPage;
