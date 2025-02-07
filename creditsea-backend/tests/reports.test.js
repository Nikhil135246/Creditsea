const request = require('supertest');
const app = require('../server'); // Import your Express app
const fs = require('fs');
const path = require('path');

describe('Report API', () => {
  it('should upload a XML file', async () => {
    // Path to a sample XML file
    const filePath = path.join(__dirname, 'sample.xml');

    // Check if the sample file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('Sample XML file not found');
    }

    // Send a POST request to the upload endpoint
    const res = await request(app)
      .post('/api/reports/upload')
      .attach('xmlFile', filePath); // Attach the sample XML file

    // Assertions
    expect(res.statusCode).toEqual(201); // Check if the status code is 201
    expect(res.body).toHaveProperty('message'); // Check if the response has a message
    expect(res.body.message).toBe('File uploaded and processed successfully'); // Check the message content
    expect(res.body.data).toBeDefined(); // Check if the response contains data
  });
});