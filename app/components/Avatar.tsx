import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
interface AvatarProps {
  src?: string;
}
const Avatar = ({ src }: AvatarProps) => {
  return src ? (
    <Image
      src={src}
      alt="Avatar"
      className="rounded-full"
      height={80}
      width={80}
    />
  ) : (
    <FaUserCircle color="black" size={30} />
  );
};

export default Avatar;
