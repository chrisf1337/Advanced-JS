var renderResponse = function(response) {
  // If you don't understand line 6, you may want to read up
  // on Javascript objects, in the slides or internet.
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
};

var renderPetitionsResponse = function(response) {
  // If you don't understand line 6, you may want to read up
  // on Javascript objects, in the slides or internet.
  $('#petitions-list').empty();
  var scoreData = [
    {
      key: 'Score',
      values: []
    }
  ];
  var scores = scoreData[0].values;
  var petitions = response.results;
  for(var i = 0; i < petitions.length; i++) {
    var petition = petitions[i];
    var elem = $("<li></li>");
    var link = $('<a href="' + petition.url + '">' + petition.title + "</a>");
    elem.text(i + 1 +'. (' + petition.signatureCount + ') ');
    elem.append(link);
    $("#petitions-list").append(elem);
    scores.push({'label': i + 1, 'value': petition.signatureCount});
  }
  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(false)
      .tooltips(false)
      .showValues(true)
      .transitionDuration(350);

    d3.select('#chart-petitions')
      .datum(scoreData)
      .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
  });
  var time = new Date().getTime();
  $('#petitions-list').append('Refreshed at ' + time);
};

$(document).ready(function() {
  $.get("http://www.reddit.com/hot.json", renderResponse);

  // I have to serve the petitions.json page locally because api.whitehouse.gov
  // blocks cross-origin requests
  $.get('http://localhost:8000/petitions.json', renderPetitionsResponse);

  $("#refresh-button").click(function() {
    console.log('button clicked');
    $.get("http://www.reddit.com/hot.json", renderResponse);
  });

  $("#refresh-button-petitions").click(function() {
    console.log('button clicked');
    $.get('http://localhost:8000/petitions.json', renderPetitionsResponse);
  });
});
