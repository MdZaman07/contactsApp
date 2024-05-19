import Link from "next/link";
import Avatar from "./Avatar";

type ContactCardProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const ContactCard = ({ id, name, email, phone }: ContactCardProps) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-2">
        <Avatar src="/avatar1.jpg" />
        <h2 className="text-xl font-bold ml-4">{name}</h2>
      </div>
      <p>{email}</p>
      <p>{phone}</p>
      <Link href={`/contact/${id}`}>
        <span className="text-blue-500 mt-2 inline-block cursor-pointer">
          View Details
        </span>
      </Link>
    </div>
  );
};

export default ContactCard;
