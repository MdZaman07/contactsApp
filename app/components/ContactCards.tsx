"use client";
import React, { useEffect, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ContactCard from "./ContactCard";
import Button from "./Button";
import { signIn, signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { Contact, SafeUser } from "@/types";
import Image from "next/image";
import TContactCard from "./TContactCard";
interface ContactCardsProps {
  currentUser: SafeUser | null;
  contacts: any;
}

const ContactCards = ({ contacts, currentUser }: ContactCardsProps) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const results = contacts.filter((contacts: Contact) => {
      return (
        contacts.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contacts.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredContacts(results);
    console.log(searchQuery);
    console.log(filteredContacts);
  }, [searchQuery, contacts]);
  return (
    <>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="p-2 mb-4 border rounded w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact: any) => (
          <TContactCard
            contact={contact}
            currentUser={currentUser}
            key={contact.id}
          />
        ))}
      </div>
    </>
  );
};

export default ContactCards;
