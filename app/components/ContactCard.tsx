import Link from "next/link";

type ContactCardProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const ContactCard = ({ id, name, email, phone }: ContactCardProps) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{email}</p>
      <p>{phone}</p>
      <Link href={`/contacts/${id}`}>
        <span className="text-blue-500 mt-2 inline-block cursor-pointer">
          View Details
        </span>
      </Link>
    </div>
  );
};

export default ContactCard;
