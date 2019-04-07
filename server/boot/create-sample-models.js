var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs; // 'name' of your mongo connector, you can find it in datasource.json
  var mysqlDs = app.dataSources.mysqlDs;
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    categories: async.apply(createCategory),
    surveys: async.apply(createSurvey),
  }, function(err, results) {
    if (err) throw err;
    // createReviews(results.reviewers, results.surveys, function(err) {
    //   console.log('> models created sucessfully');
    // });
  });
  //create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'admin@admin.com',
        password: 'admin',
        role: "admin"
      }, {
        email: 'foo@bar.com',
        password: 'foobar',
        role: "admin"
      }, {
        email: 'john@doe.com',
        password: 'johndoe',
        role: "partner"
      }, {
        email: 'jane@doe.com',
        password: 'janedoe',
        role: "customer"
      }], cb);
    });
  }

  function createCategory(cb) {
    mongoDs.automigrate('Category', function(err) {
      if (err) return cb(err);
      var Category = app.models.Category;
      Category.create([{
        "name" : "Sports"
      }, {
        "name" : "Movies"
      }, {
        "name" : "Summer Fashion: Do's and Dont's"
      }], cb);
    });
  }

  /**
   * @desc create survey forms
   * @param cb
   */
  function createSurvey(cb) {
    mongoDs.automigrate('Survey', function(err) {
      if (err) return cb(err);
      var Survey = app.models.Survey;
      Survey.create([{
        "survey" : [
          {
            "question" : "Do you play a sport ? ",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "If yes, what sport do you play?",
            "type" : "array",
            "options" : [
              "Football",
              "Soccer",
              "Hockey",
              "Cricket",
              "Badminton",
              "Table tennis",
              "generic"
            ],
            "answer" : []
          },
          {
            "question" : "Who is your favorite athlete?",
            "type" : "select",
            "options" : [
              "Tiger Woods",
              "David Beckham",
              "Christiano Ronaldo",
              "Sachin Tendulkar",
              "Michael Jordan",
              "Someone else",
              "generic"
            ],
            "answer" : ""
          },
          {
            "question" : "What is your favorite brand of athletic clothes/shoes?",
            "type" : "select",
            "options" : [
              "Adidas",
              "Nike",
              "Livestrong",
              "Reebok",
              "Diadora",
              "Puma",
              "Other",
              "I don't wear athletic clothes/shoes",
              "generic"
            ],
            "answer" : ""
          },
          {
            "question" : "Do you watch sports on TV?",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "What sport do you watch the most?",
            "type" : "array",
            "options" : [
              "Football",
              "Soccer",
              "Hockey",
              "Cricket",
              "Badminton",
              "Table tennis",
              "None",
              "generic"
            ],
            "answer" : []
          },
          {
            "question" : "About how many hours per week do you exercise/work out?",
            "type" : "select",
            "options" : [
              "1-2 hours",
              "3-4 hours",
              "5+"
            ],
            "answer" : ""
          },
          {
            "question" : "When it comes to sports are you",
            "type" : "select",
            "options" : [
              "Competitive",
              "Non-competitive"
            ],
            "answer" : ""
          },
          {
            "question" : "What is the main thing you look for when buying a sports product?",
            "type" : "select",
            "options" : [
              "The color/how it looks",
              "Comfort/feel/how it fits",
              "Brand name",
              "Some other reason I didn't think of",
              "I don't buy sports products"
            ],
            "answers" : ""
          },
          {
            "question" : "Where do you buy sports products or athletic clothing?",
            "type" : "select",
            "options" : [
              "Online",
              "Popular sports stores (like SportChek)",
              "A local sports store",
              "Somewhere else",
              "I don't buy sports products/athletic clothing"
            ],
            "answers" : ""
          },
          {
            "question" : "Comments",
            "type" : "string",
            "answer" : ""
          }
        ],
        "category" : "Sports"
      }, {
        "survey" : [
          {
            "question" : "What sorts of movies do you enjoy?",
            "type" : "array",
            "options" : [
              "Action",
              "Drama",
              "Comedy",
              "Horror",
              "Sci-Fi",
              "Classics",
              "Documentary",
              "Independent"
            ],
            "answer" : []
          },
          {
            "question" : "How often do you see movies in the theatre?",
            "type" : "select",
            "options" : [
              "Once or twice a week.",
              "Once or twice a month.",
              "Once or twice every few months.",
              "Once or twice a year.",
              "Rarely, if ever."
            ],
            "answer" : ""
          },
          {
            "question" : "If you enjoyed the movie in the theatre, how likely are you to buy it on DVD later?",
            "type" : "select",
            "options" : [
              "Very likely.",
              "Somewhat likely.",
              "Not very likely.",
              "Not likely at all."
            ],
            "answer" : ""
          },
          {
            "question" : "Which of the following aspects do you feel is most important to a good movie?",
            "type" : "array",
            "options" : [
              "Cast",
              "Writing",
              "Direction",
              "Special Effects"
            ],
            "answer" : []
          },
          {
            "question" : "Do you feel re-makes of old films are a good idea?",
            "type" : "select",
            "options" : [
              "Yes",
              "No",
              "Depends on the subject matter"
            ],
            "answer" : ""
          },
          {
            "question" : "What online movie sites do you visit?",
            "type" : "array",
            "options" : [
              "Rotten Tomatoes",
              "IMDB",
              "Yahoo Movies",
              "Variety",
              "Hollywood.com",
              "RogerEbert.com",
              "Movies.com",
              "The Movie Blog",
              "Other (specify in comments)"
            ],
            "answer" : []
          },
          {
            "question" : "Do you buy tickets in advance?",
            "type" : "select",
            "options" : [
              "Yes, almost always.",
              "Yes, but only for select movies.",
              "No"
            ],
            "answer" : ""
          },
          {
            "question" : "If you buy tickets online, which of the following do you use?",
            "type" : "select",
            "options" : [
              "MovieFone",
              "Fandango",
              "MovieTickets.com",
              "Other (specify in comments)"
            ],
            "answer" : ""
          },
          {
            "question" : "What through-the-mail rental service do you use?",
            "type" : "select",
            "options" : [
              "Netflix",
              "Blockbuster",
              "Other (specify in comments)",
              "I don't use a through-the-mail rental service"
            ],
            "answer" : ""
          },
          {
            "question" : "Do you think high definition DVD (either Blu-Ray or HD-DVD) is a good idea?",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Comments",
            "type" : "string",
            "answer" : ""
          }
        ],
        "category" : "Movies",
      }, {
        "survey" : [
          {
            "question" : "$5 flip flops",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Spray tan",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "All white outfit",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Wearing metallics (i.e. silver sandals, or gold jewellery)",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Belly bearing shirts (not at the beach)",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Polka dot prints",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Wearing make-up at the beach",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Ballet flats",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Super short shorts",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Wearing bathing suit tops in public places other than the beach (i.e. mall, restaurants, etc.)",
            "type" : "boolean",
            "options" : [
              true,
              false
            ],
            "answer" : false
          },
          {
            "question" : "Comments",
            "type" : "string",
            "answer" : ""
          }
        ],
        "category" : "Summer Fashion: Do's and Dont's"
      }], cb);
    });
  }

  //create reviews
  function createReviews(reviewers, surveys, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: reviewers[0].id,
        coffeeShopId: surveys[0].id,
        survey: surveys[0].survey
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: reviewers[1].id,
        coffeeShopId: surveys[0].id,
        survey: surveys[0].survey
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: reviewers[1].id,
        coffeeShopId: surveys[1].id,
        survey: surveys[1].survey
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: reviewers[2].id,
        coffeeShopId: surveys[2].id,
        survey: surveys[2].survey
      }], cb);
    });
  }
};
