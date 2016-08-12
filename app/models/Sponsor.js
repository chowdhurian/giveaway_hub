// Sponsor model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sponsorSchema = new Schema({
    name: { type: String, required: true, unique: true },
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Sponsor', sponsorSchema);

