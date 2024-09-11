import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@material-ui/core";
import axios from "axios";

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonate = () => {
    // Handle donation payment logic here
    console.log("Donation amount: ", donationAmount);
    axios.get("https://lostandfoundbackend-83g4.onrender.com/payment");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Donate to Our Cause
      </Typography>
      {/* <img src="https://unsplash.com/photos/NeTPASr-bmQ" alt="Donate" /> */}
      <TextField
        label="Enter donation amount"
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <a
        href={`https://lostandfoundbackend-83g4.onrender.com/payment?price=${donationAmount}`}
      >
        <Button variant="contained" color="primary" onClick={handleDonate}>
          Donate
        </Button>
      </a>
    </Box>
  );
};

export default DonationPage;
