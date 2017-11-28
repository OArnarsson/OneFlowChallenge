const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('../server');
const {Series} = require('../models/Series');
const {seedSeries} = require('./series.seed');
const baseRoute = '/api/series';

const resetSeries = done => {
	Series.remove({}).then(() => {
		return done();
	}).catch(e => done(e));
};

before(resetSeries);

describe('POST /series', () => {
	it('Should create a new series', done => {
		request(app)
				.post(baseRoute)
				.send(seedSeries)
				.expect(201)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					
					// Make sure it made it to the DB
					return Series.findOne({name: seedSeries.name}).then(series => {
						expect(series).toBeTruthy();
						done();
					}).catch(e => done(e));
				});
	});
	
	it('Should not create a new series with duplicate name', done => {
		request(app)
				.post(baseRoute)
				.send(seedSeries)
				.expect(400)
				.end(done);
	});
});

describe('GET /series/:name', () => {
	let allEpisodes;

	it('Should get series with :name', done => {
		request(app)
				.get(`${baseRoute}/${seedSeries.name}`)
				.expect(200)
				.expect(res => {
					expect(res.body.name).toBe(seedSeries.name);
					allEpisodes = res.body.episodes;
				})
				.end(done);
	});

	it('Should get all episode in series filtered by season', done => {
		const season = 2;
		request(app)
				.get(`${baseRoute}/${seedSeries.name}?season=${season}`)
				.expect(200)
				.expect(res => {
					expect(res.body.episodes).toEqual(allEpisodes.filter(ep => ep.season === season));
				})
				.end(done);
	});
	
	it('Should return empty array when series is found but season isn\'t', done => {
		const season = 19;
		request(app)
				.get(`${baseRoute}/${seedSeries.name}?season=${season}`)
				.expect(200)
				.expect(res => {
					expect(res.body.episodes).toEqual([]);
				})
				.end(done);
	});

	it('Should return 404 if no series found', done => {
		request(app)
				.get(`${baseRoute}/doesNotExist`)
				.expect(404)
				.end(done);
	});
});
