/* eslint-disable @next/next/no-img-element */
import AppLayout from "@/layouts/AppLayout";
import { withAuth } from "@/components/Helpers/withAuth";
import { AiFillCheckCircle } from "react-icons/ai";
import { StatsCard } from "@/components/StatsCard";
import { IoMdCalendar } from "react-icons/io";
import { SearchBar } from "@/components/SearchBar";
import { FaPlus, FaUserCog } from "react-icons/fa";
import Image from "next/image";
import { MdBlock } from "react-icons/md";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Exhibitions() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 mb-8">
          <StatsCard
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Upcoming Exhibitions"
            stats={0}
          />
          <StatsCard
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Completed Exhibitions"
            stats={10}
          />
          <StatsCard
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Next Exhibition"
            stats={"None"}
          />
        </div>
        <div className="flex items-center justify-between text-white mb-8">
          <div className="basis-3/12 flex-1">
            <h1 className="text-xl font-semibold">Exhibitions</h1>
          </div>

          <div className="basis-1/2 flex  justify-end gap-4 items-center font-medium">
            <SearchBar placeholder={"Search"} />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
        </div>
        <Pagination />
      </div>
    </AppLayout>
  );
}

export default Exhibitions;

function ExhibitionCard() {
  return (
    <div className="bg-[#2D2D2D] rounded text-gray-100">
      <div className="m-4">
        <img
          src={"/test-card-image.png"}
          className="w-full"
          alt="Exhibition Image"
        />
      </div>
      <hr className="border-t border-gray-600" />

      <div className="m-4 space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold">Earth Laughs in Flowers</h2>
          <h4 className="text-xs italic">Group Exhibition</h4>
        </div>
        <div className="space-y-1 font-medium">
          <h3 className="text-sm font-semibold">Submission Date:</h3>
          <h4 className="text-xs">Opening Date: 3 Sep 2023 @ 11</h4>
          <h4 className="text-xs">Ending Date: 27 Sep 2023 @ 12</h4>
        </div>
        <span className="flex items-center gap-2 py-1 px-4 rounded text-sm bg-[#26AA77]">
          <AiFillCheckCircle className="w-4 h-4 " />
          <span>Exhibition Period: Started</span>
        </span>
        <span className="flex items-center gap-2 py-1 px-4 rounded text-sm bg-[#687182]">
          <MdBlock className="w-4 h-4 " />
          <span>Submission Period: Closed</span>
        </span>
      </div>

      <hr className="border-t border-gray-600" />
      <div className="m-4 flex justify-between text-xs font-medium">
        <Link
          href={"/artist/exhibitions/exhibition"}
          className="w-full text-center font-medium py-2 px-4 rounded btn-gradient"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
function Pagination() {
  return (
    <div className="py-2 px-4 flex justify-between items-center rounded bg-[#121212] text-xs text-gray-400">
      <span>Showing 1 - 10 of 97</span>
      <div className="flex items-center gap-2">
        <select name="pageNo" id="pageNo" className="p-1 bg-[#2B2B2B] rounded ">
          {Array.from(
            {
              length: 10,
            },
            (_, index) => (
              <option
                className="text-[#121212] bg-white"
                key={index}
                value={index + 1}
              >
                {index + 1}
              </option>
            )
          )}
        </select>
        <button className=" btn-gradient p-1 rounded">
          <BiChevronLeft className="w-4 h-4 fill-gray-700" />
        </button>
        <button className=" btn-gradient p-1 rounded">
          <BiChevronRight className="w-4 h-4 fill-gray-700" />
        </button>
      </div>
    </div>
  );
}
