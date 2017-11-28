const mongoose = require('mongoose');

let SeriesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a name for the series.'],
		unique: true
	},
	summary: String,
	image: {
		medium: String,
		original: String
	},
	episodes : [{
		name: {
			type: String,
			required: [true, 'Please enter a name for the series.']
		},
		summary: String,
		season: {
			type: Number,
			required: [true, 'Please enter episodes season number.']
		},
		number: {
			type: Number,
			required: [true, 'Please enter the episode number.']
		},
		image: {
			medium: String,
			original: String
		}
	}]
}, {
	timestamps: true,
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

SeriesSchema.virtual('episodeCount').get(function () {
	if (this._embedded) {
		return this._embedded.length;
	}
});

let Series = mongoose.model('Series', SeriesSchema);

module.exports = {Series};