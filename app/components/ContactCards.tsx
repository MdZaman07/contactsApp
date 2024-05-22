"use client";
import React, { useEffect, useState } from "react";
import { Contact, SafeUser } from "@/types";
import TContactCard from "./TContactCard";
interface ContactCardsProps {
  currentUser: SafeUser | null;
  contacts: any;
}

const ContactCards = ({ contacts, currentUser }: ContactCardsProps) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      const results = contacts.filter((contact: Contact) => {
        return (
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredContacts(results);
    }, 300);

    return () => clearTimeout(delayTimer);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
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
