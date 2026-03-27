
const pdfParse = require('pdf-parse');

/**
 * Extracts text from a PDF Buffer
 * @param {Buffer} buffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromPDF = async (buffer) => {
  try {
    // pdfParse returns an object containing text, numpages, info, etc.
    const data = await pdfParse(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('PDF appears to be empty or unreadable.');
    }
    
    return data.text.trim();
  } catch (error) {
    // Handle errors explicitly and format readability
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};

module.exports = {
  extractTextFromPDF,
};
