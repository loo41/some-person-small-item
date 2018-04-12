const multer = require('koa-multer');

const imgBox = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/usr/share/website/websiteStatic/images')
    },
    filename: (req, file, cb) => {
        let fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

const uploadImg = multer({ storage: imgBox });

module.exports = {
  uploadImg
}