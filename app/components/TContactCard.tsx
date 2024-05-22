"use client";
// import Link from "next/link";
// import Avatar from "./Avatar";
import { Contact, SafeUser } from "@/types";
// import Button from "./Button";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";
import getContactById from "@/actions/getContactById";
import { useEffect, useState } from "react";
import { Divider, Icon, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import CardContentDetails from "./CardContentDetails";
import TContactDetails from "./TContactDetails";
import TContactImage from "./TContactImage";
import Image from "next/image";

type TContactCardProps = {
  contact: Contact;
  currentUser: SafeUser | null;
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TContactCard = ({ contact, currentUser }: TContactCardProps) => {
  const router = useRouter();
  const [contactExists, setContactExists] = useState<boolean>(false);
  const checkExistence = currentUser?.favourites.includes(contact.id);
  const [open, setOpen] = useState(false);
  const [openDropzone, setOpenDropzone] = useState(false);
  console.log(contact.name + " is" + contact.image);

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
    // sx={{ maxWidth: 345 }}
    // className="max-w-m flex flex-col justify-between"
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
              alt={"name"}
              src={contact.image}
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              fill
              alt={"name"}
              src={"/avatar1.jpg"}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <CardContent>
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
              Favourite
            </Button>
          ) : (
            <Button size="small" onClick={() => handleFavorites()}>
              Add to Favourites
            </Button>
          )
        ) : (
          <></>
        )}

        <TContactDetails contact={contact} open={open} onClose={handleClose} />
        <TContactImage
          contact={contact}
          open={openDropzone}
          onClose={handleDropzoneClose}
        />
      </CardActions>
    </Card>
  );
};

export default TContactCard;
