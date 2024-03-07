const multer = require("multer")

module.exports = {
    fileStorage: multer.diskStorage(
        {
            destination: (req, file, cb) => {
                console.log(file)
                cb(null, "images")
            },
            filename: (req, file, cb) => {
                cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname)
            },

        }
    ),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
}
