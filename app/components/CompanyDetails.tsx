import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Contact } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";

const CompanyDetails = ({ contact }: { contact: Contact }) => {
  return (
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
            <p style={{ marginLeft: "8px" }}>{contact.company.catchPhrase}</p>
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
  );
};

export default CompanyDetails;
