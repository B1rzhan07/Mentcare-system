import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const AlertFailure = ({ value }) => {
  return (
    <div>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {value
          ? value
          : "This is an error alert — <strong>check it out!</strong>"}
      </Alert>
    </div>
  );
};

export default AlertFailure;
