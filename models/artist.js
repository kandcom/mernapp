const mongoose = require('mongoose')
const ArtistSchema = mongoose.Schema({
    name: String
})
let Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;