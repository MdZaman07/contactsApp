"use client";

import { Contact, SafeUser } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions, Divider } from "@mui/material";
import React from "react";
import CardContentDetails from "./CardContentDetails";
import ContactDetails from "./ContactDetails";
import ContactImage from "./ContactImage";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ContactCardProps = {
  contact: Contact;
  currentUser: SafeUser | null;
};

const ContactCard = ({ contact, currentUser }: ContactCardProps) => {
  const router = useRouter();
  const checkExistence = currentUser?.favourites.includes(contact.id); //to check if currentUser has the contact in the favourites list
  const [open, setOpen] = useState(false);
  const [openDropzone, setOpenDropzone] = useState(false);

  const handleFavorites = async () => {
    axios
      .put("/api/user", {
        id: currentUser?.id,
        contactId: contact.id,
      })
      .then((res) => {
        if (checkExistence) {
          toast.success("Removed from Favourites");
        } else {
          toast.success("Added to Favourites");
        }
        router.refresh();
        console.log("successsss");
      })
      .catch((err) => {
        toast.error("Oops! Couldn't be added!");
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDropzoneClose = () => {
    setOpenDropzone(false);
  };
  const handleDropzoneOpen = () => {
    if (!currentUser) return;
    setOpenDropzone(true);
  };

  return (
    <Card
      sx={{ width: 345 }}
      className="max-w-xs flex flex-col justify-between"
    >
      <CardActionArea
        onClick={() => {
          handleDropzoneOpen();
        }}
      >
        <div className="aspect-square overflow-hidden relative w-full">
          {currentUser && contact.image ? (
            <Image
              fill
              alt={contact.name}
              src={contact.image}
              className="w-full h-full "
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-green-900 text-white font-bold text-4xl rounded-full flex items-center justify-center">
                {contact.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        <CardContent>
          <Divider className="mb-2" />
          <CardContentDetails contact={contact} />
        </CardContent>
      </CardActionArea>
      <CardActions className="mt-auto flex justify-between">
        <Button size="small" color="primary" onClick={handleClickOpen}>
          View
        </Button>
        {currentUser ? (
          checkExistence ? (
            <Button size="small" onClick={() => handleFavorites()}>
              Unfavourite
            </Button>
          ) : (
            <Button size="small" onClick={() => handleFavorites()}>
              Add to Favourites
            </Button>
          )
        ) : (
          <></>
        )}
        <ContactDetails contact={contact} open={open} onClose={handleClose} />
        <ContactImage
          contact={contact}
          open={openDropzone}
          onClose={handleDropzoneClose}
        />
      </CardActions>
    </Card>
  );
};

export default ContactCard;
