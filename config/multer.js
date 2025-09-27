const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// 🔑 Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Create storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // optional: all uploads go to products folder
    allowed_formats: ["jpg", "png", "jpeg"], // restrict file types
    public_id: (req, file) => Date.now() + "-" + file.originalname.split(" ").join("_"),
  },
});

const upload = multer({ storage });

module.exports = upload;
