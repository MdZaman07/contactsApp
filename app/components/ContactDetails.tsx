import Link from "next/link";
interface Geo {
  lat: string;
  lng: string;
}
type ContactDetailsProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  };
};

const ContactDetails = ({
  id,
  name,
  email,
  phone,
  website,
  address,
}: ContactDetailsProps) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{website}</p>
      <p>{address.geo.lat}</p>
    </div>
  );
};

export default ContactDetails;
