import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
interface AvatarProps {
  src?: string;
}
const Avatar = ({ src }: AvatarProps) => {
  //   if (src) {
  //     return (
  //       <Image
  //         src={src}
  //         alt="Avatar"
  //         className="rounded-full"
  //         height={30}
  //         width={30}
  //       />
  //     );
  //   }
  //   return <FaUserCircle size={50} />;
  return src ? (
    <Image
      src={src}
      alt="Avatar"
      className="rounded-full"
      height={80}
      width={80}
    />
  ) : (
    <FaUserCircle size={30} />
  );
};

export default Avatar;
