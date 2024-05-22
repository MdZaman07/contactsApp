import { Contact, SafeUser } from "@/types";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  AccordionSummary,
  AccordionDetails,
  DialogActions,
  Dialog,
  Slide,
  Divider,
  Link,
  Accordion,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HouseIcon from "@mui/icons-material/House";

import React, { useState } from "react";
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
  //   const [open, setOpen] = useState(false);

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
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
              <Link href="#" underline="always" color={"#nnn"} className="ml-4">
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
                    <p style={{ marginLeft: "8px" }}>{contact.company.bs}</p>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </DialogContentText>
        </DialogContent>
      </div>
      <DialogActions className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black">
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TContactDetails;
