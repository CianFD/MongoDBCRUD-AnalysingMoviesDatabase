//Find (a):
//This query searches for movies containing both Matthew McConaughey & Kate Hudson and returns the title, year and cast sorted by newest movie first
db.movies.find( { cast : { $all: ["Matthew McConaughey", "Kate Hudson"] } }, {_id: 0, title: 1, year: 1, cast: 1} ).sort( {year: -1 } ).pretty();

//Find (b):
//This query searches for movies with imdb ratings greater than 9, and tomatoes ratings greater than 4.
//The results are sorted by highest imdb rating to lowest and limited to the first 3.
//Used tomatoes rating as well, again from highest to lowest, as query output was not matching assignment spec.
db.movies.find( { "imdb.rating" : { $gt: 9 }, "tomatoes.viewer.rating" : { $gt: 4 } }, { title : 1, _id: 0 } ).sort( { "imdb.rating": -1, "tomatoes.viewer.rating": -1 } ).limit(3).pretty();

//Find (c):
//This query searches for movies with the Genre "Comedy", rated is "G" or "PG" and imdb rating is greater than/equal to 8.
//The results are sorted by showing imdb rating from highest to lowest, and for those with the same rating going by year from most recent to oldest.
//The results are limited to the top 5 results and displays the title, genres and imdb rating.
db.movies.find( { "genres" : "Comedy", $or: [ { "rated" : "G" }, { "rated" : "PG" } ], "imdb.rating" : { $gte: 8 } }, { _id: 0, "title": 1, "imdb.rating": 1, "genres": 1 } ).sort( { "imdb.rating": -1, "year": -1 } ).limit(5).pretty();

//Find (d):
//This query searches for movies that have received a reviewer comment from "Cersei Lannister" since Jan 1st, 2015.
//The corresponding matches are counted returning the number of movies matching these criteria.
db.movies.find( { "comments" : { $elemMatch: { "name" : "Cersei Lannister", "date" : { $gte: ISODate("2015-01-01T00:00:00Z") } } } } ).count();

//find (make up your own) 1
//This query searches for movies where the cast array does not include Leonardo DiCaprio, the year is from 2010-2015 inclusive
//the runtime is less than 90 minutes, and the genres array includes both Drama and Biography
//the output displays the title, cast, runtime and imdb rating
//the output is sorted tomatoes critic meter in descending order followed by year in descending order
//the output is limited to the first 5 results
db.movies.find( { "cast" : { $nin: [ "Leonardo DiCaprio" ] }, "year" : { $gte: 2010, $lte: 2015 }, "runtime" : { $lt: 90 }, "genres" : { $all: [ "Drama", "Biography" ] } }, { "_id" : 0, "title" : 1, "cast" : 1, "runtime" : 1, "imdb.rating" : 1 } ).sort( { "tomatoes.critic.meter" : -1, "year" : -1 } ).limit(5).pretty();

//find (make up your own) 2
//This query searches for movies where the genres array includes Comedy or Animation, the imdb rating is greater than 8 but the tomatoes critics meter is less than 50.
//The ouput displays the number of movies that match these criteria (4 movies)
db.movies.find( { $or: [ { "genres" : "Comedy" }, { "genres" : "Animation" } ], "imdb.rating" : { $gt: 8 }, "tomatoes.critic.meter" : { $lt: 50 } } ).count();

//find (make up your own) 3
//query finds results which are rated "R", and where directed by either Quentin Tarantino and/or Robert Rodriguez.
//Projection shows title, year, directors and imdb rating
//sort by year in ascending order, followed by imdb rating in descending order.
//output skips first three results and is limited to the next 5 results.
db.movies.find(  { "rated" : "R", "directors" : { $in: [ "Quentin Tarantino", "Robert Rodriguez" ] } }, { "_id" : 0, "title" : 1, "year" : 1, "directors" : 1, "imdb.rating" : 1 } ).sort( { "year" : 1, "imdb.rating" : -1 } ).skip(3).limit(5).pretty();

//find (make up your own) 4
//Query finds results where the year is not equal to an array of values (2002, 2004, 2006, 2008, 2010, 2012, 2014)
//and the element email of the comments array matches "thomas_brodie-sangster@gameofthron.es"
//The output projection shows the title, year, runtime, genres and comments
//The output is sorted by runtime in ascending order and year in descending order ad=nd the output skips the first 5 results and is limited to the next 8 results.
db.movies.find( { "year" : { $nin: [ 2002, 2004, 2006, 2008, 2010, 2012, 2014 ] }, "comments" : { $elemMatch: { "email" : "thomas_brodie-sangster@gameofthron.es" } } }, { "title": 1, "year" : 1, "runtime": 1, "genres" : 1, "comments" : 1 } ).sort( { "runtime" : 1, "year" : -1 } ).skip(5).limit(8).pretty();

//find (make up your own) 5
//Query finds results where "released" date/time is greater than the ISODate 00:00:00 01/01/2000 and less than the ISODate 23:59:59 31/12/2002 
//"countries" array value has "Canada", "France" And/Or "Ireland" and the "genres" array does not include "Horror", "Comedy" or "Thriller"
//The output returns a count of the matches.
db.movies.find( { "released" : { $gt: ISODate("2000-01-01T00:00:00Z"), $lt: ISODate("2002-12-31T23:59:59Z") }, "countries" : { $in: [ "Canada", "France", "Ireland" ] }, "genres" : { $nin: [ "Horror", "Comedy", "Thriller" ] } } ).count();
 
//find (make up your own) 6
//Query finds results where "num_mflix_comments" is not equal to 0 and "type" is not equal to "movie"
//"year" is greater than or equal to 2000 but less than or equal to 2010 and "cast" array includes "Helen Mirren", "David Attenborough", or "Tom Hardy".
//The output displays the _id (as I did not set it to _id: 0 in this instance), title, year, cast and genres
//The output is sorted by title ascending and year descending and limited to the first 6 results
db.movies.find( { "num_mflix_comments" : { $ne: 1 }, "type" : { $ne: "movie" }, "year" : { $gte: 2000, $lte: 2010 }, $or: [  { "cast" : "Helen Mirren"}, { "cast" : "David Attenborough" }, { "cast" : "Tom Hardy" } ] }, { "title" : 1, "year" : 1, "cast" : 1, "genres" : 1 } ).sort( { "title" : 1, "year" : -1 } ).limit(6).pretty();

//Create (insert):
//A single insertMany command was used to insert all 5 movies at once.
//The Movies inserted - Get Out, Bohemian Rhapsody, The Peanut Butter Falcon, Soul & Hamilton, were all released between 2017-2020.
//Each movie inserted includes an _id value, a title(string), year(int), runtime(int), cast(array), plot(string), directors(array), imdb(subdocument) which included rating(double) and votes(int), and genre(array)
db.movies.insertMany( [
    { "_id" : "1G2E3T4O5U6T", "title" : "Get Out", "year" : 2017, "runtime" : 104, "cast" : [ "Daniel Kaluuya", "Alison Williams", "Bradley Whitford", "LaKeith Stanfield" ], "plot" : "Chris, an African-American man, decides to visit his Caucasian girlfriend's parents during a weekend getaway. Although they seem normal at first, he is not prepared to experience the horrors ahead.", "directors" : "Jordan Peele", "imdb" : { "rating" : 7.7, "votes" : 488517 }, "genres" : [ "Horror", "Mystery", "Thriller" ] },
    { "_id" : "2B3O4H5I6A7N", "title" : "Bohemian Rhapsody", "year" : 2018, "runtime" : 133, "cast" : [ "Rami Malek", "Gwilym Lee", "Ben Hardy", "Joseph Mazzello" ], "plot" : "With his impeccable vocal abilities, Freddie Mercury and his rock band, Queen, achieve superstardom. However, amidst his skyrocketing success, he grapples with his ego, sexuality and a fatal illness.", "directors" : "Bryan Singer", "imdb" : { "rating" : 8.0, "votes" : 446503 }, "genres" : [ "Biography", "Drama", "Music" ] },
    { "_id" : "3T4H5E6P7E8A", "title" : "The Peanut Butter Falcon", "year" : 2019, "runtime" : 97, "cast" : [ "Shia LaBeouf", "Dakota Johnson", "Zak Gottsagen", "Thomas Haden Church" ], "plot" : "A man with down syndrome runs away from a residential nursing home to pursue his dream of becoming a wrestler. Later, he meets with an outlaw who becomes his friend and coach.", "directors" : [ "Tyler Nilson", "Michael Schwartz" ], "imdb" : { "rating" : 7.6, "votes" : 63919 }, "genres" : [ "Adventure", "Comedy", "Drama" ] },
    { "_id" : "4S5O6U7L8D9I", "title" : "Soul", "year" : 2020, "runtime" : 107, "cast" : [ "Jamie Foxx", "Tina Fey", "Graham Norton", "Rachel House" ], "plot" : "Joe is a middle-school band teacher whose life hasn't quite gone the way he expected. His true passion is jazz -- and he's good. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.", "directors" :  "Pete Docter", "imdb" : { "rating" : 8.2, "votes" : 97609 }, "genres" : [ "Animation", "Adventure", "Comedy" ] },
    { "_id" : "5H6A7M8I9L0T", "title" : "Hamilton", "year" : 2020, "runtime" : 160, "cast" : [ "Lin-Manuel Miranda", "Leslie Odom Jr.", "Renee Elise Goldsberry", "Phillipa Soo" ], "plot" : "Alexander Hamilton, an orphan, arrives in New York to work for George Washington. After the American Revolution, he goes on to become first Secretary of the Treasury of the US.", "directors" : "Thomas Kail", "imdb" : { "rating" : 8.6, "votes" : 52098 }, "genres" : [ "Biography", "Drama", "History" ] }
] );

//Updates (a):
//Updates "Hamilton" by adding "Daveed Diggs" to the end of the cast array using a push
db.movies.updateOne( { "_id" : "5H6A7M8I9L0T" }, { $push: { "cast" : "Daveed Diggs"} } );

//Updates (b):
//Updates "Soul" by setting the IMDB rating value to 10 and increases the number of votes by 1.
db.movies.updateOne( { "_id" : "4S5O6U7L8D9I" }, { $set: { "imdb" : { "rating" : 10, "votes" : 97610 } } } );

//Updates (c):
//Adds a "tomatoes" subdocument to "Get Out"
//"tomatoes" includes the website(string), viewer subdocument(includes rating(double), numReviews(int), meter(int)),
//dvd(ISODate), rotten(int), boxOffice(string), consensus(string), critic subdocument(includes rating(double), numReviews(int), meter(int))
//production(string), lastUpdated(ISODate) and fresh(int)
db.movies.updateOne( { "_id" : "1G2E3T4O5U6T" }, { $push: { "tomatoes" : { "website" : "https://www.uphe.com/movies/get-out", "viewer" : { "rating" : 4.2, "numReviews" : 75640, "meter" : 86 }, "dvd" : ISODate("2017-05-23T12:15:27Z"), "rotten" : 95, "boxOffice" : "$176.0M", "consensus" : "Funny, scary, and thought-provoking, Get Out seamlessly weaves its trenchant social critiques into a brilliantly effective and entertaining horror/comedy thrill ride.", "critic" : { "rating" : 8.3, "numReviews" : 389, "meter" : 98 }, "production" : "Blumhouse Productions", "lastUpdated" :  ISODate("2020-12-29T21:23:16Z"), "fresh" : 91 } } } );

//Updates (d) - One of Your Own:
//Updates a number of fields in "The Peanut Butter Falcon"
//Pushes "Cian Dunne" to the "directors" array, Adds field "num_mflix_comments" with a value of 296
//Adds "comments" subdocument (includes name(string), email(string), movie_id(ObjectId), text(string), date(ISODate))
//changes the value of "runtime" to 120
//removes "Shia LaBeouf" from the "cast" array
//removes field "plot" from the document
db.movies.updateOne( { "_id" : "3T4H5E6P7E8A" }, { $push: { "directors" : "Cian Dunne",  "num_mflix_comments" : 296, "comments" : { "name" : "John Smith", "email" : "john@fakegmail.com", "movie_id" : ObjectId("5ff3b98651ebb26454c4c106"), "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit aliquet nibh, eget facilisis ante porta efficitur. Mauris ornare faucibus sem, a condimentum sapien iaculis id.", "date" : ISODate("2019-12-09T21:07:42Z") } }, $set: { "runtime" : 120 }, $pull: { "cast" : "Shia LaBeouf" }, $unset: { "plot" : "" } } );

//Delete:
//Deletes a single movie and only the specified movie - "Bohemian Rhapsody"
//Used _id value to ensure only the singular movie - "Bohemian Rhapsody" - was deleted
//Used $all to search cast array as it's extremely unlikely another movie would have all 4 of these actors as 2 of them are relative unknowns
//Isolating by _id value should ensure only one movie is deleted but also added the cast array values as a safety net to be 100% sure
db.movies.deleteOne( {  "_id" : "2B3O4H5I6A7N", "cast" : { $all: ["Rami Malek", "Gwilym Lee", "Ben Hardy", "Joseph Mazzello" ] } } );