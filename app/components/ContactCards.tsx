"use client";
import React, { useEffect, useState } from "react";
import { Contact, SafeUser } from "@/types";
import TContactCard from "./TContactCard";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
interface ContactCardsProps {
  currentUser: SafeUser | null;
  contacts: any;
}

const ContactCards = ({ contacts, currentUser }: ContactCardsProps) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");
  const handleCriteriaChange = (event: SelectChangeEvent) => {
    setSearchCriteria(event.target.value as string);
  };
  const processPhoneNo = (phone: string) =>
    phone.replace(/[\s-]/g, "").toLowerCase();
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      const results = contacts.filter((contact: Contact) => {
        if (searchCriteria === "phone") {
          return processPhoneNo(contact.phone).includes(searchQuery);
        } else if (searchCriteria === "email") {
          return contact.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        } else {
          return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
      });
      setFilteredContacts(results);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [searchQuery, searchCriteria, contacts]);
  return (
    <>
      <div className="flex items-center mb-4 w-full space-x-4">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 border rounded border-stone-950 w-full focus:ring focus:border-blue-300"
          />
        </div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel
              id="search-criteria-select-label"
              className="text-white font-bold"
            >
              Criteria
            </InputLabel>
            <Select
              labelId="search-criteria-select-label"
              id="search-criteria-select"
              value={searchCriteria}
              label="Criteria"
              onChange={handleCriteriaChange}
              className="border-2 rounded border-black"
            >
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      {filteredContacts.length === 0 ? (
        <p className="text-3xl font-bold text-center">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredContacts.map((contact: any) => (
            <TContactCard
              contact={contact}
              currentUser={currentUser}
              key={contact.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ContactCards;
