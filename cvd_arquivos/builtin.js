
// SPACE_MATRIX
// Binary matrix, where 0: is empty space, 1: already occupied space. Persons
// can only occupy null valued cells; space_matrix replace size_x and size_y.

// SCENARIO #1
var svg_sc0 = d3.select("#svg-scenario-0");
var svg_sc1 = d3.select("#svg-scenario-1");
var svg_sc2 = d3.select("#svg-scenario-2");
var svg_sc3 = d3.select("#svg-scenario-3");

var svg_sc = [svg_sc0, svg_sc1, svg_sc2, svg_sc3];
var x0y0 = [[32,17], [6,6], [6,6], [7,7]];

var current_objs_sc = [];
var y_values_sc = [[],[],[],,[]];
var y_contacts_sc = [[0],[0],[0],,[0]];
var y_infected_contacts_sc = [[0],[0],[0],[0]];

var SIMULATION_IS_STOPPED_SC = [false, false, false,false];
var SIMULATION_STEP_SC = [0, 0, 0, 0];

var DEATH_RATE_SC = [5, 0.5, 2.0, 5.0];
var INFECTION_PROBABILTY_SC = [0.5, 0.5, 0.5, 0.5];
var RECOVERY_TIME_SC = [5, 4, 6, 5];
var INITIAL_SUSCEPTIBLE_PEOPLE_SC = [10, 20, 100, 20] ;
var INITIAL_INFECTED_PEOPLE_SC = [1, 2, 5, 10];
// var NUMBER_OF_PEOPLE_SC = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;
var MAX_NUMBER_OF_PEOPLE_SC = [20, 30, 150, 30];

var SPACE_MATRIX_0 = [
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,1,1,1],
  [0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,0,1],
  [1,1,1,1,1,1,1,1,1]
];

var SPACE_MATRIX_1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,1,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var SPACE_MATRIX_2 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

var SPACE_MATRIX_3 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,0,0,1,1],
  [1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,1,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1],
  [1,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,0,1,1,1,1],
  [1,0,0,0,1,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

var SPACE_MATRIX_SC = [SPACE_MATRIX_0, SPACE_MATRIX_1, SPACE_MATRIX_2, SPACE_MATRIX_3]

function matrixToObjs(space_matrix){

  var space_objs = [];

  for(var j=0; j<space_matrix.length; j++){
    for(var i=0; i<space_matrix[0].length; i++){
        space_objs.push({'x':i, 'y':j, 'value':space_matrix[j][i]});
    }
  }

  return space_objs;
}

function availableSpaces(scenario_no){
  var flatten_matrix = scenario_no.flat();
  var sum = flatten_matrix.reduce((accum, element)=> accum+(1-element));
  return sum
}

function createBalcony(svg, x0, y0){

  var steer = svg.append("rect")
                    .attr("x", x0)
                    .attr("y", y0)
                    .attr("width", 52 )
                    .attr("height", 14 )
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .style("fill", "#515151");

  var computer = svg.append("rect")
                    .attr("x", x0+39)
                    .attr("y", y0+15)
                    .attr("width", 12 )
                    .attr("height", 17 )
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .style("fill", "#8C9C9E");

  var lines_array = [...Array(5).keys()];

  var lines = svg.selectAll(".shelve-1")
                  .data(lines_array)
                  .enter()
                  .append("line")
                  .attr("x1", x0-15)
                  .attr("y1", function(d,i) {
                    return y0+i*7+2
                  })
                  .attr("x2", x0-2)
                  .attr("y2", function(d,i) {
                    return y0+i*7+2
                  })
                  .style("stroke", "#858585")
                  .style("stroke-width", 0.5);

}

function createShelf(svg, x0, y0){


    var products_array = [...Array(36).keys()];
    var shelves_array = [...Array(17).keys()];

    var products = svg.selectAll(".shelve-products-1")
                    .data(products_array)
                    .enter()
                    .append("rect")
                    .attr("x", function(d,i){
                      return x0 + 12*Math.floor(i%18)
                    })
                    .attr("y", function(d,i){
                      return y0 + 10*Math.floor(i/18)
                    })
                    .attr("width", 5 )
                    .attr("height", 5 )
                    .attr("rx", 0)
                    .attr("ry", 0)
                    // .style("stroke", "#858585")
                    // .style("stroke-width", 0.5)
                    .style("fill", '#979797');

    var shelf = svg.selectAll(".shelve-1")
                    .data(shelves_array)
                    .enter()
                    .append("line")
                    .attr("x1", function(d,i){
                      return x0+8 + 12*i
                    })
                    .attr("y1", y0+1)
                    .attr("x2", function(d,i){
                      return x0+8 + 12*i
                    })
                    .attr("y2", y0+16)
                    .style("stroke", "#515151")
                    .style("stroke-width", 0.5);

    var line = svg.append("line")
                    .attr("x1", x0)
                    .attr("y1", y0+8)
                    .attr("x2", x0+208)
                    .attr("y2", y0+8)
                    .style("stroke", "#353535")
                    .style("stroke-width", 0.5);
}

function createMarketDetails(svg, x0, y0){

  var entrance = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0+288)
                  .attr("width", 5 )
                  .attr("height", 36)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "rgba(23, 162, 184, 0.5)");

  var exit = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 5 )
                  .attr("height", 36)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "rgba(220, 53, 69, 0.5)");
}

function setupLayerMarket(svg, space_matrix, scenario_no){

  // clear SVG
  svg.html("");

  // Back part of the bus

  var border = svg.append("rect")
                  .attr("x", 5)
                  .attr("y", 5)
                  .attr("width", 18*space_matrix[0].length )
                  .attr("height", 18*space_matrix.length )
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "transparent")
                  .style("stroke", "#d1d1d1")
                  .style("stroke-width", 2);



  // Matrix to JSON
  var objs = matrixToObjs(space_matrix).filter(element => element.value==1);

   var rects = svg.selectAll(".my-rects")
                  .data(objs)
                  .enter()
                  .append("rect");

      rects
      .attr("class", `layer-${scenario_no}`)
      .attr("x", function(obj, i){
        return 5 + 18*obj.x
      })
      .attr("y", function(obj,i){
        return 5 + 18*obj.y;
      })
      .attr("width", 18)
      .attr("height", 18)
      .attr("rx", 0)
      .attr("ry", 0)
      .style("fill", "rgb(209, 209, 209)");

  createShelf(svg, 189, 60);
  createShelf(svg, 189, 114);
  createShelf(svg, 189, 168);
  createShelf(svg, 189, 222);
  createShelf(svg, 189, 276);

  createBalcony(svg, 59, 61);
  createBalcony(svg, 59, 115);
  createBalcony(svg, 59, 169);
  createBalcony(svg, 59, 223);
  createBalcony(svg, 59, 277);

  createMarketDetails(svg, 5, 23);
}

function crateSchoolChair(svg, x0, y0){
  var table = svg.append("rect")
                  .attr("x", x0+6)
                  .attr("y", y0)
                  .attr("width", 10)
                  .attr("height",  16)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#d1d1d1")
                  .style("stroke", "#919191")
                  .style("stroke-width", 1);

  var chair_p1 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0+1)
                  .attr("width", 2 )
                  .attr("height", 14 )
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#d1d1d1")
                  .style("stroke", "#919191")
                  .style("stroke-width", 1);
}

function createBoard(svg, x0, y0){
  var board = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0+1)
                  .attr("width", 2 )
                  .attr("height", 108)
                  .attr("rx", 0)
                  .attr("ry", 0)
                  .style("fill", "rgba(23, 162, 184, 0.8)")
                  .style("stroke", "#919191")
                  .style("stroke-width", 1);
}

function createSink(svg, x0, y0){
  var p1 = svg.append("rect")
                  .attr("x", x0+1)
                  .attr("y", y0+1)
                  .attr("width", 34 )
                  .attr("height", 18)
                  .attr("rx", 0)
                  .attr("ry", 0)
                  .style("fill", "#d1d1d1")
                  .style("stroke", "#f1f1f1")
                  .style("stroke-width", 1);

var p2 = svg.append("rect")
                .attr("x", x0+10)
                .attr("y", y0+3)
                .attr("width", 16 )
                .attr("height", 14)
                .attr("rx", 5)
                .attr("ry", 5)
                .style("fill", "#f1f1f1")
                .style("stroke", "#a1a1a1")
                .style("stroke-width", 1);
}

function createToilet(svg, x0, y0){

  var p2 = svg.append("rect")
                  .attr("x", x0+4)
                  .attr("y", y0+4)
                  .attr("width", 14)
                  .attr("height", 15)
                  .attr("rx", 8)
                  .attr("ry", 8)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p1 = svg.append("rect")
                  .attr("x", x0+4)
                  .attr("y", y0+2)
                  .attr("width", 14 )
                  .attr("height", 4)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

}

function createToiletR(svg, x0, y0){

  var p2 = svg.append("rect")
                  .attr("x", x0+4)
                  .attr("y", y0+2)
                  .attr("width", 14)
                  .attr("height", 15)
                  .attr("rx", 8)
                  .attr("ry", 8)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p1 = svg.append("rect")
                  .attr("x", x0+4)
                  .attr("y", y0+14)
                  .attr("width", 14 )
                  .attr("height", 4)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

}

function createToiletL(svg, x0, y0){

  var p2 = svg.append("rect")
                  .attr("x", x0+4)
                  .attr("y", y0+2)
                  .attr("width", 15)
                  .attr("height", 14)
                  .attr("rx", 8)
                  .attr("ry", 8)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p1 = svg.append("rect")
                  .attr("x", x0+1)
                  .attr("y", y0+2)
                  .attr("width", 4 )
                  .attr("height", 14)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

}

function setupLayerSchool(svg, space_matrix, scenario_no){

  // clear SVG
  svg.html("");

  // Back part of the bus

  var border = svg.append("rect")
                  .attr("x", 5)
                  .attr("y", 5)
                  .attr("width", 18*space_matrix[0].length )
                  .attr("height", 18*space_matrix.length )
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "transparent")
                  .style("stroke", "#d1d1d1")
                  .style("stroke-width", 2);



  // Matrix to JSON
  var objs = matrixToObjs(space_matrix).filter(element => element.value==1);

   var rects = svg.selectAll(".my-rects")
                  .data(objs)
                  .enter()
                  .append("rect");

      rects
      .attr("class", `layer-${scenario_no}`)
      .attr("x", function(obj, i){
        return 5 + 18*obj.x
      })
      .attr("y", function(obj,i){
        return 5 + 18*obj.y;
      })
      .attr("width", 18)
      .attr("height", 18)
      .attr("rx", 0)
      .attr("ry", 0)
      .style("fill", "rgb(209, 209, 209)");

  createBoard(svg, 146, 30);
  createBoard(svg, 146, 248);
  createBoard(svg, 272, 30);
  createBoard(svg, 272, 248);

  for(var i=0; i<3; i++){
    for(var j=0; j<4; j++){
      crateSchoolChair(svg, 18+6+36*i, 18*1+6+36*j);
      crateSchoolChair(svg, 18+6+36*i, 18*12+6+36*j);
    }
  }

  for(var i=0; i<2; i++){
    for(var j=0; j<4; j++){
      crateSchoolChair(svg, 18*9+6+36*i, 18*1+6+36*j);
      crateSchoolChair(svg, 18*9+6+36*i, 18*12+6+36*j);
    }
  }

  createSink(svg, 293, 328);
  createSink(svg, 293, 22);

  createToilet(svg, 345, 22);
  createToilet(svg, 381, 22);
  createToilet(svg, 417, 22);

  createToiletR(svg, 345, 328);
  createToiletR(svg, 381, 328);
  createToiletR(svg, 417, 328);

}

function createShower(svg, x0, y0){

  var p1 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 36)
                  .attr("height", 18)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#ddeeff");

  var p3 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0+8)
                  .attr("width", 8 )
                  .attr("height", 2)
                  .attr("rx", 0)
                  .attr("ry", 0)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p2 = svg.append("rect")
                  .attr("x", x0+5)
                  .attr("y", y0+5)
                  .attr("width", 8 )
                  .attr("height", 8)
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

}

function createShowerR(svg, x0, y0){

  var p1 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 36)
                  .attr("height", 18)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#ddeeff");


  var p3 = svg.append("rect")
                  .attr("x", x0+28)
                  .attr("y", y0+8)
                  .attr("width", 8 )
                  .attr("height", 2)
                  .attr("rx", 0)
                  .attr("ry", 0)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p2 = svg.append("rect")
                  .attr("x", x0+23)
                  .attr("y", y0+5)
                  .attr("width", 8 )
                  .attr("height", 8)
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

}

function createBed(svg, x0, y0){

  var p1 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 34)
                  .attr("height", 16)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p2 = svg.append("rect")
                  .attr("x", x0+2)
                  .attr("y", y0+2)
                  .attr("width", 8 )
                  .attr("height", 12)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#ffffff")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p3 = svg.append("rect")
                  .attr("x", x0+12)
                  .attr("y", y0+1)
                  .attr("width", 20)
                  .attr("height", 14)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "rgba(23, 162, 184, 0.3)")
                  .style("stroke", "#f1f1f1")
                  .style("stroke-width", 1);

}

function createBedR(svg, x0, y0){

  var p1 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 34)
                  .attr("height", 16)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p2 = svg.append("rect")
                  .attr("x", x0+24)
                  .attr("y", y0+2)
                  .attr("width", 8 )
                  .attr("height", 12)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#ffffff")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p3 = svg.append("rect")
                  .attr("x", x0+2)
                  .attr("y", y0+1)
                  .attr("width", 20)
                  .attr("height", 14)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "rgba(23, 162, 184, 0.3)")
                  .style("stroke", "#f1f1f1")
                  .style("stroke-width", 1);

}

function createCirurgicBed(svg, x0, y0){

  var p1 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 52)
                  .attr("height", 16)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "rgba(23, 162, 184, 0.5)")
                  .style("stroke-width", 2);

  var p2 = svg.append("rect")
                  .attr("x", x0+2)
                  .attr("y", y0+2)
                  .attr("width", 8 )
                  .attr("height", 12)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#ffffff")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p3 = svg.append("rect")
                  .attr("x", x0+12)
                  .attr("y", y0+1)
                  .attr("width", 38)
                  .attr("height", 14)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "rgba(23, 162, 184, 0.1)")
                  .style("stroke", "#f1f1f1")
                  .style("stroke-width", 1);

  var p4 = svg.append("rect")
                  .attr("x", x0+12)
                  .attr("y", y0+1)
                  .attr("width", 38)
                  .attr("height", 14)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "rgba(23, 162, 184, 0.1)")
                  .style("stroke", "#f1f1f1")
                  .style("stroke-width", 1);

}

function createRespirator(svg, x0, y0){

  var p1 = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 4)
                  .attr("height", 16)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p2 = svg.append("rect")
                  .attr("x", x0+6)
                  .attr("y", y0)
                  .attr("width", 4)
                  .attr("height", 16)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

  var p1 = svg.append("rect")
                  .attr("x", x0+12)
                  .attr("y", y0)
                  .attr("width", 4)
                  .attr("height", 16)
                  .attr("rx", 1)
                  .attr("ry", 1)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);

}

function createSquare(svg, x0, y0){
  var sq = svg.append("rect")
                  .attr("x", x0)
                  .attr("y", y0)
                  .attr("width", 16)
                  .attr("height", 16)
                  .attr("rx", 2)
                  .attr("ry", 2)
                  .style("fill", "#f1f1f1")
                  .style("stroke", "#a1a1a1")
                  .style("stroke-width", 1);
}

function setupLayerHospital(svg, space_matrix, scenario_no){

  // clear SVG
  svg.html("");

  // Matrix to JSON
  var objs = matrixToObjs(space_matrix).filter(element => element.value==1);

   var rects = svg.selectAll(".my-rects")
                  .data(objs)
                  .enter()
                  .append("rect");

      rects
      .attr("class", `layer-${scenario_no}`)
      .attr("x", function(obj, i){
        return  6 + 18*obj.x
      })
      .attr("y", function(obj,i){
        return 6 + 18*obj.y;
      })
      .attr("width", 18)
      .attr("height", 18)
      .attr("rx", 0)
      .attr("ry", 0)
      .style("fill", "rgb(209, 209, 209)");

  var border = svg.append("rect")
                  .attr("x", 6)
                  .attr("y", 6)
                  .attr("width", 18*space_matrix[0].length)
                  .attr("height", 18*space_matrix.length)
                  .attr("rx", 2)
                  .attr("ry", 2)
                  .style("fill", "transparent")
                  .style("stroke", "#d1d1d1")
                  .style("stroke-width", 3);


  createBed(svg, 205, 259);
  createBed(svg, 205, 295);
  createBed(svg, 205, 331);

  createBed(svg, 205, 25);
  createBed(svg, 205, 61);
  createBed(svg, 205, 97);

  createSink(svg, 330, 24);
  createSink(svg, 384, 24);

  createSink(svg, 330, 328);
  createSink(svg, 384, 328);

  createBedR(svg, 330, 223);
  createBedR(svg, 330, 133);

  createBed(svg, 384, 223);
  createBed(svg, 384, 133);

  createToilet(svg, 274, 293);
  createToilet(svg, 454, 293);

  createToiletR(svg, 274, 60);
  createToiletR(svg, 454, 60);

  createShower(svg, 276, 24);
  createShower(svg, 276, 330);

  createShowerR(svg, 438, 330);
  createShowerR(svg, 438, 24);

  createToiletL(svg, 203, 132);
  createToiletL(svg, 203, 222);

  createCirurgicBed(svg, 79, 61);
  createCirurgicBed(svg, 79, 295);

  createRespirator(svg, 61, 43);
  createRespirator(svg, 61, 313);

  createSquare(svg, 133, 313);
  createSquare(svg, 133, 43);

  for(var k=0; k<5; k++){
    createSquare(svg, k*18+25, 223);
    createSquare(svg, k*18+25, 133);
  }

}

function setupLayerBus(svg, space_matrix, scenario_no){

  // clear SVG
  svg.html("");

  // Back part of the bus

  var back_structure = svg.append("rect")
                            .attr("x", 31)
                            .attr("y", 2)
                            .attr("width", 18*space_matrix[0].length )
                            .attr("height", 50)
                            .attr("rx", 15)
                            .attr("ry", 15)
                            .style("fill", "rgb(209, 209, 209)")
                            .style("stroke", "#d1d1d1")
                            .style("stroke-width", 2);

  var back_light_right = svg.append("rect")
                            .attr("x", 25+ 18*space_matrix[0].length/5)
                            .attr("y", 2)
                            .attr("width", 20 )
                            .attr("height", 5)
                            .attr("rx", 2)
                            .attr("ry", 2)
                            .style("fill", "rgba(220, 53, 69, 0.5)");

  var back_light_left = svg.append("rect")
                            .attr("x", 15+ 18*4*space_matrix[0].length/5)
                            .attr("y", 2)
                            .attr("width", 20 )
                            .attr("height", 5)
                            .attr("rx", 2)
                            .attr("ry", 2)
                            .style("fill", "rgba(220, 53, 69, 0.5)");

  // Front part of the bus

  var front_structure = svg.append("rect")
                            .attr("x", 31)
                            .attr("y", 10+ 18*space_matrix.length - 7)
                            .attr("width", 18*space_matrix[0].length )
                            .attr("height", 50)
                            .attr("rx", 15)
                            .attr("ry", 15)
                            .style("fill", "rgb(209, 209, 209)")
                            .style("stroke", "#d1d1d1")
                            .style("stroke-width", 2);

  var shield_wind = svg.append("rect")
                            .attr("x", 36)
                            .attr("y", 10+ 18*space_matrix.length - 7)
                            .attr("width", 17*space_matrix[0].length )
                            .attr("height", 18)
                            .attr("rx", 5)
                            .attr("ry", 5)
                            .style("fill", "rgba(23, 162, 184 ,0.5)");

  var light_right = svg.append("rect")
                            .attr("x", 25+ 18*space_matrix[0].length/5)
                            .attr("y", 10+ 18*space_matrix.length + 40)
                            .attr("width", 20 )
                            .attr("height", 5)
                            .attr("rx", 2)
                            .attr("ry", 2)
                            .style("fill", "rgba(255, 193, 7, 0.5)");

  var light_left = svg.append("rect")
                            .attr("x", 15+ 18*4*space_matrix[0].length/5)
                            .attr("y", 10+ 18*space_matrix.length + 40)
                            .attr("width", 20 )
                            .attr("height", 5)
                            .attr("rx", 2)
                            .attr("ry", 2)
                            .style("fill", "rgba(255, 193, 7, 0.5)");

  //  Bus tires
  var tire_1 = svg.append("rect")
                  .attr("x", 25 + 18*space_matrix[0].length)
                  .attr("y", 10+ 18*space_matrix.length/6)
                  .attr("width", 20)
                  .attr("height", 50)
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "#343a40");

  var tire_2 = svg.append("rect")
                  .attr("x", 17)
                  .attr("y", 10+ 18*space_matrix.length/6)
                  .attr("width", 20)
                  .attr("height", 50)
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "#343a40");

  var tire_3 = svg.append("rect")
                  .attr("x", 17)
                  .attr("y", 10+ 5*18*space_matrix.length/6)
                  .attr("width", 15)
                  .attr("height", 50)
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "#343a40");

  var tire_4 = svg.append("rect")
                  .attr("x", 25 + 18*space_matrix[0].length)
                  .attr("y", 10+ 5*18*space_matrix.length/6)
                  .attr("width", 20)
                  .attr("height", 50)
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .style("fill", "#343a40");


  // Matrix to JSON
  var objs = matrixToObjs(space_matrix).filter(element => element.value==1);

   var rects = svg.selectAll(".my-rects")
                  .data(objs)
                  .enter()
                  .append("rect");

      rects
      .attr("class", `layer-${scenario_no}`)
      .attr("x", function(obj, i){
        return 25 + 6 + 18*obj.x
      })
      .attr("y", function(obj,i){
        return 10+ 6 + 18*obj.y;
      })
      .attr("width", 18)
      .attr("height", 18)
      .attr("rx", 0)
      .attr("ry", 0)
      .style("fill", "rgb(209, 209, 209)");

  var border = svg.append("rect")
                  .attr("x", 25 + 6)
                  .attr("y", 10+ 6)
                  .attr("width", 18*space_matrix[0].length)
                  .attr("height", 18*space_matrix.length)
                  .attr("rx", 2)
                  .attr("ry", 2)
                  .style("fill", "transparent")
                  .style("stroke", "#d1d1d1")
                  .style("stroke-width", 3);

}

function setupLayer(svg, space_matrix, scenario_no){
  switch (scenario_no) {
    case 0:
      setupLayerBus(svg, space_matrix, scenario_no);
      break;
    case 1:
      setupLayerSchool(svg, space_matrix, scenario_no);
      break;
    case 2:
      setupLayerMarket(svg, space_matrix, scenario_no);
      break;
    case 3:
      setupLayerHospital(svg, space_matrix, scenario_no);
      break;
    default:
      console.log('Not yet implemented');
  }
}

function setupSquaresScenario(svg, elements_class, objs, color, x0, y0){

   var rects = svg.selectAll(`.rects-${elements_class}`)
                  .data(objs)
                  .enter()
                  .append("rect");

      rects
      .attr("class", elements_class)
      .attr("x", function(obj, i){
        return x0 + 18*obj.x
      })
      .attr("y", function(obj,i){
        return y0 + 18*obj.y;
      })
      .attr("width", 16)
      .attr("height", 16)
      .attr("rx", 2)
      .attr("ry", 2)
      .style("fill", function(obj,i){
        return color[obj.state];
      });
}

function updateSquaresScenario(elements_class, objs, color , x0, y0){

  d3.selectAll(`.${elements_class}`)
    .data(objs)
    .transition()
    .attr("x", function(obj, i){
      return x0 + 18*obj.x
    })
    .attr("y", function(obj,i){
      return y0 + 18*obj.y;
    })
    .style("fill", function(obj,i){
      return color[obj.state];
    })
    .duration(200);

}

function icObjectsScenario(scenario_no, space_matrix, no_susceptible, no_infected){

  var space_objs = matrixToObjs(space_matrix).filter(element => element.value==0);
  var ic_objs = [];

  var no_people = no_infected + no_susceptible;

  while(ic_objs.length<no_people){

    var index = Math.floor(Math.random()*(space_objs.length));
    var x = space_objs[index].x;
    var y = space_objs[index].y;
    space_objs.splice(index, 1);

    var state = 1;

    if(ic_objs.length>=no_susceptible){
      state = 2;
    }

    var obj = {'x':x, 'y':y, 'state':state, 'step':0, 'fixed':false ,'contacts':0, 'infected_contacts':0};
    ic_objs.push(obj);
  }

  return ic_objs
}

function nextObjsScenario(scenario_no, space_matrix, objs, infection_prob, rec_time, death_rate){

  var new_objs = [];

  objs.forEach(function(obj, index){
    var neighbor_objs = neighborObjs(objs,obj);
    var no_of_neighbors_array = Object.values(neighbor_objs);
    var no_of_neighbors = no_of_neighbors_array.reduce((accum, value) => accum + value);

    var no_of_infected_neighbors = 0;

    var new_obj = obj;
    var new_x = obj.x + Math.round(2*Math.random()-1);
    var new_y = obj.y + Math.round(2*Math.random()-1);

    var xy_obj = objs.find(function(obj){
      return (obj.x==new_x && obj.y==new_y)
    });

    var xy_new_obj = new_objs.find(function(n_obj){
      return (n_obj.x==new_x && n_obj.y==new_y)
    });

    if(  xy_obj==undefined
      && xy_new_obj==undefined
      && !obj.fixed
      && space_matrix[new_y][new_x]==0){

      new_obj['x'] = new_x;
      new_obj['y'] = new_y;
    }

    // standard
    new_obj['step'] = obj.step + 1;
    new_obj['contacts'] = obj.contacts + no_of_neighbors;

    switch (obj.state) {
      case 1: // susceptible
        no_of_infected_neighbors = neighbor_objs['2'];

        if(Math.random()<neighbor_objs['2']*infection_prob){ // now infected
          new_obj['state'] = 2;
          new_obj['step'] = 0;
        }
        break;

      case 2: // infectious

        if(obj.step==rec_time){
          if(Math.random()<=(death_rate/100)){
            new_obj['state'] = 4; // dead
            new_obj['fixed'] = true; // dead
          }else{
            new_obj['state'] = 3; // recovered
          }
        }
        break;

      case 4: // dead
        new_obj['step'] = 0; // does not evolve anymore
        break;

      default:
        console.log('');

    }

    //standard
    new_obj['infected_contacts'] = obj.infected_contacts + no_of_infected_neighbors;

    new_objs.push(new_obj);
  });

  return new_objs
}

function loadScenario(scenario_no, no_susceptible, no_infected){

  SIMULATION_STEP_SC[scenario_no] = 0;
  y_values_sc[scenario_no] = [];
  y_contacts_sc[scenario_no] = [0];
  y_infected_contacts_sc[scenario_no]= [0];

  var space_matrix = SPACE_MATRIX_SC[scenario_no];
  var ic_objs = icObjectsScenario(scenario_no, space_matrix, no_susceptible, no_infected);
  var svg = svg_sc[scenario_no];

  if(scenario_no<current_objs_sc.length){
    current_objs_sc[scenario_no] = ic_objs;
  } else {
    current_objs_sc.push(ic_objs);
  }

  // load the geometry of space and persons
  setupLayer(svg, space_matrix, scenario_no);
  setupSquaresScenario(svg, `sc-${scenario_no}`, ic_objs, color, x0y0[scenario_no][0], x0y0[scenario_no][1]);

  // load the health condition bars
  rescaleBars(current_objs_sc[scenario_no], `-sc-${scenario_no}`);

  // load neighbors histogram
  createHistogram(`contacts-hist-${scenario_no}`, `-sc-${scenario_no}`);
  updateHistogram(current_objs_sc[scenario_no], `-sc-${scenario_no}`);

  // create y Values
  var data = statesSum(current_objs_sc[scenario_no]);
  var sum = data[1] + data[2] + data[3] + data[4];

  y_values_sc[scenario_no].push([parseInt(100*data[1]/sum)]);
  y_values_sc[scenario_no].push([parseInt(100*data[2]/sum)]);
  y_values_sc[scenario_no].push([parseInt(100*data[3]/sum)]);
  y_values_sc[scenario_no].push([parseInt(100*data[4]/sum)]);

  // load health condition through time chart
  setupLineChart(`div-line-${scenario_no}`,y_values_sc[scenario_no]);

  // load accumulative contacts
  setupContactsChart(`div-contacts-${scenario_no}`);

}

function updateScenario(scenario_no, infection_prob, rec_time, death_rate){

  var space_matrix = SPACE_MATRIX_SC[scenario_no];

  // update objects
  current_objs_sc[scenario_no] = nextObjsScenario(scenario_no, space_matrix, current_objs_sc[scenario_no], infection_prob, rec_time, death_rate);

  // update the geometry and state of objects
  updateSquaresScenario(`sc-${scenario_no}`, current_objs_sc[scenario_no], color, x0y0[scenario_no][0], x0y0[scenario_no][1]);

  // update the health condition bars
  rescaleBars(current_objs_sc[scenario_no], `-sc-${scenario_no}`);

  // update neighbors histogram
  updateHistogram(current_objs_sc[scenario_no], `-sc-${scenario_no}`);

  // update health condition through time

  var data = statesSum(current_objs_sc[scenario_no]);
  var sum = data[1] + data[2] + data[3] + data[4];

  y_values_sc[scenario_no][0].push(parseInt(100*data[1]/sum));
  y_values_sc[scenario_no][1].push(parseInt(100*data[2]/sum));
  y_values_sc[scenario_no][2].push(parseInt(100*data[3]/sum));
  y_values_sc[scenario_no][3].push(parseInt(100*data[4]/sum));

  updateLineChart(`div-line-${scenario_no}`, y_values_sc[scenario_no]);

  // load accumulative contacts
  var contacts_sum = contactsSum(current_objs_sc[scenario_no]);
  var infected_contacts_sum = infectedContactsSum(current_objs_sc[scenario_no]);

  y_contacts_sc[scenario_no].push(contacts_sum);
  y_infected_contacts_sc[scenario_no].push(infected_contacts_sum);

  updateContactsChart(`div-contacts-${scenario_no}`, y_contacts_sc[scenario_no], y_infected_contacts_sc[scenario_no]);


  // Advance the Step Number of the simulation
  SIMULATION_STEP_SC[scenario_no]++;
}

function stopScenario(scenario_no){
  SIMULATION_IS_STOPPED_SC[scenario_no] = true;
}

function playScenario(scenario_no, infection_prob, rec_time, death_rate){

  SIMULATION_IS_STOPPED_SC[scenario_no] = false;
  var interval = setInterval(play_simulation, 500);

  function play_simulation(){
    if(SIMULATION_STEP_SC[scenario_no]==STEP_LIMIT || SIMULATION_IS_STOPPED_SC[scenario_no]){
      clearInterval(interval);
    } else{
      updateScenario(scenario_no, infection_prob, rec_time, death_rate);
    }
  }
}
