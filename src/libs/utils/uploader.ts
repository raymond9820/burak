import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

//multer image uploader
function getTargetImageStore(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const random_Name = uuidv4() + extension;
      cb(null, random_Name);
    },
  });
}
const makeUploader = (address: string) => {
  const storage = getTargetImageStore(address);
  return multer({ storage: storage });
};

export default makeUploader;

//-------------------------------------
/*const product_Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const extension = path.parse(file.originalname).ext;
    const random_Name = uuidv4() + extension;
    cb(null, random_Name);
  },
});

export const UploadProductImage = multer({ storage: product_Storage });
*/
