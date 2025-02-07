import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Zoom,
  Fade,
  Slide,
} from "@mui/material";
import {
  Upload as UploadIcon,
  CloudUpload as CloudUploadIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  PieChart as PieChartIcon,
  CreditCard as CreditCardIcon,
  Circle as CircleIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("xmlFile", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/api/reports/upload`,
        formData
      );
      setMessage(res.data.message);
      setReportData(res.data.data);
    } catch (err) {
      setMessage("Please select a valid XML file");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card elevation={3} sx={{ borderRadius: "12px" }}>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 4,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <TrendingUpIcon sx={{ marginRight: "12px" }} />
              CreditSea Analytics Dashboard
            </Typography>

            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
                id="file-upload"
                accept=".xml, text/xml" // Add this line to restrict file selection to XML files
              />
              <label htmlFor="file-upload">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    startIcon={
                      <Zoom in={true}>
                        <UploadIcon sx={{ verticalAlign: "middle" }} />
                      </Zoom>
                    }
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      verticalAlign: "middle",
                    }}
                  >
                    Select XML File
                  </Button>
                </motion.div>
              </label>

              <motion.div
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                style={{ display: "inline-block", marginLeft: "16px" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isLoading}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      <Fade in={true}>
                        <CloudUploadIcon />
                      </Fade>
                    )
                  }
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  {isLoading ? "Processing..." : "Generate Report"}
                </Button>
              </motion.div>
              {file && (
                <Typography
                  variant="body1"
                  sx={{
                    ml: 2,
                    display: "inline-block",
                    verticalAlign: "middle",
                    color: "text.secondary",
                  }}
                >
                  Selected: {file.name}
                </Typography>
              )}
            </form>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ marginTop: "16px" }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: message.includes("success")
                        ? "#4CAF50"
                        : "#F44336",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <InfoIcon
                      sx={{
                        marginRight: "8px",
                        verticalAlign: "middle",
                        position: "relative",
                        top: -1,
                      }}
                    />
                    {message}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {reportData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: "32px" }}
          >
            <Card elevation={3} sx={{ borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: "#2196F3",
                  }}
                >
                  <TrendingUpIcon sx={{ marginRight: "12px" }} />
                  Credit Analysis Report
                </Typography>

                {/* Basic Details Section */}
                <motion.div
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 500, mb: 2 }}
                  >
                    <PersonIcon sx={{ marginRight: "8px" }} />
                    Client Information
                  </Typography>
                  <Grid container spacing={3}>
                    {Object.entries(reportData.basicDetails).map(
                      ([key, value]) => (
                        <Grid item xs={12} sm={6} md={3} key={key}>
                          <motion.div variants={itemVariants}>
                            <TextField
                              label={key.replace(/([A-Z])/g, " $1").trim()}
                              value={value}
                              fullWidth
                              InputProps={{
                                readOnly: true,
                                startAdornment: (
                                  <CircleIcon
                                    sx={{
                                      fontSize: "8px",
                                      marginRight: "8px",
                                      color: "#2196F3",
                                    }}
                                  />
                                ),
                              }}
                              variant="outlined"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "8px",
                                  backgroundColor: "#f5f5f5",
                                },
                              }}
                            />
                          </motion.div>
                        </Grid>
                      )
                    )}
                  </Grid>
                </motion.div>

                {/* Report Summary Section */}
                <motion.div
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ marginTop: "32px" }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 500, mb: 2 }}
                  >
                    <PieChartIcon sx={{ marginRight: "8px" }} />
                    Financial Summary
                  </Typography>
                  <Grid container spacing={3}>
                    {Object.entries(reportData.reportSummary).map(
                      ([key, value]) => (
                        <Grid item xs={6} sm={4} md={3} key={key}>
                          <motion.div variants={itemVariants}>
                            <Card
                              variant="outlined"
                              sx={{
                                p: 2,
                                borderRadius: "8px",
                                borderLeft: "4px solid #2196F3",
                                transition: "0.3s",
                                "&:hover": {
                                  boxShadow: 2,
                                  transform: "translateY(-2px)",
                                },
                              }}
                            >
                              <Typography variant="body2" color="textSecondary">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {value}
                              </Typography>
                            </Card>
                          </motion.div>
                        </Grid>
                      )
                    )}
                  </Grid>
                </motion.div>

                {/* Credit Accounts Section */}
                <motion.div
                  variants={cardVariants}
                  style={{ marginTop: "32px" }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 500, mb: 2 }}
                  >
                    <CreditCardIcon sx={{ marginRight: "8px" }} />
                    Credit Accounts
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{ borderRadius: "8px", border: "1px solid #e0e0e0" }}
                  >
                    <Table>
                      <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                          {[
                            "Type",
                            "Bank",
                            "Address",
                            "Account Number",
                            "Overdue",
                            "Balance",
                          ].map((header) => (
                            <TableCell key={header} sx={{ fontWeight: 600 }}>
                              {header}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reportData.creditAccounts.map((account, index) => (
                          <Slide
                            key={index}
                            direction="up"
                            in={true}
                            mountOnEnter
                            unmountOnExit
                          >
                            <TableRow
                              hover
                              sx={{
                                "&:nth-of-type(odd)": {
                                  backgroundColor: "#fafafa",
                                },
                                "&:last-child td": { borderBottom: 0 },
                              }}
                            >
                              <TableCell>{account.type}</TableCell>
                              <TableCell>{account.bank}</TableCell>
                              <TableCell>{account.address}</TableCell>
                              <TableCell sx={{ fontFamily: "monospace" }}>
                                {account.accountNumber}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color:
                                    account.amountOverdue > 0
                                      ? "#F44336"
                                      : "inherit",
                                  fontWeight:
                                    account.amountOverdue > 0 ? 600 : "inherit",
                                }}
                              >
                                ${account.amountOverdue}
                              </TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>
                                ${account.currentBalance}
                              </TableCell>
                            </TableRow>
                          </Slide>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
