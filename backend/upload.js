const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Products')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.originalname.endsWith('png') || file.originalname.endsWith('jpg')) {
            cb(null, true)
            return
        }
        res.status(400).send('provide png or jpg')
    }
})

module.exports = upload