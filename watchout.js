var Game = {
  width : 600,
  height : 500,
  numEnemies : 10
};

var svg = d3.select('body').append('svg')
  .attr({
    width : Game.width,
    height : Game.height
  }).append('g')
  .attr("transform", "translate(32,"+ (Game.height / 2) + ")");

var alphabet = [12,23,29,36,51,67,72,85];



function update(someData) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var circle = svg.selectAll("circle")
      .data(someData, function(d){ return d;});

  // UPDATE
  // Update old elements as needed.
  circle.attr("class", "update");

  // ENTER
  // Create new elements as needed.
  circle.enter().append("circle")
      .attr("class", "enter");

  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  // text.text(function(d) { return d; });
  circle.attr("cx", function(d, i) { return i * 12; })
      .attr("cy", function(d){return d/2;})
      .attr("r", '10')
      .style('fill', function(d){
        if(d%2){
          return 'red';
        } else{
          return 'blue';
        }
      });

  // EXIT
  // Remove old elements as needed.
  circle.exit().remove();
}

// The initial display.
update(alphabet);

// Grab a random sample of letters from the alphabet, in alphabetical order.
setInterval(function() {
  update(shuffle(alphabet)
      .slice(0, Math.floor(Math.random() * 10))
      .sort());
}, 1500);

// Shuffles the input array.
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
}
