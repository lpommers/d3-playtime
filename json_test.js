//function the returns all the reviews with the given keywords
function findReviews(expression) {
  return reviews.collection1.filter(function(each){
    return each.description.match(expression);
    });
}

//function that counts how many times a given keyword appears in total
function findKeyword (expression){
  var total = [];
  //go through each review from json file
  for (var i = 0; i < reviews.collection1.length; i ++){
    //if the description contains the ketyword
    if (reviews.collection1[i].description.match(expression) !== null){
      //each time the keyword appears put it in an array
      var one = reviews.collection1[i].description.match(expression);
      //merge this array with the total count array
      total.push.apply(total, one);
    };
  }
  return total.length;
}

//builds all the circles for all the keywords
function makeAllCircles(keywords){
  var circleColor;
  d3.select('body').append('svg').attr('height', 1000).attr('width', 1000);
  keywords.map(function(each){
    var allReviews = [];
      //assign circle color depending how many times the keyword showed up
     if (each.frequency < 100) {
      circleColor = 'green';
     } else if (each.frequency > 100 && each.frequency  < 200 ) {
      circleColor = 'yellow';
     } else if (each.frequency > 200) {
      circleColor = 'red';
     } else {
      circleColor = 'blue';
     }

    //build svg and circle for each keyword
    allReviews.push(each.reviews);
    //console.log(allReviews);
    var dimension = each.frequency;
    d3.select("svg").append("circle")
                      .attr("cx", dimension/2)
                      .attr("cy", dimension/2)
                      .attr("r", dimension/4)
                      .style("fill", circleColor)
                      .style('stroke', 'black')
                      .data(allReviews).enter();


  });

}

function allCircleData(keywords) {
  var circleData = [];
    for(var i = 0; i < keywords.length; i++ ){
      var textData = {
        'cy' : keywords[i].frequency,
        'cx' : keywords[i].frequency,
        'r' : keywords[i].frequency /2,
        'text' : keywords[i].keyword + " " + keywords[i].frequency
      };
    circleData.push(textData);
  }
  return circleData;
}

//console.log(document.querySelector('circle').__data__);

//an array of keywords that also holds how many times that keyword showed up and all the reviews in which it did show up
var keywords = [
  {
    keyword : 'copenhagen',
    reviews : findReviews(/copenhagen/gi),
    frequency : findKeyword(/copenhagen/gi)
  },
  {
    keyword: 'expensive',
    reviews : findReviews(/expensive/gi),
    frequency : findKeyword(/expensive/gi)
  },
  {
    keyword: 'rides',
    reviews : findReviews(/rides/gi),
    frequency : findKeyword(/rides/gi)
  },
  {
    keyword: 'queue',
    reviews : findReviews(/queue/gi),
    frequency : findKeyword(/queue/gi)
  },
  {
    keyword: 'beautiful',
    reviews : findReviews(/beautiful/gi),
    frequency : findKeyword(/beautiful/gi)
  },
  {
    keyword: 'amazing',
    reviews : findReviews(/amazing/gi),
    frequency : findKeyword(/amazing/gi)
  }
];


//builds all the circles
makeAllCircles(keywords);

//make the text for each circle
d3.select('svg').selectAll('text')
        .data(allCircleData(keywords)).enter()
        .append('text')
        .text(function(d){return d.text})
        .attr('x', function(d) {return (d.cx /2) - 9})
        .attr('y', function(s){return (s.cx /2) + 5});


console.log(document.querySelectorAll('text'));




//grab all the circles
var circles = document.getElementsByTagName('circle');
//for each circle
for(var i = 0; i < circles.length; i++) {
  //add click event
  circles[i].addEventListener('click', function(){
    //grab the __data__ array
   var reviewList = d3.select(this.__data__);
   //grab an array of all objects inside __data__ array
   reviewList.map(function(dataObj){
    var reviewObj = dataObj[0];
    //log each objs description
    reviewObj.map(function(each){
      console.log(each.description);
    });
   });
  });
}

