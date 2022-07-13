const multer = require('multer');
const path = require("path");
const upload = () => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public/img"));
        },
        filename: function (req, file, cb) {
            cb(
                null,
                Date.now() + path.extname(file.originalname)
            );
        },
    })
};

module.exports = {
    upload
};