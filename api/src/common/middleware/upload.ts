import whiteList from "@/store/imageWriteList";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    if (whiteList.includes(file.mimetype)) {
      cb(null, `${+new Date()}-${file.originalname}`);
    } else {
      cb(null, false as unknown as string);
    }
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024, //限制文件大小3MB
    files: 1,
  },
}).single("image");
export default upload;