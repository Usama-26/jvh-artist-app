import useMediaQuery from "@/hooks/useMediaQuery";
import Login from "./auth/login";
import Image from "next/image";

export default function Home() {
  const isMobileScreen = useMediaQuery("(max-width: 720px)");
  return (
    <>
      {isMobileScreen ? (
        <div className="w-screen h-screen flex justify-center flex-col gap-8 text-white">
          <div>
            <Image
              src={"/jvh-logo@2x.png"}
              width={125}
              height={105}
              alt="JVH Gallery"
              className="mx-auto"
            />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Welcome Artist</h1>
            <p className="w-3/5 mx-auto">
              JVH provides you the platform where you can upload and sell your
              best work exploration.
            </p>
          </div>
          <button className="btn-primary uppercase w-4/5 font-medium self-end mx-auto">
            {`Let's Get Started`}
          </button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
