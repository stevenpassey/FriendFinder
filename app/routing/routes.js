var fs = require('fs');
var loadJsonFile = require('load-json-file');
var writeJsonFile = require('write-json-file');
var path = require('path');
 
var friendsJSON_path = '/../data/friends.json';
var friendsJSON = path.join(__dirname, friendsJSON_path);

var backupJSON_path = '/../data/friends_backup.json';
var backupJSON = path.join(__dirname, backupJSON_path);

module.exports = function(app, path){

	app.get("/api/friends", function(req, res) {
		
		var readFriendData = fs.createReadStream(friendsJSON);
		readFriendData.pipe(res);
		
	});

	app.post("/api/friends", function(req, res) {
		
		loadJsonFile(friendsJSON).then(friendArray => {
			
			var differencesArray = [];
			
			friendArray.forEach(function (friend) {
				var myTempArray = new Array(10).fill(0).map(function (n, i) {
					return Math.abs(friend.scores[i] - req.body.scores[i]); 		//get the difference of every index in every score array (from the json file) and every index in our new score array (non-negative)
				});
			
				var tempDifference = myTempArray.reduce((a, b) => a + b, 0); 		//add up all the differences
				
				differencesArray.push(tempDifference); 								//add sum of differences to an array
			});
			
			var closestMatchAmount = Math.min(...differencesArray); 				//get the smallest difference
			
			var matchingFriendIndexes = differencesArray.reduce(function(a, value, index) {
				if(value === closestMatchAmount)									//check for multiple matches
				{
					a.push(index);
				}
				
				return a;
			}, []);
			
			var matchingFriendObject = matchingFriendIndexes.map(function(value) {   
				return friendArray[value];                                     //swap object indexes with names
			});
			
			/*console.log(differencesArray);
			console.log(closestMatchAmount);
			console.log(matchingFriendIndexes);
			console.log(matchingFriendObject);*/
			
			res.status(200).send(matchingFriendObject); 								//send matches to client
			
			friendArray.push(req.body);
			
			writeJsonFile(friendsJSON, friendArray).then(() => {
				console.log('Updated friendsJSON at ' + friendsJSON);				//update JSON file. (Note: this is done in the resolve function of loadJsonFile so as to prevent asynchronous writes occuring before reads
			});
		});
	});
	
	app.get("/api/reset", function(req, res){
		
		loadJsonFile(backupJSON).then(backupFileJSON => {
			
			writeJsonFile(friendsJSON, backupFileJSON).then(() => {
				console.log('Reset friendsJSON with backupJSON at ' + friendsJSON);			
				res.redirect("/api/friends");
			});
		});
		
		
		
	});
};