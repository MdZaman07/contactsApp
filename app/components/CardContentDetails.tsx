import { Contact } from "@/types";
import { Typography } from "@mui/material";
import { Divider } from "primereact/divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";

const CardContentDetails = ({ contact }: { contact: Contact }) => {
  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        {contact.name}
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AccountCircleIcon />
        <p style={{ marginLeft: "8px" }}>{contact.username}</p>
      </div>
      <Divider className="mt-3" />
      <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
        <CallIcon />
        <p style={{ marginLeft: "8px" }}>{contact.phone}</p>
      </div>
      <Divider className="mt-3" />
      <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
        <EmailIcon />
        <p style={{ marginLeft: "8px" }}>{contact.email}</p>
      </div>
    </div>
  );
};

export default CardContentDetails;
