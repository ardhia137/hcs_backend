const multer = require('multer');
const path = require("path");
const upload = () => {
     const storage = multer.diskStorage({
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
    const fileFilter = (req, file, cb) =>
{
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true);
    }
    else
    {
        cb(null, false);
    }
};
const uploads = multer(
    {
        storage: storage,
        limits:
        {
            fileSize: 1024 * 1024 * 50
        },
        fileFilter: fileFilter
    });
    return uploads
};

module.exports = {
    upload
};