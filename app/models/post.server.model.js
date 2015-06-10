var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

var PostSchema = new Schema( {
    date: {
        type: Date,
        default: Date.now()
    },
    title: String,
    body: String,
    link: String,
    thumbnail: String
});

mongoose.model( 'Post', PostSchema );
