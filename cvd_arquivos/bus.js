function setUpBusSliders(){

  // Death Rate
  var slider_death_rate_0 = document.getElementById('slider-death-rate-0');
  var death_rate_label_0 = document.getElementById('death-rate-0');
  var death_rate_label_0_mirror = document.getElementById('death-rate-0-mirror');

  noUiSlider.create(slider_death_rate_0, {
      start: DEATH_RATE_SC[0],
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

  slider_death_rate_0.noUiSlider.on('change', function(){
    DEATH_RATE_SC[0] = slider_death_rate_0.noUiSlider.get();
    death_rate_label_0.innerHTML = `${slider_death_rate_0.noUiSlider.get()} %`;
    death_rate_label_0_mirror.innerHTML = `${slider_death_rate_0.noUiSlider.get()} %`;
  });

  // Number of People
  var slider_no_people_0 = document.getElementById('slider-no-people-0');

  var initial_no_people_0 = document.getElementById('initial-no-people-0');
  var initial_no_susceptible_0 = document.getElementById('initial-no-susceptible-0');
  var initial_no_infected_0 = document.getElementById('initial-no-infected-0');

  var initial_no_susceptible_0_mirror = document.getElementById('initial-no-susceptible-0-mirror');
  var initial_no_infected_0_mirror = document.getElementById('initial-no-infected-0-mirror');

  noUiSlider.create(slider_no_people_0, {
      animate: true,
      start: [INITIAL_SUSCEPTIBLE_PEOPLE_SC[0], INITIAL_SUSCEPTIBLE_PEOPLE_SC[0] + INITIAL_INFECTED_PEOPLE_SC[0]],
      step: 1,
      connect: [true, true, false],
      range: {
          'min': 1,
          'max': MAX_NUMBER_OF_PEOPLE_SC[0]
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

  slider_no_people_0.noUiSlider.on('change', function(){
    var slider_values = slider_no_people_0.noUiSlider.get();

    initial_no_people_0.innerHTML = Math.round(slider_values[1]);
    initial_no_susceptible_0.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_0.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    initial_no_susceptible_0_mirror.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_0_mirror.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    INITIAL_SUSCEPTIBLE_PEOPLE_SC[0] = Math.round(slider_values[0]);
    INITIAL_INFECTED_PEOPLE_SC[0]  = Math.round(slider_values[1] - slider_values[0]);
    // NUMBER_OF_PEOPLE = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;
  });


  // Probability of infection person to person
  var slider_prob_infec_0 = document.getElementById('slider-prob-infec-0');
  var infected_prob_0 = document.getElementById('infected-prob-0');
  var infected_prob_0_mirror = document.getElementById('infected-prob-0-mirror');

  noUiSlider.create(slider_prob_infec_0, {
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

  slider_prob_infec_0.noUiSlider.on('change', function(){
    var slider_values = slider_prob_infec_0.noUiSlider.get();
    infected_prob_0.innerHTML = `${Math.round(slider_values)} %`;
    infected_prob_0_mirror.innerHTML = `${Math.round(slider_values)} %`;
    INFECTION_PROBABILTY_SC[0] = slider_values/100;
  });

  // Recovery time
  var slider_recovery_time_0 = document.getElementById('slider-recovery-time-0');
  var recovery_time_label_0 = document.getElementById('recovery-time-0');
  var recovery_time_label_0_mirror = document.getElementById('recovery-time-0-mirror');


  noUiSlider.create(slider_recovery_time_0, {
      start: RECOVERY_TIME_SC[0],
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

  slider_recovery_time_0.noUiSlider.on('change', function(){
    var slider_values = slider_recovery_time_0.noUiSlider.get();
    recovery_time_label_0.innerHTML = `${Math.round(slider_values)} days`;
    recovery_time_label_0_mirror.innerHTML = `${Math.round(slider_values)} days`;

    RECOVERY_TIME_SC[0] = slider_values;
  });

}

$('#load-parameters-0').click(function(){
  loadScenario(0, INITIAL_SUSCEPTIBLE_PEOPLE_SC[0], INITIAL_INFECTED_PEOPLE_SC[0]);
});

$('#load-scenario-0').click(function(){
  loadScenario(0, INITIAL_SUSCEPTIBLE_PEOPLE_SC[0], INITIAL_INFECTED_PEOPLE_SC[0]);
});

$('#stop-scenario-0').click(function(){
  stopScenario(0);
});

$('#play-scenario-0').click(function(){
  playScenario(0, INFECTION_PROBABILTY_SC[0], RECOVERY_TIME_SC[0], DEATH_RATE_SC[0]);
});

$('#update-scenario-0').click(function(){
  updateScenario(0, INFECTION_PROBABILTY_SC[0], RECOVERY_TIME_SC[0], DEATH_RATE_SC[0]);
});


setUpBusSliders();
loadScenario(0, INITIAL_SUSCEPTIBLE_PEOPLE_SC[0], INITIAL_INFECTED_PEOPLE_SC[0]);
