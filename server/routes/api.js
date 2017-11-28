const express = require('express');
const router = express.Router();
const {mongoose} = require('../db');
const {Series} = require('../models/Series');

router.get('/', (req, res) => {
	return res.json('API is healthy');
});

router.route('/series')
		/**
		 * @api {post} /api/series/ Add series
		 * @apiName addSeries
		 * @apiGroup Series
		 * @apiDescription Add a new series to the database.
		 * @apiParam {String} name Name of the series.
		 * @apiParam {Object} [image] Object containing 'medium' and 'original' strings pointing to poster images.
		 * @apiParam {String} [summary] Summary of the series.
		 * @apiParam {[Object]} [episodes] An array of episodes in the series.
		 * @apiParamExample {json} Request-Example:
{
  "url": "http://www.tvmaze.com/shows/143/silicon-valley",
  "name": "Silicon Valley",
  "image": {
    "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/104/261725.jpg",
    "original": "http://static.tvmaze.com/uploads/images/original_untouched/104/261725.jpg"
  },
  "summary": "..."
  ...
  "_embedded": {
    "episodes": [
      {
        "url": "http://www.tvmaze.com/episodes/10897/silicon-valley-1x01-minimum-viable-product",
        "name": "Minimum Viable Product",
        "season": 1,
        "number": 1,
        "image": {
          "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/49/123633.jpg",
          "original": "http://static.tvmaze.com/uploads/images/original_untouched/49/123633.jpg"
        },
        "summary": "...",
        ...
      }, {...}
    ]
}
		 * @apiPermission none
		 * @apiSuccessExample Success-Response:
		 * HTTP/1.1 201 Created
{
  "__v": 0,
  "updatedAt": "2017-11-28T11:32:46.639Z",
  "createdAt": "2017-11-28T11:32:46.639Z",
  "name": "Silicon Valley",
  "summary": "<p>In the high-tech gold rush of modern <i>Silicon Valley</i>, the people most qualified to succeed are the least capable of handling success. Mike Judge brings his irreverent brand of humor, and his own experiences working in <i>Silicon Valley</i>, to the award-winning comedy now entering its third season.</p>",
  "_id": "5a1d495e129196d28d550e30",
  "image": {
    "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/104/261725.jpg",
    "original": "http://static.tvmaze.com/uploads/images/original_untouched/104/261725.jpg"
  },
  "id": "5a1d495e129196d28d550e30",
  "episodes": [
    {
      "name": "Minimum Viable Product",
      "season": 1,
      "number": 1,
      "summary": "<p>Attending an elaborate launch party, Richard and his computer programmer friends - Big Head, Dinesh and Gilfoyle - dream of making it big. Instead, they're living in the communal Hacker Hostel owned by former programmer Erlich, who gets to claim ten percent of anything they invent there. When it becomes clear that Richard has developed a powerful compression algorithm for his website, Pied Piper, he finds himself courted by Gavin Belson, his egomaniacal corporate boss, who offers a $10 million buyout by his firm, Hooli. But Richard holds back when well-known investor Peter Gregory makes a counteroffer.</p>",
      "_id": "5a1d495e129196d28d550e56",
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/49/123633.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/49/123633.jpg"
      }
    }, {...}
    {
      "name": "Server Error",
      "season": 4,
      "number": 10,
      "summary": "<p>Richard finds himself in a web of lies; Jared plans his exit; Jack bets big; Gavin plots a comeback.</p>",
      "_id": "5a1d495e129196d28d550e31",
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/118/295689.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/118/295689.jpg"
      }
    }
  ]
}
		 */
		.post(async (req, res) => {
			const newSeries = new Series(req.body);
			
			if (req.body._embedded) {
				newSeries.episodes = req.body._embedded.episodes;
			}
			
			try {
				const series = await newSeries.save();
				res.status(201).json(series);
			} catch(err) {
				return res.status(400).json(err)
			}
		});

router.route('/series/:name')
/**
 * @api {get} /api/series/:name Get series
 * @apiName getSeries
 * @apiGroup Series
 * @apiDescription Returns an array of episodes in series, can be filtered by season.
 * @apiParam {Number} [season] Season number to filter episodes by.
 * @apiPermission none
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
{
  "_id": "5a1d3c414e0049626ae9fae7",
  "updatedAt": "2017-11-28T10:36:49.229Z",
  "createdAt": "2017-11-28T10:36:49.229Z",
  "name": "Silicon Valley",
    "image": {
      "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/104/261725.jpg",
      "original": "http://static.tvmaze.com/uploads/images/original_untouched/104/261725.jpg"
    },
    "id": "5a1d3c414e0049626ae9fae7",
  "summary": "<p>In the high-tech gold rush of modern <i>Silicon Valley</i>, the people most qualified to succeed are the least capable of handling success. Mike Judge brings his irreverent brand of humor, and his own experiences working in <i>Silicon Valley</i>, to the award-winning comedy now entering its third season.</p>",
  "__v": 0,
  "episodes": [
    {
      "name": "Minimum Viable Product",
      "season": 1,
      "number": 1,
      "summary": "<p>Attending an elaborate launch party, Richard and his computer programmer friends - Big Head, Dinesh and Gilfoyle - dream of making it big. Instead, they're living in the communal Hacker Hostel owned by former programmer Erlich, who gets to claim ten percent of anything they invent there. When it becomes clear that Richard has developed a powerful compression algorithm for his website, Pied Piper, he finds himself courted by Gavin Belson, his egomaniacal corporate boss, who offers a $10 million buyout by his firm, Hooli. But Richard holds back when well-known investor Peter Gregory makes a counteroffer.</p>",
      "_id": "5a1d3c414e0049626ae9fb0d",
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/49/123633.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/49/123633.jpg"
      }
    }, {...},
    {
      "name": "Optimal Tip-to-Tip Efficiency",
      "season": 1,
      "number": 8,
      "summary": "<p>Poised to compete at TechCrunch Disrupt, the guys of Pied Piper become worried after an impressive presentation by Gavin Belson. As Jared tries to pivot the company, Richard is inspired to make big changes at the last minute.</p>",
      "_id": "5a1d3c414e0049626ae9fb06",
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/49/123640.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/49/123640.jpg"
      }
    }
  ]
}
*/
		.get(async (req, res) => {
			const {name} = req.params;
			const {season} = req.query;
			
			try {
				const series = await Series.findOne({name});
				if (!series) {
					return res.status(404).json({Message: `No series found by the name ${name}`})
				}
				
				if (+season) {
					series.episodes = series.episodes.filter(episode => episode.season.toString() === season);
				}
				
				res.json(series);
			} catch(err) {
				return res.status(400).send(err)
			}
		});

module.exports = router;
