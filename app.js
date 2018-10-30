"use strict"

const Twitter = require('twitter');
const config = require('./config.js');
// const dateSuffix = require('./datesuffix.js');
const T = new Twitter(config);

// use arguments to choose what twitter account to look at
let toc_twitter = process.argv[2]; //value will be "banana"

// Set up your search parameters
const params = {
    screen_name: toc_twitter,
    count: 200,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
}

let problemArray = [];

T.get('statuses/user_timeline', params, (error, tweets, response) => {


    if (!error) {

        // search array contains the keywords to look for in the tweets
        const problemArray = ["train fault", "points failure", "signal failure", "cancelled", "delayed", "will no longer call at", "problem currently under investigation"];

        // object with properties for the count for each words
        let countObject = {
            totalTweets: 0,
            trainFault: 0,
            pointsFailure: 0,
            signalFailure: 0,
            cancelled: 0,
            delayed: 0,
            willNoLongerCallAt: 0,
            problemCurrentlyUnderInvestigation: 0,
            noProblem: 0
        }

        // loop through all of the tweets from the user's timeline to search for tweets containing the keywords
        for (let tweet of tweets) {

            // increment totalTweets counter
            countObject.totalTweets++

            // get the contents of the tweet
            let theTweets = tweet.full_text;
            // get the date of the tweet and split by date
            let theTweetDate = tweet.created_at.split(" ");

            // iterate through the problems array
            for (let problem of problemArray) {

                // only tweets that contain one or more of the problem strings can increase the count
                if (theTweets.includes(problem)) {

                    // switch statement to increment counter
                    switch (problem) {

                        // if train fault
                        case "train fault":
                            countObject.trainFault++
                            break;
                        // if points failure
                        case "points failure":
                            countObject.pointsFailure++
                            break;
                        // if signal failure
                        case "signal failure":
                            countObject.signalFailure++
                            break;
                        // if cancelled
                        case "cancelled":
                            countObject.cancelled++
                            break;
                        // if delayed
                        case "delayed":
                            countObject.delayed++
                            break;
                        // if will no longer call at
                        case "will no longer call at":
                            countObject.willNoLongerCallAt++
                            break;
                        // if problem currently under investigation
                        case "problem currently under investigation":
                            countObject.willNoLongerCallAt++
                            break;
                    }

                } else {

                    // increment if the tweet contains none of the entries
                    countObject.noProblem++
                }
            }
        }

        // if all problem counts have a value of 1 or more, BINGO!
        if(countObject.trainFault >=1 && countObject.pointsFailure >=1 && countObject.signalFailure >=1 && countObject.cancelled >=1 && countObject.delayed >=1 && countObject.willNoLongerCallAt >=1 && countObject.willNoLongerCallAt) {
            console.log("\noOoOOoOOo       o.oOOOo.  ooOoOOo o.     O  .oOOOo.   .oOOOo.\n     o     o     O    Oo     o .O     o  .O     o\n     O     O     o    O O    O o         O       \n     oOooOO.     O    O  o   o O         o       \n     o     `O    o    O   o  O O   .oOOo O       \n     O      o    O    o    O O o.      O o       \n     o     .O    O    o     Oo  O.    oO `o     O\n     `OooOO'  ooOOoOo O     `o   `OooO'   `OoooO' \n")
        } else {
            console.log("\no.     O  .oOOOo.  oOoOOoOOo       o.oOOOo.  ooOoOOo o.     O  .oOOOo.   .oOOOo. \nOo     o .O     o.     o            o     o     O    Oo     o .O     o  .O     o.\nO O    O O       o     o            O     O     o    O O    O o         O       o\nO  o   o o       O     O            oOooOO.     O    O  o   o O         o       O\nO   o  O O       o     o            o     `O    o    O   o  O O   .oOOo O       o\no    O O o       O     O            O      o    O    o    O O o.      O o       O\no     Oo `o     O'     O            o     .O    O    o     Oo  O.    oO `o     O'\nO     `o  `OoooO'      o'           `OooOO'  ooOOoOo O     `o   `OooO'   `OoooO' \n");
        }

            console.log("'Train Fault' mentioned " + countObject.trainFault + " times.")
            console.log("'Points Failure' mentioned " + countObject.pointsFailure + " times.")
            console.log("'Signal Failure' mentioned " + countObject.signalFailure + " times.")
            console.log("'Cancelled' mentioned " + countObject.cancelled + " times.")
            console.log("'Delayed' mentioned " + countObject.delayed + " times.")
            console.log("'Will No Longer Call At' mentioned " + countObject.willNoLongerCallAt + " times.")
            console.log("'Problem Currently Under Investigation' mentioned " + countObject.problemCurrentlyUnderInvestigation + " times.")

    } else {
        console.log("Something's wrong...")
    }
});