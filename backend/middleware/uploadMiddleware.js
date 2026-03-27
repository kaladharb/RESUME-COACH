const multer = require('multer');

// Configure memory storage
const storage = multer.memoryStorage();

// File filter for PDF and TXT
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only .pdf and .txt files are allowed.'), false);
  }
};

// Multer upload configuration
// Field name "resume", limit file size to 5MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit max size
  },
  fileFilter: fileFilter,
});

module.exports = upload;
