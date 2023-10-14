import Image from "next/image";
import { HiMenuAlt1 } from "react-icons/hi";
export default function MobileHeader({ onToggle }) {
  return (
    <div className="w-full sticky top-0 p-4 shadow-md bg-[#272727]  rounded-b-xl z-30">
      <div className="flex justify-between">
        <button onClick={onToggle}>
          <HiMenuAlt1 className="w-10 h-10 fill-white" />
        </button>
        <Image
          src={"/jvh-logo@2x.png"}
          width={125}
          height={105}
          alt="JVH GALLERY LOGO"
          className="w-20"
        />
        <button className="rounded-full p-1">
          <Image
            src={"/sample-user-2.jpg"}
            width={125}
            height={105}
            alt="JVH GALLERY LOGO"
            className="w-10 aspect-square object-cover rounded-full"
          />
        </button>
      </div>
    </div>
  );
}
