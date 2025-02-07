 
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Report = require('../models/Report');
const { parseXML } = require('../utils/xmlParser');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload XML file and process data
router.post('/upload', upload.single('xmlFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Enhanced file validation
      if (req.file.mimetype !== 'text/xml' && 
          req.file.originalname.split('.').pop().toLowerCase() !== 'xml') {
        return res.status(400).json({ 
          message: 'Invalid file type. Only XML files are allowed.' 
        });
      }
  
      // Parse the XML file
      const parsedData = await parseXML(req.file.path);
  
      // Validate parsed data
      if (!parsedData.basicDetails || !parsedData.creditAccounts) {
        return res.status(400).json({
          message: 'Invalid XML structure - missing required fields'
        });
      }
  
      // Save the parsed data to MongoDB
      const report = new Report(parsedData);
      await report.save();
  
      res.status(201).json({ 
        message: 'File uploaded and processed successfully', 
        data: report 
      });
  
    } catch (err) {
      console.error(err);
      const errorMsg = err.message.includes('XML') ? 
        'Invalid XML file format' : 'Error processing file';
      res.status(500).json({ 
        message: errorMsg,
        error: process.env.NODE_ENV === 'development' ? err.message : null
      });
    }
  });

// Fetch all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
});

module.exports = router;