/* eslint-disable @next/next/no-img-element */
import useMediaQuery from "@/hooks/useMediaQuery";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";
import { FaCirclePlus, FaFileCirclePlus } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";

export default function Exhibition() {
  const router = useRouter();
  const isMobileScreen = useMediaQuery("(max-width: 720px)");
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="max-w-6xl mx-auto">
          {isMobileScreen && (
            <div className="mb-4">
              <button className=" hover:underline" onClick={router.back}>
                <BiChevronLeft className="inline w-6 h-6" />
                <span className="text-xs">Back</span>
              </button>
            </div>
          )}
          <h1 className="text-2xl font-bold md:text-left text-center">
            Exhibition Details
          </h1>
          <div className="rounded-lg md:bg-[#2D2D2D] md:p-8 p-4 text-sm">
            {!isMobileScreen && (
              <button className=" hover:underline" onClick={router.back}>
                <BiChevronLeft className="inline w-6 h-6" />
                <span className="text-xs">Back</span>
              </button>
            )}
            <div className="m-4">
              <img
                src={"/test-card-image.png"}
                alt="Exhibition Image"
                className="mx-auto mb-4"
              />
              <div className="space-y-3">
                <h1 className="text-xl font-bold text-center">
                  Earth Laughs in Flowers
                </h1>
                <h6 className=" text-center ">Group Exhibition</h6>
                <h6 className=" text-center">Exhibtion 1</h6>
                <h2 className="text-lg font-bold text-center">Complete</h2>
              </div>
              <div className="max-w-lg mx-auto flex md:flex-row flex-col md:text-left text-center   justify-between gap-8 md:gap-0 py-4 mb-4">
                <div>
                  <h4 className="mb-2 font-medium">Exhibition Period:</h4>
                  <h6>
                    <span className="font-medium">Starting Date: </span>
                    <span className="text-gray-300">3 Sep 2023 @ 11</span>
                  </h6>
                  <h6>
                    <span className="font-medium">Ending Date: </span>
                    <span className="text-gray-300">27 Sep 2023 </span>
                  </h6>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">Submission Period:</h4>
                  <h6>
                    <span className="font-medium">Opening Date: </span>
                    <span className="text-gray-300">3 Sep 2023 @ 11</span>
                  </h6>
                  <h6>
                    <span className="font-medium">Ending Date: </span>
                    <span className="text-gray-300">27 Sep 2023 </span>
                  </h6>
                </div>
              </div>
              <div className="space-y-4 text-center">
                <button
                  disabled
                  className="inline-block py-1 px-4 rounded text-sm bg-[#26AA77]"
                >
                  <span>Exhibition Period: Started</span>
                </button>
                <br />
                <button className="inline-block py-1 px-4 rounded text-sm bg-[#687182]">
                  <span>Submission Period: Closed</span>
                </button>
              </div>
              <div className="py-4 space-y-3">
                <h3 className="text-xl font-semibold text-center">
                  My Submissions
                </h3>
                <h3 className="text-xl font-semibold text-center">3</h3>
              </div>
              <div className="text-center space-y-8">
                <Link
                  href={"/artist/submissions"}
                  className=" font-medium py-2 px-4 rounded btn-gradient"
                >
                  View Submissions
                </Link>
                <br />
                {/* <button
                  disabled
                  className=" inline-flex items-center btn-danger uppercase text-lg"
                >
                  <MdBlock className="w-6 h-6 fill-white" />
                  <span>Submissions Closed</span>
                </button> */}

                <button className="inline-flex items-center gap-3 text-lg font-semibold btn-gradient btn-primary uppercase">
                  <FaCirclePlus className="w-6 h-6 fill-white" />
                  <span>Add your Work</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
