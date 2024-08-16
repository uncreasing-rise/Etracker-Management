// src/Utils/uploadFile.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    upload.single(file)(null, file, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(file.path); // Return the path or URL of the uploaded file
      }
    });
  });
};

module.exports = uploadFile;
