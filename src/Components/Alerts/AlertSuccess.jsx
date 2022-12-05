import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const AlertSuccess = () => {
  return (
    <div className="mb-20 mt-20">
      <Alert severity="success" sx={{ mt: 10 }}>
        <AlertTitle>Success</AlertTitle>
        This is a success alert —{" "}
        <strong>check it out!</strong>
      </Alert>
    </div>
  );
};

export default AlertSuccess;
