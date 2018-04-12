const multer = require('koa-multer');

let storage  = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/usr/share/website/websiteStatic/file')
    },
    filename: (req, file, cb) => {
        let fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

const uploadfile = multer({ storage: storage  });


module.exports = {
  uploadfile
}