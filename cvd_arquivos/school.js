function setUpSchoolSliders(){

  // Death Rate
  var slider_death_rate_1 = document.getElementById('slider-death-rate-1');
  var death_rate_label_1 = document.getElementById('death-rate-1');
  var death_rate_label_1_mirror = document.getElementById('death-rate-1-mirror');

  noUiSlider.create(slider_death_rate_1, {
      start: DEATH_RATE_SC[1],
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

  slider_death_rate_1.noUiSlider.on('change', function(){
    DEATH_RATE_SC[1] = slider_death_rate_1.noUiSlider.get();
    death_rate_label_1.innerHTML = `${slider_death_rate_1.noUiSlider.get()} %`;
    death_rate_label_1_mirror.innerHTML = `${slider_death_rate_1.noUiSlider.get()} %`;
  });

  // Number of People
  var slider_no_people_1 = document.getElementById('slider-no-people-1');

  var initial_no_people_1 = document.getElementById('initial-no-people-1');
  var initial_no_susceptible_1 = document.getElementById('initial-no-susceptible-1');
  var initial_no_infected_1 = document.getElementById('initial-no-infected-1');

  var initial_no_susceptible_1_mirror = document.getElementById('initial-no-susceptible-1-mirror');
  var initial_no_infected_1_mirror = document.getElementById('initial-no-infected-1-mirror');

  noUiSlider.create(slider_no_people_1, {
      animate: true,
      start: [INITIAL_SUSCEPTIBLE_PEOPLE_SC[1], INITIAL_SUSCEPTIBLE_PEOPLE_SC[1] + INITIAL_INFECTED_PEOPLE_SC[1]],
      step: 1,
      connect: [true, true, false],
      range: {
          'min': 1,
          'max': MAX_NUMBER_OF_PEOPLE_SC[1]
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

  slider_no_people_1.noUiSlider.on('change', function(){
    var slider_values = slider_no_people_1.noUiSlider.get();

    initial_no_people_1.innerHTML = Math.round(slider_values[1]);
    initial_no_susceptible_1.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_1.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    initial_no_susceptible_1_mirror.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_1_mirror.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    INITIAL_SUSCEPTIBLE_PEOPLE_SC[1] = Math.round(slider_values[0]);
    INITIAL_INFECTED_PEOPLE_SC[1]  = Math.round(slider_values[1] - slider_values[0]);
    // NUMBER_OF_PEOPLE = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;
  });


  // Probability of infection person to person
  var slider_prob_infec_1 = document.getElementById('slider-prob-infec-1');
  var infected_prob_1 = document.getElementById('infected-prob-1');
  var infected_prob_1_mirror = document.getElementById('infected-prob-1-mirror');

  noUiSlider.create(slider_prob_infec_1, {
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

  slider_prob_infec_1.noUiSlider.on('change', function(){
    var slider_values = slider_prob_infec_1.noUiSlider.get();
    infected_prob_1.innerHTML = `${Math.round(slider_values)} %`;
    infected_prob_1_mirror.innerHTML = `${Math.round(slider_values)} %`;
    INFECTION_PROBABILTY_SC[1] = slider_values/100;
  });

  // Recovery time
  var slider_recovery_time_1 = document.getElementById('slider-recovery-time-1');
  var recovery_time_label_1 = document.getElementById('recovery-time-1');
  var recovery_time_label_1_mirror = document.getElementById('recovery-time-1-mirror');


  noUiSlider.create(slider_recovery_time_1, {
      start: RECOVERY_TIME_SC[1],
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

  slider_recovery_time_1.noUiSlider.on('change', function(){
    var slider_values = slider_recovery_time_1.noUiSlider.get();
    recovery_time_label_1.innerHTML = `${Math.round(slider_values)} days`;
    recovery_time_label_1_mirror.innerHTML = `${Math.round(slider_values)} days`;

    RECOVERY_TIME_SC[1] = slider_values;
  });

}

$('#load-parameters-1').click(function(){
  loadScenario(1, INITIAL_SUSCEPTIBLE_PEOPLE_SC[1], INITIAL_INFECTED_PEOPLE_SC[1]);
});

$('#load-scenario-1').click(function(){
  loadScenario(1, INITIAL_SUSCEPTIBLE_PEOPLE_SC[1], INITIAL_INFECTED_PEOPLE_SC[1]);
});

$('#stop-scenario-1').click(function(){
  stopScenario(1);
});

$('#play-scenario-1').click(function(){
  playScenario(1, INFECTION_PROBABILTY_SC[1], RECOVERY_TIME_SC[1], DEATH_RATE_SC[1]);
});

$('#update-scenario-1').click(function(){
  updateScenario(1, INFECTION_PROBABILTY_SC[1], RECOVERY_TIME_SC[1], DEATH_RATE_SC[1]);
});


setUpSchoolSliders();
loadScenario(1, INITIAL_SUSCEPTIBLE_PEOPLE_SC[1], INITIAL_INFECTED_PEOPLE_SC[1]);
