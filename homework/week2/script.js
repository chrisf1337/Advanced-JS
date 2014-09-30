// Using the jQuery .ready() function!
$(document).ready(function() {
  $('#error').hide();
  loadReddit();
  $("#refresh").click(function() {
    // Ex. 1: Refresh Refresher code here
    // Hint: it's one line.
    // ...
    loadReddit();
  });

  $('#userIdSearchForm').submit(function(event) {
    getFB($('#userIdSearchBox').val());
    $('#error').hide();
    event.preventDefault();
  });

  $(window).mousemove(function(e) {
    // Ex. 3: My Shadow code here

    // You can change the css of an element with the .css function—
    //   look up the documentation for it on jQuery.com!
    setTimeout(function() {
      $("#follow-dot").css({
        left: e.pageX,
        top: e.pageY
      });
    }, 200);
    // console.log(e.pageX, e.pageY); // Just to see what's going on.
    // Optionally, add a delay. Hint: look up the setTimeout function!
  });

  getFB($('#userIdSearchBox').val()); // Defined below
});

// Ex. 2: Objectify Me code here
// An example person
// var rafi = {
//   fname: ...
//   lname: ...
//   favoriteCereal: ...
//   interests: ...
//   fullname: function() {
//     // Make sure to use `this`
//     // return ...
//   },

var chris = {
  fname: 'Chris',
  lname: 'Fu',
  favoriteCereal: "Cap'n Crunch",
  interests: ['reading', 'watching TV', 'coding'],
  fullname: function() {
    return this.fname + ' ' + this.lname;
  },
  miniBio: function() {
    var outString = 'Hi my name is ' + this.fullname() + '. My favorite cereal is ' +
                    this.favoriteCereal + '. In my free time, I like ';
    for (var i = 0; i < this.interests.length - 1; i++)
    {
      outString += this.interests[i] + ', ';
    }
    outString += 'and ' + this.interests[this.interests.length - 1] + '.';
    return outString;
  }
};
console.log(chris.miniBio());
//   miniBio: function() {
//     toPrint = "Hi my name is " + ...
//     // "toPrint += X" is a shortcut for "toPrint = toPrint + X"
//     toPrint += " and my favorite cereal is " + ...
//     toPrint += "In my free time, I like to ";
//     for (var i in this.interests) {
//       toPrint += ...
//     }
//     console.log(toPrint);
//     return toPrint;
//   }
// }

// Gets data from Reddit
var loadReddit = function() {
  // console.log("loading hottest stories...");
  $.get("http://www.reddit.com/hot.json", function(response) {
    $('#list').empty();
    var scoreData = [
      {
        key: 'Score',
        values: []
      }
    ];
    var scores = scoreData[0].values;
    var stories = response.data.children;
    for(var i = 0; i < stories.length; i++) {
      story = stories[i].data;
      var elem = $("<li></li>");
      // Your code here:
      // In the data in the Javascript object 'story',
      // find the title, permalink, and upvote count
      // Then create HTML elements with jQuery (like in line 9)
      // and append them to the #list element.
      var link = $('<a href="http://www.reddit.com' + story.permalink + '">' + story.title + "</a>");
      elem.text(i + 1 + '. (' + story.score + ') ');
      elem.append(link);
      $("#list").append(elem);
      // Look at the JS console in Chrome to see what story looks like
      // console.log(story);
      scores.push({'label': i + 1, 'value': story.score});
    }
    nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
        .x(function(d) { return d.label; })
        .y(function(d) { return d.value; })
        .staggerLabels(false)
        .tooltips(false)
        .showValues(true)
        .transitionDuration(350);

      d3.select('#chart')
        .datum(scoreData)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });
    var time = new Date().getTime();
    $('#list').append('Refreshed at ' + time);
    });
};

// Ex 4: Me online! Code here
// Get data from Facebook
var getFB = function(userID) {
  $.ajax({
    method: "get", // Using GET
    url: "https://graph.facebook.com/" + userID, // Get my own info
    data: {
      fields: "cover,picture.width(100).height(100)", // What goes here?
      // Access token obtained at https://developers.facebook.com/tools/explorer
      // Note that it expires after a while, so you occasionally need to go back
      //   and get another one.
      access_token: "CAACEdEose0cBAFoUCcVt2y88TvfpoPB0bXCHO45eA3mpZCe9rhgblPbIX8Lmwwzq4fmLjOhZBkVByvBiA8cNENZAUq67XRyf55hUQC2u5bOIHAlXw9bKsvfqNAaiffP2n6tflQl9TvvfJ7KF2hDZBSt6pu4S1RF7XkyotXIN0cE5FzZAFOSbWrfsocRflIaBwKg7Em2ANxbt71GBCB5a4Qv3W43sZBW6EZD"
    },
    success: function(response) {
      console.log(response);
      // Write code to display the name and userID on the page here.
      // If you got the profile picture, make it show up in an <img> tag
      var url = response.picture.data.url;
      $('#profile_pic').attr('src', url);
      $('#profile_pic_link').attr('href', 'https://www.facebook.com/' + userID);
    },
    error: function(jxqr, text) {
      console.log(jxqr, text);
      // Error handling is a big part of coding, and we all know website that
      // show you no (or even worse, unhelpful) error messages. How will your
      // web page handle errors?
      $('#error').show();
    }
  });
};
