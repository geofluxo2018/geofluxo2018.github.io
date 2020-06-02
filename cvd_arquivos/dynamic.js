var data = [30, 20, 50];
var data_history = [];
var svg = d3.select("#svg-chart");
var svg_line = d3.select("#svg-line");
var color = ['#e1e1e1', '#ffc107', '#dc3545', '#17a2b8', '#343a40'];
var font_family_1 = "'Saira Extra Condensed',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'";
var font_family_2 = "Muli,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'";

var MESH_WIDTH = 15;
var MESH_HEIGHT = 15;
var DEATH_RATE = 0.5;
var INFECTION_PROBABILTY = 0.5;
var RECOVERY_TIME = 4;
var INITIAL_SUSCEPTIBLE_PEOPLE = 70;
var INITIAL_INFECTED_PEOPLE = 30;
var NUMBER_OF_PEOPLE = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;
var MAX_NUMBER_OF_PEOPLE = 200;
var SIMULATION_STEP = 0;
var STEP_LIMIT = 25;
var SIMULATION_IS_STOPPED = false;

var current_objs = [];
var y_values = [];
var y_contacts = [0];
var y_infected_contacts = [0];


function objsToDistribution(objs){

  var neighbors_array = [];

  objs.forEach(function(obj){
    var neighbor_objs = neighborObjs(objs, obj);
    var no_of_neighbors_array = Object.values(neighbor_objs);
    var no_of_neighbors = no_of_neighbors_array.reduce((accum, value) => accum + value);
    neighbors_array.push(no_of_neighbors);
  });

  var distribution = [];

  neighbors_array.forEach(function(element, index){
    if(distribution[`${element}`]){
      distribution[`${element}`] += 1;
    } else {
      distribution[`${element}`] = 1;
    }
  });

  return distribution
}

function createHistogram(svg_id, elements_class){

  var contacts_histogram = d3.select(`#${svg_id}`);
  var sample_data = [0,1,2,3,4,5,6,7,8];

  contacts_histogram
  .selectAll(`.hist-bars${elements_class}`)
  .data(sample_data)
  .enter()
  .append("rect")
  .attr("class",`hist-bar${elements_class}`)
  .style('fill','#6c757d')
  .attr("x", function(d, i){
    return 21*i+7
  })
  .attr("y", function(d,i){
    return 95;
  })
  .attr("width", 20)
  .attr("height", 0)
  .attr("rx", 2)
  .attr("ry", 2);

}

function updateHistogram(objs, elements_class){

  var dist = objsToDistribution(objs);
  var max_value = Math.max(...Object.values(dist));
  var neighbors_order = [0,1,2,3,4,5,6,7,8];

  d3
  .selectAll(`.hist-bar${elements_class}`)
  .data(neighbors_order)
  .transition()
  .attr("y", function(d,i){
    var y = 5 + (90 - (90*dist[`${d}`]/max_value || 0));
    return y;
  })
  .attr('height', function(d,i){
    var height = (90*dist[`${d}`]/max_value || 0);
    return `${height}px`;
  })
  .duration(200);

}

function setUpSliders(){

  // Death Rate
  var slider_death_rate = document.getElementById('slider-death-rate');
  var death_rate_label = document.getElementById('death-rate');

  noUiSlider.create(slider_death_rate, {
      start: 3.5,
      step: 0.5,
      connect: [true, false],
      range: {
          'min': 0,
          'max': 10
      },
      pips: {
        mode: 'steps',
        density: 5,
        format: wNumb({
            decimals: 1,
        }),
    }
  });

  slider_death_rate.noUiSlider.on('change', function(){
    DEATH_RATE = slider_death_rate.noUiSlider.get();
    death_rate_label.innerHTML = `${slider_death_rate.noUiSlider.get()} %`;
  });

  // Number of People
  // Slider
  var slider_no_people = document.getElementById('slider-no-people');

  //Labels
  var initial_no_people = document.getElementById('initial-no-people');
  var initial_no_susceptible = document.getElementById('initial-no-susceptible');
  var initial_no_infected = document.getElementById('initial-no-infected');

  // creation of slider out of the div
  noUiSlider.create(slider_no_people, {
      animate: true,
      start: [INITIAL_SUSCEPTIBLE_PEOPLE, NUMBER_OF_PEOPLE],
      step: 1,
      connect: [true, true, false],
      range: {
          'min': 1,
          'max': MAX_NUMBER_OF_PEOPLE
      },
      pips: {
        mode: 'steps',
        density: 50,
        format: wNumb({
            decimals: 2,

        }),
    }
  });

  // reaction of slider, changing the labels

  slider_no_people.noUiSlider.on('change', function(){
    var slider_values = slider_no_people.noUiSlider.get();

    initial_no_people.innerHTML = Math.round(slider_values[1]);
    initial_no_susceptible.innerHTML = Math.round(slider_values[0]);
    initial_no_infected.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    INITIAL_SUSCEPTIBLE_PEOPLE = Math.round(slider_values[0]);
    INITIAL_INFECTED_PEOPLE  = Math.round(slider_values[1] - slider_values[0]);
    NUMBER_OF_PEOPLE = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;
  });



  // Probability of infection person to person
  var slider_prob_infec = document.getElementById('slider-prob-infec');
  var infected_prob = document.getElementById('infected-prob');

  noUiSlider.create(slider_prob_infec, {
      start: 50,
      step: 10,
      connect: [true, false],
      range: {
          'min': 0,
          'max': 100
      },
      pips: {
        mode: 'steps',
        density: 3,
    }
  });

  slider_prob_infec.noUiSlider.on('change', function(){
    var slider_values = slider_prob_infec.noUiSlider.get();
    infected_prob.innerHTML = `${Math.round(slider_values)} %`;
    INFECTION_PROBABILTY = slider_values/100;
  });

  // Recovery time
  var slider_recovery_time = document.getElementById('slider-recovery-time');
  var recovery_time_label = document.getElementById('recovery-time');

  noUiSlider.create(slider_recovery_time, {
      start: 4,
      step: 1,
      connect: [true, false],
      range: {
          'min': 0,
          'max': 14
      },
      pips: {
        mode: 'steps',
        density: 3,
    }
  });

  slider_recovery_time.noUiSlider.on('change', function(){
    var slider_values = slider_recovery_time.noUiSlider.get();
    recovery_time_label.innerHTML = `${Math.round(slider_values)} days`;
    RECOVERY_TIME = slider_values;
  });


  // Mesh Width

  $('#mesh-width-input').change(function(value, index){
    var width = Math.round($(this).val());
    MESH_WIDTH = width;
    $('#mesh-width').html(`${width} m`);

    if((MESH_WIDTH*MESH_HEIGHT)<NUMBER_OF_PEOPLE){

      // update values
      NUMBER_OF_PEOPLE = MESH_WIDTH*MESH_HEIGHT;
      INITIAL_SUSCEPTIBLE_PEOPLE = Math.round(MESH_WIDTH*MESH_HEIGHT/2);
      INITIAL_INFECTED_PEOPLE = NUMBER_OF_PEOPLE - INITIAL_SUSCEPTIBLE_PEOPLE;

      // change labels
      initial_no_people.innerHTML = NUMBER_OF_PEOPLE;
      initial_no_susceptible.innerHTML = INITIAL_SUSCEPTIBLE_PEOPLE;
      initial_no_infected.innerHTML = INITIAL_INFECTED_PEOPLE;

      // update sliders
       slider_no_people.noUiSlider.set([INITIAL_SUSCEPTIBLE_PEOPLE, NUMBER_OF_PEOPLE]);
    }
  });


  //Mesh Height
    $('#mesh-height-input').change(function(value, index){
      var height = Math.round($(this).val());
      MESH_HEIGHT = height;
      $('#mesh-height').html(`${height} m`);

      if((MESH_WIDTH*MESH_HEIGHT)<NUMBER_OF_PEOPLE){

        // update values
        NUMBER_OF_PEOPLE = MESH_WIDTH*MESH_HEIGHT;
        INITIAL_SUSCEPTIBLE_PEOPLE = Math.round(MESH_WIDTH*MESH_HEIGHT/2);
        INITIAL_INFECTED_PEOPLE = NUMBER_OF_PEOPLE - INITIAL_SUSCEPTIBLE_PEOPLE;

        // change labels
        initial_no_people.innerHTML = NUMBER_OF_PEOPLE;
        initial_no_susceptible.innerHTML = INITIAL_SUSCEPTIBLE_PEOPLE;
        initial_no_infected.innerHTML = INITIAL_INFECTED_PEOPLE;

        // update sliders
         slider_no_people.noUiSlider.set([INITIAL_SUSCEPTIBLE_PEOPLE, NUMBER_OF_PEOPLE]);
      }
    });

}

function infectedContactsSum(objs){
  var flatten_matrix = objs.map(element => element.infected_contacts);
  var sum = flatten_matrix.reduce((accum, element)=> accum+element);
  return sum
}

function contactsSum(objs){
  var flatten_matrix = objs.map(element => element.contacts);
  var sum = flatten_matrix.reduce((accum, element)=> accum+element);
  return sum
}

function statesSum(objs){  // matrixToArray

  var flatten_matrix = objs.map(element => element.state);
  var counts = {"0":0, "1":0, "2":0, "3":0, "4":0};

  flatten_matrix.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
  var data = Object.values(counts);

  return data
}

function icObjects(size_x, size_y, no_susceptible, no_infected){

  var ic_objs = [];

  var no_people = no_infected + no_susceptible;

  while(ic_objs.length<no_people){

    var x = parseInt(Math.random()*size_x);
    var y = parseInt(Math.random()*size_y);
    var state = 1;

    if(ic_objs.length>=no_susceptible){
      state = 2;
    }

    var repeated_obj = ic_objs.find(function(obj){
      return (obj.x==x && obj.y==y)
    });

    if(repeated_obj==undefined){
      var obj = {'x':x, 'y':y, 'state':state, 'step':0, 'fixed':false ,'contacts':0, 'infected_contacts':0};
      ic_objs.push(obj);
    }
  }

  return ic_objs
}

function objsToMatrix(size_x, size_y, objs){
  var matrix = [];

  for(var j=0; j<size_y; j++){
    var line = [];
    for(var i=0; i<size_x; i++){
      var xy_obj = objs.find(function(obj){
        return (obj.x==i && obj.y==j)
      });

      if(xy_obj==undefined){
        line.push(0);
      } else {
        line.push(xy_obj.state)
      }
    }
    matrix.push(line);
  }
  return matrix
}

function nextObjs(size_x, size_y, objs, infection_prob, rec_time, death_rate){
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
      && new_x>=0 && new_x<size_x
      && new_y>=0 && new_y<size_y
      && !obj.fixed ){

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
        console.log('obj recovered');

    }

    //standard
    new_obj['infected_contacts'] = obj.infected_contacts + no_of_infected_neighbors;

    new_objs.push(new_obj);
  });

  return new_objs
}

function neighborObjs(objs, obj){

  var neighbor_objs = [];

  xy_adds = [[1,-1],[1, 0],[1, 1],
            [ 0,-1],/*obj*/[0, 1],
            [-1,-1],[-1,0],[-1,1]];

  xy_adds.forEach(function(xy_add, index){
    var neighbor_obj = objs.find(function(element){
      var x = obj.x + xy_add[0];
      var y = obj.y + xy_add[1];
      return (element.x==x && element.y==y)
    });

    if(neighbor_obj!=undefined){
      neighbor_objs.push(neighbor_obj);
    }
  });

  var counts = {"0":0, "1":0, "2":0, "3":0};
  neighbor_objs.forEach(function(e) { x = e.state; counts[x] = (counts[x] || 0)+1; });

  return counts
}

function setupContactsChart(div_id){

  var trace1 = {
    x: [0],
    y: [0],
    yaxis: 'y1',
    name: 'total contacts',
    type: 'scatter',
    mode: 'lines',
     line: {
      shape: 'spline',
      color: '#343a40',
      width: 3
    }
  };

  var trace2 = {
    x: [0],
    y: [0],
    yaxis: 'y2',
    name: 'infected contacts',
    type: 'scatter',
    mode: 'lines',
     line: {
      shape: 'spline',
      color: '#dc3545',
      width: 3
    }
  };

  var layout = {
    showlegend: false,
    width: 400,
    height: 140,
    margin: {
       autoexpand: false,
       l: 30,
       r: 30,
       t: 10,
       b: 30
     },
    xaxis: {
      range: [0, 25],
      autorange: false,
      color: 'transparent',
      tickfont:{
        color: '#a1a1a1',
        family: font_family_1, //'Rajdhani'
        size: 16,
      },
      title: {
        text: 'Time (days)',
        font:{
          family: font_family_1, //'Rajdhani'
          color: '#818181',
          size: 16,
        }
      }
    },
    yaxis1: {
      range: [0, 100],
      color: '#a1a1a1',
      tickfont:{
        family: font_family_1, //'Rajdhani'
        size: 14,
        color: '#343a40',
      },
    },
    yaxis2: {
      range: [0, 10],
      overlaying: 'y',
      side: 'right',
      color: '#a1a1a1',
      tickfont:{
        family: font_family_1, //'Rajdhani'
        size: 14,
        color: '#dc3545',
      },
    },
  };

  var data = [trace1, trace2];

  Plotly.newPlot(div_id, data, layout);
}

function updateContactsChart(div_id, y_contacts, y_infected_contacts){

  var x_array = [...Array(y_contacts.length).keys()];

  var new_trace1 = {
    x: x_array,
    y: y_contacts
  };

  var new_trace2 = {
    x: x_array,
    y: y_infected_contacts
  };

  var y1_max = Math.max(...y_contacts) + 5;
  var y2_max = Math.max(...y_infected_contacts) + 5;

  var data_update = [new_trace1, new_trace2];

  Plotly.animate(
    div_id,
    {
      data: data_update,
      traces: [0, 1],
      layout: {
        yaxis:{
          range: [0, y1_max],
        },
        yaxis2:{
          range: [0, y2_max],
        }
      }
    },
    {
      transition:
      {
        duration: 300,
        easing: 'cubic-in-out'
      },
      frame:
      {
        duration: 300
      }
    }
  );


}

function setupLineChart(div_id, y_values){

  var trace1 = {
  x: [0],
  y: y_values[0],
  name: '% susceptible',
  type: 'scatter',
  mode: 'lines',
  line: {
    shape: 'spline',
    color: 'rgb(255, 193, 7)',
    width: 3
  }
};

var trace2 = {
  x: [0],
  y: y_values[1],
  name: '% infectious',
  type: 'scatter',
  mode: 'lines',
  line: {
    shape: 'spline',
    color: 'rgb(220, 53, 69)',
    width: 3
  }
};

var trace3 = {
  x: [0],
  y: y_values[2],
  name: '% recovered',
  type: 'scatter',
  mode: 'lines',
   line: {
    shape: 'spline',
    color: 'rgb(23, 162, 184)',
    width: 3
  }
};

var trace4 = {
  x: [0],
  y: y_values[3],
  name: '% dead',
  type: 'scatter',
  mode: 'lines',
   line: {
    shape: 'spline',
    color: '#343a40',
    width: 3
  }
};

var layout = {
  width: 600,
  height: 320,
  margin: {
     autoexpand: false,
     l: 80,
     r: 30,
     t: 30,
     b: 50
   },
  showlegend: false,
  xaxis: {
    range: [0, 25],
    autorange: false,
    color: 'transparent',
    tickfont:{
      color: '#a1a1a1',
      family: font_family_1, //'Rajdhani'
      size: 16,
    },
    title: {
      text: 'Time (days)',
      font:{
        family: font_family_1, //'Rajdhani'
        color: '#818181',
        size: 16,
      }
    }
  },
  yaxis: {
    range: [-1, 101],
    autorange: false,
    color: '#a1a1a1',
    tickfont:{
      color: '#a1a1a1',
      family: font_family_1, //'Rajdhani'
      size: 16,
    },
    title: {
      text: 'Health Condition (%)',
      font:{
        family: font_family_1, //'Rajdhani'
        color: '#818181',
        size: 16,
      }
    }
  },
};

var data = [trace1, trace2, trace3 ,trace4];

Plotly.newPlot(div_id, data, layout);

}

function updateLineChart(div_id, y_values){

  var x_array = [...Array(y_values[0].length).keys()];

  var new_trace1 = {
    x: x_array,
    y: y_values[0]
  };

  var new_trace2 = {
    x: x_array,
    y: y_values[1]
  };

  var new_trace3 = {
    x: x_array,
    y: y_values[2]
  };

  var new_trace4 = {
    x: x_array,
    y: y_values[3]
  };

  var data_update = [new_trace1, new_trace2, new_trace3, new_trace4];

  Plotly.animate(
    div_id,
    {
      data: data_update,
      traces: [0, 1, 2, 3],
      layout: {}
    },
    {
      transition:
      {
        duration: 300,
        easing: 'cubic-in-out'
      },
      frame:
      {
        duration: 300
      }
    }
  );
}

function rescaleBars(objs, elements_class){

  var data = statesSum(objs);
  data.shift();
  var sum = data.reduce((a, b) => a + b, 0);

  d3.selectAll(`.bar${elements_class}`)
    .data(data)
    .transition()
    .style('height', function(d,i){
      var data_i = `${(100/sum)*d/(10*2)}em`;
      return data_i;
    })
    .duration(200);

  d3.selectAll(`.bar-pct${elements_class}`)
    .data(data)
    .transition()
    .text(function(d,i){
      var data_i = `${Math.round(10*100*d/sum)/10} %`;
      return data_i;
    })
    .duration(200);
}

function setupSquares(svg, elements_class, objs, color){

  // clear SVG
  svg.html("");

   var border = svg.append("rect")
                   .attr("x", 3 + (15-MESH_WIDTH)*9 )
                   .attr("y", 3 + (15-MESH_HEIGHT)*9)
                   .attr("width", 5 + MESH_WIDTH*18)
                   .attr("height",5 + MESH_HEIGHT*18)
                   .style("stroke", "#e1e1e1")
                   .style("fill", "transparent")
                   .attr("rx", 2)
                   .attr("ry", 2);

   var rects = svg.selectAll(".my-rects")
                  .data(objs)
                  .enter()
                  .append("rect");

      rects
      .attr("class", elements_class)
      .attr("x", function(obj, i){
        return 6 + (15-MESH_WIDTH)*9 + 18*obj.x
      })
      .attr("y", function(obj,i){
        return 6 + (15-MESH_HEIGHT)*9 + 18*obj.y;
      })
      .attr("width", 17)
      .attr("height", 17)
      .attr("rx", 2)
      .attr("ry", 2)
      // .on('mouseover',function(d,i){
      //   d3.select('#element-state').text(`x: ${1 + i%matrix_width} y:${1 + Math.floor(i/matrix_width)} | Person state: ${d} | Time: ${steps[i]}`);
      // })
      .style("fill", function(obj,i){
        return color[obj.state];
      });
}

function updateSquares(elements_class, objs, color){

  d3.selectAll(`.${elements_class}`)
    .data(objs)
    .transition()
    .attr("x", function(obj, i){
      return 6 + (15-MESH_WIDTH)*9 + 18*obj.x
    })
    .attr("y", function(obj,i){
      return 6 + (15-MESH_HEIGHT)*9 + 18*obj.y;
    })
    .style("fill", function(obj,i){
      return color[obj.state];
    })
    .duration(200);

}

function loadSimulation(){
  // purge state variables
  SIMULATION_IS_STOPPED = true;
  current_objs = [];
  y_values = [];
  y_contacts = [0];
  y_infected_contacts = [0];
  SIMULATION_STEP = 0;

  // Clear contact chart
  setupContactsChart('div-contacts');

  // Create initial objetcs representing persons
  NUMBER_OF_PEOPLE = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;

  current_objs = icObjects(MESH_WIDTH, MESH_HEIGHT, INITIAL_SUSCEPTIBLE_PEOPLE, INITIAL_INFECTED_PEOPLE);

  // Create the spacial matrix of objects persons xy and person state
  var matrix = objsToMatrix(MESH_WIDTH, MESH_HEIGHT, current_objs);

  // Plot the geometry of the locations
  setupSquares(svg, 'my-rect', current_objs, color);

  // Plots the current bars
  rescaleBars(current_objs, '');

  // Update histogram
  updateHistogram(current_objs, '');

  // create y Values
  var data = statesSum(current_objs);
  var sum = data[1] + data[2] + data[3] + data[4];

  y_values.push([parseInt(100*data[1]/sum)]);
  y_values.push([parseInt(100*data[2]/sum)]);
  y_values.push([parseInt(100*data[3]/sum)]);
  y_values.push([parseInt(100*data[4]/sum)]);

  // Plot the Line Chart
  setupLineChart('div-line',y_values);
}

function updateSimulation(){

  SIMULATION_STEP++;

  current_objs = nextObjs(MESH_WIDTH, MESH_HEIGHT, current_objs, INFECTION_PROBABILTY, RECOVERY_TIME, DEATH_RATE);
  var matrix = objsToMatrix(MESH_WIDTH, MESH_HEIGHT, current_objs);

  updateSquares('my-rect', current_objs, color);

  rescaleBars(current_objs, '');

  // Update histogram
  updateHistogram(current_objs, '');

  var data = statesSum(current_objs);
  var sum = data[1] + data[2] + data[3] + data[4];
  var contacts_sum = contactsSum(current_objs);
  var infected_contacts_sum = infectedContactsSum(current_objs);

  y_values[0].push(parseInt(100*data[1]/sum));
  y_values[1].push(parseInt(100*data[2]/sum));
  y_values[2].push(parseInt(100*data[3]/sum));
  y_values[3].push(parseInt(100*data[4]/sum));

  y_contacts.push(contacts_sum);
  y_infected_contacts.push(infected_contacts_sum);

  updateLineChart('div-line', y_values);
  updateContactsChart('div-contacts', y_contacts, y_infected_contacts);
}

function playSimulation(){

  SIMULATION_IS_STOPPED = false;
  var interval = setInterval(play_simulation, 500);

  function play_simulation(){
    if(SIMULATION_STEP==STEP_LIMIT || SIMULATION_IS_STOPPED){
      clearInterval(interval);
      console.log('# simulation stopped');
    } else{
      updateSimulation();
    }
  }
}

function stopSimulation(){
  SIMULATION_IS_STOPPED = true;
}

function initialSetUp(){
  setUpSliders();
  setupLineChart('div-line',[[0],[0],[0]]);
  setupContactsChart('div-contacts');
  createHistogram('contacts-histogram','');
  loadSimulation();
}

$('#load-parameters').click(function(){
  loadSimulation();
});

$('#sim-btn').click(function(){
  loadSimulation();
});

$('#update-btn').click(function(){
  updateSimulation();
});

$('#play-btn').click(function(){
  playSimulation();
});

$('#stop-btn').click(function(){
  stopSimulation();
});

initialSetUp();
