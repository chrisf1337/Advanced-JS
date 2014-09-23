console.log("javascript working!"); // Just to test.

var renderResponse = function(response) {
  // If you don't understand line 6, you may want to read up
  // on Javascript objects, in the slides or internet.
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
};

var renderPetitionsResponse = function(response) {
  // If you don't understand line 6, you may want to read up
  // on Javascript objects, in the slides or internet.
  console.log(response);
  // var stories = response.data.children;
  // for(var i in stories) {
    // story = stories[i].data;
    // var elem = $("<li></li>");
    // Your code here:
    // In the data in the Javascript object 'story',
    // find the title, permalink, and upvote count
    // Then create HTML elements with jQuery (like in line 9)
    // and append them to the #list element.
    // var link = $('<a href="http://www.reddit.com' + story.permalink + '">' + story.title + "</a>");
    // elem.text('(' + story.score + ') ');
    // elem.append(link);
    // $("#petitions-list").append(elem);
    // Look at the JS console in Chrome to see what story looks like
    // console.log(story);
  // }
};

$(document).ready(function() {
  $.get("http://www.reddit.com/hot.json", renderResponse);
  // $.get('https://api.whitehouse.gov/v1/petitions.json?limit=10', renderPetitionsResponse);
  var svgContainer = d3.select('body').append('svg')
                                      .attr('width', 200)
                                      .attr('height', 200);
  var circle = svgContainer.append('circle')
                           .attr('cx', 30)
                           .attr('cy', 30)
                           .attr('r', 50);

  $("#refresh-button").click(function() {
    console.log('button clicked');
    $('#list').empty();
    $.get("http://www.reddit.com/hot.json", renderResponse);
    var time = new Date().getTime();
    $('#list').append('Refreshed at ' + time);
  });
});
