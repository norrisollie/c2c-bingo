"use strict"

const Twitter = require('twitter');
const config = require('./config.js');
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


    const searchArray = ["train fault", "points failure", "signal failure", "cancelled", "delayed", "will no longer call at", "problem currently under investigation"];

    const daysObject = {

        "Mon": "Monday",
        "Tue": "Tuesday",
        "Wed": "Wednesday",
        "Thu": "Thursday",
        "Fri": "Friday",
        "Sat": "Saturday",
        "Sun": "Sunday"
    };

    const monthObject = {

        "Jan": "January",
        "Feb": "February",
        "Mar": "March",
        "Apr": "April",
        "May": "May",
        "Jun": "June",
        "Jul": "July",
        "Aug": "August",
        "Sep": "September",
        "Oct": "October",
        "Nov": "November",
        "Dec": "December"
    };

    const dateObject = {

        "0": "th",
        "1": "st",
        "2": "nd",
        "3": "rd",
        "4": "th",
        "5": "th",
        "6": "th",
        "7": "th",
        "8": "th",
        "9": "th"
    };

    let count = 1
    let trainFault_count = 0;
    let pointsFailure_count = 0;
    let signalFailure_count = 0;
    let cancelled_count = 0;
    let delayed_count = 0;
    let willNoLongerCallAt_count = 0;
    let problemCurrentlyUnderInvestigation_count = 0;

    for (let tweet of tweets) {

        let theTweets = tweet.full_text;
        let theTweetDate = tweet.created_at.split(" ");

        for (let problem of searchArray) {

            if (theTweets.includes(problem)) {

                switch (problem) {

                    case "train fault":
                        trainFault_count++
                        break;

                    case "points failure":
                        pointsFailure_count++
                        break;

                    case "signal failure":
                        signalFailure_count++
                        break;

                    case "cancelled":
                        cancelled_count++
                        break;

                    case "delayed":
                        delayed_count++
                        break;

                    case "will no longer call at":
                        willNoLongerCallAt_count++
                        break;
                    case "problem currently under investigation":
                        willNoLongerCallAt_count++
                        break;

                }

                // console.log("found a reference to '" + problem + "' in the tweet: " + theTweets)
                // console.log("
                //╔═══════════════════╤══════════════════════╤══════════════════════════════╗
                //║                   │                      │                              ║ 
                //║    " + train_fault + "    │    points failure    │        signal failure        ║
                //║                   │                      │                              ║
                //╟───────────────────┼──────────────────────┼──────────────────────────────╢
                //║                   │                      │                              ║
                //║     cancelled     │        delayed       │    will no longer call at    ║
                //║                   │                      │                              ║
                //╚═══════════════════╧══════════════════════╧══════════════════════════════╝")
                // let issueTweet = "found a reference to '" + problem + "' in the tweet: " + theTweets

                // problemArray.push(issueTweet)

            } else {
                // console.log("found no reference to '" + problem + "' in the tweet: " + theTweets)
            }
        }

        let day = theTweetDate[0];
        let month = theTweetDate[1];
        let date = theTweetDate[2]
        let dateTest = theTweetDate[2].split("");
        // let time = theTweetDate[3].split(":");
        let time = theTweetDate[3]
        let hour = time[0]
        let minute = time[1]
        let second = time[2]

        for (let key in daysObject) {
            if (key === day) {
                day = daysObject[key]
            }
        }

        for (let key in dateObject) {
            if (key === dateTest[1]) {
                date = date + dateObject[key];
            }
        }

        for (let key in monthObject) {
            if (key === month) {
                month = monthObject[key];
            }
        }

        // console.log(count + ". " + theTweets + " | Tweeted on " + day + " the " + date + " of " + month + " at " + time);

        count++

    }


    if (trainFault_count >= 1 && pointsFailure_count >= 1 && signalFailure_count >= 1 && cancelled_count >= 1 && delayed_count >= 1 && willNoLongerCallAt_count && problemCurrentlyUnderInvestigation_count >=1) {
        console.log("\noooooooooo.  ooooo ooooo      ooo   .oooooo.      .oooooo.   .o.\n`888'   `Y8b `888' `888b.     `8'  d8P'  `Y8b    d8P'  `Y8b  888\n 888     888  888   8 `88b.    8  888           888      888 888\n 888oooo888'  888   8   `88b.  8  888           888      888 Y8P\n 888    `88b  888   8     `88b.8  888     ooooo 888      888 `8'\n 888    .88P  888   8       `888  `88.    .88'  `88b    d88' .o.\no888bood8P'  o888o o8o        `8   `Y8bood8P'    `Y8bood8P'  Y8P\n");
    } else {}
    console.log("You searched for Tweets on @" + toc_twitter);
    console.log("Out of " + count + " tweets posted, not containing any replies or retweets...");
    console.log("'train fault' mentioned " + trainFault_count + " times. " + "\n'points failure' mentioned " + pointsFailure_count + " times. " + "\n'signal failure' mentioned " + signalFailure_count + " times. " + "\n'cancelled' mentioned " + cancelled_count + " times. " + "\n'delayed' mentioned " + delayed_count + " times. " + "\n'will no longer call at' mentioned " + willNoLongerCallAt_count + " times." + "\n'problem currently under investigation' mentioned " + problemCurrentlyUnderInvestigation_count + " times.");

});