import { Contact } from "@/types";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Slide,
  Divider,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import React, { useState } from "react";
import SelectImage from "./inputs/SelectImage";
import firebaseApp from "@/libs/firebase";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFileChange = (value: File) => {
    setFile(value);
  };
  const handleUpload = async () => {
    let uploadedImage: String = "";
    setIsLoading(true);
    const handleImageUpload = async () => {
      try {
        const fileName = new Date().getTime() + "-" + file?.name;
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `contacts/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file!);
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              console.log("Error uploading image", error);
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  uploadedImage = downloadURL;
                  console.log("File available at", downloadURL);
                  resolve();
                })
                .catch((error) => {
                  console.log("Error getting the download URL", error);
                  reject(error);
                });
            }
          );
        });
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      }
    };
    await handleImageUpload();
    axios
      .put("/api/contact", {
        id: contact.id,
        image: uploadedImage,
      })
      .then(() => {
        toast.success("Image Uploaded");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong updating contact in db");
      })
      .finally(() => {
        setFile(null);
        setIsLoading(false);
        onClose();
      });
  };
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
        {`${contact.name}'s Profile Picture`}
      </DialogTitle>
      <Divider className="bg-black" />
      <DialogContent className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black flex flex-col justify-center items-center h-full">
        <>
          {!file && (
            <div className="flex justify-center items-center">
              <SelectImage handleFileChange={handleFileChange} />
            </div>
          )}
          {file && (
            <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
              <p>{file?.name}</p>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-70px">
                <Button
                  onClick={() => {
                    handleUpload();
                  }}
                  className=" bg-black text-white "
                >
                  {isLoading ? "Uploading..." : "Upload"}
                </Button>
                {!isLoading && (
                  <Button
                    onClick={() => {
                      setFile(null);
                      //   removeImageFromState(item);
                    }}
                    disabled={isLoading}
                    className="bg-black text-white "
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      </DialogContent>
      {!isLoading && (
        <DialogActions className="bg-gradient-to-r from-gray-200 to-gray-500 bg-cover bg-center text-black">
          <Button
            onClick={() => {
              setFile(null);
              onClose();
            }}
            className="bg-black text-white"
          >
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default TContactDetails;
