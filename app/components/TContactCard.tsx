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
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Link from "@mui/material/Link";
import { TransitionProps } from "@mui/material/transitions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HouseIcon from "@mui/icons-material/House";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={80}
          image="/avatar1.jpg"
          alt="green iguana"
        />
        {/* <div className="mt-5 ml-12">
          <Avatar src="/avatar1.jpg" />
        </div> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {contact.name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon />
            <p style={{ marginLeft: "8px" }}>{contact.username}</p>
          </div>
          <Divider className="mt-3" />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "3px" }}
          >
            <CallIcon />
            <p style={{ marginLeft: "8px" }}>{contact.phone}</p>
          </div>
          <Divider className="mt-3" />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "3px" }}
          >
            <EmailIcon />
            <p style={{ marginLeft: "8px" }}>{contact.email}</p>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          View
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              width: "400px",
              height: "300px",
            },
          }}
          //   className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black"
        >
          <DialogTitle
            className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black"
            // style={{ border: "2px solid black", borderRadius: "0.1px" }}
          >
            {`${contact.name}'s Details`}
          </DialogTitle>
          <Divider className="bg-black" />
          <div className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black">
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "3px",
                  }}
                >
                  <TravelExploreIcon />
                  {/* <p style={{ marginLeft: "8px" }}>{contact.website}</p> */}
                  <Link
                    href="#"
                    underline="always"
                    color={"#nnn"}
                    className="ml-4"
                  >
                    {contact.website}
                  </Link>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "6px",
                  }}
                >
                  <HouseIcon />
                  <Typography variant="body1" className="ml-4">
                    {contact.address.suite}, {contact.address.street},{" "}
                    {contact.address.city}, {contact.address.zipcode}
                  </Typography>
                </div>
                <Divider className="bg-black" />
                <div className="mt-5 ">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black"
                    >
                      {contact.company.name}
                    </AccordionSummary>

                    <AccordionDetails className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black">
                      <Divider className="bg-black " variant="fullWidth" />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "8px",
                        }}
                      >
                        <RecordVoiceOverIcon />
                        <p style={{ marginLeft: "8px" }}>
                          {contact.company.catchPhrase}
                        </p>
                      </div>
                      <Divider className="bg-black mt-3" variant="fullWidth" />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <BusinessCenterIcon />
                        <p style={{ marginLeft: "8px" }}>
                          {contact.company.bs}
                        </p>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </DialogContentText>
            </DialogContent>
          </div>
          <DialogActions className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black">
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Button size="small">Add to Favourites</Button>
      </CardActions>
    </Card>
  );
};

export default TContactCard;
