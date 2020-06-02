function setUpMarketSliders(){

  // Death Rate
  var slider_death_rate_2 = document.getElementById('slider-death-rate-2');
  var death_rate_label_2 = document.getElementById('death-rate-2');
  var death_rate_label_2_mirror = document.getElementById('death-rate-2-mirror');

  noUiSlider.create(slider_death_rate_2, {
      start: DEATH_RATE_SC[2],
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

  slider_death_rate_2.noUiSlider.on('change', function(){
    DEATH_RATE_SC[2] = slider_death_rate_2.noUiSlider.get();
    death_rate_label_2.innerHTML = `${slider_death_rate_2.noUiSlider.get()} %`;
    death_rate_label_2_mirror.innerHTML = `${slider_death_rate_2.noUiSlider.get()} %`;
  });

  // Number of People
  var slider_no_people_2 = document.getElementById('slider-no-people-2');

  var initial_no_people_2 = document.getElementById('initial-no-people-2');
  var initial_no_susceptible_2 = document.getElementById('initial-no-susceptible-2');
  var initial_no_infected_2 = document.getElementById('initial-no-infected-2');

  var initial_no_susceptible_2_mirror = document.getElementById('initial-no-susceptible-2-mirror');
  var initial_no_infected_2_mirror = document.getElementById('initial-no-infected-2-mirror');

  noUiSlider.create(slider_no_people_2, {
      animate: true,
      start: [INITIAL_SUSCEPTIBLE_PEOPLE_SC[2], INITIAL_SUSCEPTIBLE_PEOPLE_SC[2] + INITIAL_INFECTED_PEOPLE_SC[2]],
      step: 1,
      connect: [true, true, false],
      range: {
          'min': 1,
          'max': MAX_NUMBER_OF_PEOPLE_SC[2]
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

  slider_no_people_2.noUiSlider.on('change', function(){
    var slider_values = slider_no_people_2.noUiSlider.get();

    initial_no_people_2.innerHTML = Math.round(slider_values[1]);
    initial_no_susceptible_2.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_2.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    initial_no_susceptible_2_mirror.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_2_mirror.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    INITIAL_SUSCEPTIBLE_PEOPLE_SC[2] = Math.round(slider_values[0]);
    INITIAL_INFECTED_PEOPLE_SC[2]  = Math.round(slider_values[1] - slider_values[0]);
    // NUMBER_OF_PEOPLE = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;
  });


  // Probability of infection person to person
  var slider_prob_infec_2 = document.getElementById('slider-prob-infec-2');
  var infected_prob_2 = document.getElementById('infected-prob-2');
  var infected_prob_2_mirror = document.getElementById('infected-prob-2-mirror');

  noUiSlider.create(slider_prob_infec_2, {
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

  slider_prob_infec_2.noUiSlider.on('change', function(){
    var slider_values = slider_prob_infec_2.noUiSlider.get();
    infected_prob_2.innerHTML = `${Math.round(slider_values)} %`;
    infected_prob_2_mirror.innerHTML = `${Math.round(slider_values)} %`;
    INFECTION_PROBABILTY_SC[2] = slider_values/100;
  });

  // Recovery time
  var slider_recovery_time_2 = document.getElementById('slider-recovery-time-2');
  var recovery_time_label_2 = document.getElementById('recovery-time-2');
  var recovery_time_label_2_mirror = document.getElementById('recovery-time-2-mirror');


  noUiSlider.create(slider_recovery_time_2, {
      start: RECOVERY_TIME_SC[2],
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

  slider_recovery_time_2.noUiSlider.on('change', function(){
    var slider_values = slider_recovery_time_2.noUiSlider.get();
    recovery_time_label_2.innerHTML = `${Math.round(slider_values)} days`;
    recovery_time_label_2_mirror.innerHTML = `${Math.round(slider_values)} days`;

    RECOVERY_TIME_SC[2] = slider_values;
  });

}

$('#load-parameters-2').click(function(){
  loadScenario(2, INITIAL_SUSCEPTIBLE_PEOPLE_SC[2], INITIAL_INFECTED_PEOPLE_SC[2]);
});

$('#load-scenario-2').click(function(){
  loadScenario(2, INITIAL_SUSCEPTIBLE_PEOPLE_SC[2], INITIAL_INFECTED_PEOPLE_SC[2]);
});

$('#stop-scenario-2').click(function(){
  stopScenario(2);
});

$('#play-scenario-2').click(function(){
  playScenario(2, INFECTION_PROBABILTY_SC[2], RECOVERY_TIME_SC[2], DEATH_RATE_SC[2]);
});

$('#update-scenario-2').click(function(){
  updateScenario(2, INFECTION_PROBABILTY_SC[2], RECOVERY_TIME_SC[2], DEATH_RATE_SC[2]);
});


setUpMarketSliders();
loadScenario(2, INITIAL_SUSCEPTIBLE_PEOPLE_SC[2], INITIAL_INFECTED_PEOPLE_SC[2]);
