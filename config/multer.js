var done = false;

exports.settings = {
    dest: 'public/img/postThumbnails/',
    rename: function( filedname, filename ) {
        return filename + Date.now();
    },
    onFileUploadStart: function( file ) {
        console.log( file.originalname + ' is starting... ' );
    },
    onFileUploadComplete: function( file ) {
        console.log( file.fieldname + ' uploaded to ' + file.path );
        done = true;
    }
};

exports.uploadComplete = function( req, res ) {
    if( done === true ) {
        console.log( req.files );
    }
}
