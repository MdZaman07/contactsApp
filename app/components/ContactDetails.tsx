import { Contact } from "@/types";
import Link from "next/link";
import { Panel } from "primereact/panel";
// import "primereact/resources/themes/saga-blue/theme.css"; // Choose the theme you prefer
// import "primereact/resources/primereact.min.css"; // PrimeReact CSS
// import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";

import "primeicons/primeicons.css";
import "./incident.css";
import { Button } from "primereact/button";
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
interface ContactDetailProps {
  contact: Contact;
}

const ContactDetails = ({ contact }: ContactDetailProps) => {
  return (
    <div className="incident-details-container">
      <div className="incident-details">
        <Panel header={contact.name}>
          <p>Username: {contact.username}</p>
          <p>Email: {contact.email}</p>
          <p>Company: {contact.company.name}</p>
          <p>Phone: {contact.phone}</p>
          <p>City: {contact.address.city}</p>
          <p>Street: {contact.address.street}</p>
          <p>Suite: {contact.address.suite}</p>
          <p>Post Code: {contact.address.zipcode}</p>
        </Panel>
        <Button label="Submit" />
        {/* <Panel header="Header">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Panel> */}
      </div>
    </div>
  );
};

export default ContactDetails;
