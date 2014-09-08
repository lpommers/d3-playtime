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
  keywords.map(function(each){

    var allReviews = [];
    allReviews.push(each.reviews);
    var dimension = each.frequency;
    d3.select("body").append("svg")
                      .attr("width", dimension)
                      .attr("height", dimension)
                      .append("circle")
                      .attr("cx", dimension/2)
                      .attr("cy", dimension/2)
                      .attr("r", dimension/2)
                      .style("fill", "purple")
                      .data(allReviews).enter();
  });
}


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
  }
];




makeAllCircles(keywords);

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


console.log(d3.selectAll('circle'))

