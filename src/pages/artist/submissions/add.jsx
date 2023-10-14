/* eslint-disable @next/next/no-img-element */
import Dropzone from "@/components/Dropzone";
import AppLayout from "@/layouts/AppLayout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AddSubmission() {
  const router = useRouter();
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-au text-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Add Submission</h1>
          <div className="rounded-lg bg-[#2D2D2D] p-8 text-sm">
            <button className="hover:underline" onClick={router.back}>
              &larr; Back
            </button>
            <div className="max-w-2xl mx-auto m-4">
              <SubmissionForm />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function SubmissionForm() {
  return (
    <form className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between ">
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Title</label>
          <input type="text" className="form-input" />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Medium</label>
          <input type="text" className="form-input" />
          <span className="text-xs text-gray-400">exp: canvas, clay etc.</span>
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Size</label>
          <input type="text" className="form-input" value="079 23 45 678" />
          <span className="text-xs text-gray-400">
            {`exp: 100 x 200 } 300 x 200 etc.`}
          </span>
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">R Price</label>
          <input type="email" className="form-input" />
          <span className="text-xs text-gray-400">{`exp: 10, 300, 400`}</span>
        </div>
      </div>
      <select
        name="exhibition"
        id="exhibition"
        className="form-input block max-w-xs mx-auto"
      >
        <option value="">Select Upcoming Exhibition</option>
      </select>
      <Dropzone />
      <div className="text-center space-y-8">
        <span className="inline-flex items-center">
          <input type="checkbox" id="acceptTerms" className="mx-4" />
          <label htmlFor="acceptTerms">
            Accept <Link href={"/terms"}>Terms & Conditions</Link>
          </label>
        </span>
        <br />
        <button className="font-semibold btn-gradient px-8 py-2 rounded text-xl uppercase">
          <span>submit your work</span>
        </button>
      </div>
    </form>
  );
}
