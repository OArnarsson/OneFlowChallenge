# OneFlowChallenge
Junior Full Stack JavaScript Technical Challenge

[Here you can see it live](http://oneflow.klokk.io/) (only HTTP, sorry <code>:(</code>). Please note that since it's only HTTP, not HTTPS the PWA service worker functionality does not work. It does however work locally.  

## Task 1
#### Frontend: 
I decided to use [Angular5](https://github.com/angular/angular-cli) to display the data.  
A service worker is used to cache all app data, so it should have offline support (provided you have already fetched the data at least once before).  
The title filter is made client-side, so no further API requests are needed. I decided to go with server-side filtering for the seasons simply to demonstrate that the API supports `season` query parameters; Even though client-side filtering on seasons would be more efficient since we already fetch all available seasons on first request.  
    
Disclaimer: PWA support for Angular CLI was just released six days ago (23. Nov) so there might be some minor issues regarding the PWA functionality. 
  
- To run the angular project run `ng serve`, start the server and navigate to [localhost:4200](http://localhost:4200/)  
- To build the angular project run `ng build --prod`, start the server navigate to [localhost:3000](http://localhost:3000/)  
  
 
  
#### Backend:  
- `npm t` - Runs tests for /api/series routes
- `npm start` - Runs the server, serving the Angular5 PWA.
- `npm run apidoc` - Generates API documentation, I'm having some trouble with routing to /docs with this setup, so for now it can be accessed by opening `~/OneFlowChallenge/server/static/docs/index.html`, sorry about that.  
  
The API currently supports both `POST` and `GET` requests.  
  
## Task 2  
See [`~/OneFlowChallenge/task2.commented.js`](https://github.com/OArnarsson/OneFlowChallenge/blob/master/task2.commented.js) and [`~/OneFlowChallenge/task2.suggestion.js`](https://github.com/OArnarsson/OneFlowChallenge/blob/master/task2.suggestion.js).  
As this is a PR I decided agains making error and utility/mongoose functions since they belong in either another PR or might have been done previously.  
