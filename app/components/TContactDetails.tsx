import { Contact } from "@/types";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
  Dialog,
  Slide,
  Divider,
  Link,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HouseIcon from "@mui/icons-material/House";

import React, { useState } from "react";
import CompanyDetails from "./CompanyDetails";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface TContactDetailsProps {
  contact: Contact;
  open: boolean;
  onClose: () => void;
}

const TContactDetails = ({ contact, open, onClose }: TContactDetailsProps) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: "400px",
          height: "300px",
        },
      }}
    >
      <DialogTitle className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black">
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
              <TravelExploreIcon className="text-black" />
              {/* <p style={{ marginLeft: "8px" }}>{contact.website}</p> */}
              <Link href="#" underline="hover" className="ml-4 text-black">
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
              <HouseIcon className="text-black" />
              <Typography variant="body1" className="ml-4 text-black">
                {contact.address.suite}, {contact.address.street},{" "}
                {contact.address.city}, {contact.address.zipcode}
              </Typography>
            </div>
            <Divider className="bg-black" />
            <CompanyDetails contact={contact} />
          </DialogContentText>
        </DialogContent>
      </div>
      <DialogActions className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black">
        <Button onClick={onClose} className=" className= bg-black text-white">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TContactDetails;
