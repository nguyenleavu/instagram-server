const multer = require('multer');
const mkdirp = require('mkdirp');

const checkUploadAvatar = (type) => {
    // create a directory
    mkdirp.sync(`./public/images/${type}s`);
    
    //upload file
    const storage = multer.diskStorage({
        // set up file directory
        destination: (req, file, cb) => {
            cb(null, `./public/images/${type}s`);
        },

        // rename file name
        filename: (req, file, cb) => {
            cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '-'));
        },
    });

    const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    const upload = multer({
        storage,

        //check file png,jpq,webp,jpeg
        fileFilter: (req, file, cb) => {
            if (whitelist.includes(file.mimetype)) {
                cb(null, true);
            } else {
                return cb(new Error('File is not allowed'));
            }
        },
    });

    return upload.single(type);
};

module.exports = checkUploadAvatar;
