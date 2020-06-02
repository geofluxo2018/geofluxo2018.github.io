function setUpHospitalSliders(){

  // Death Rate
  var slider_death_rate_3 = document.getElementById('slider-death-rate-3');
  var death_rate_label_3 = document.getElementById('death-rate-3');
  var death_rate_label_3_mirror = document.getElementById('death-rate-3-mirror');

  noUiSlider.create(slider_death_rate_3, {
      start: DEATH_RATE_SC[3],
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

  slider_death_rate_3.noUiSlider.on('change', function(){
    DEATH_RATE_SC[3] = slider_death_rate_3.noUiSlider.get();
    death_rate_label_3.innerHTML = `${slider_death_rate_3.noUiSlider.get()} %`;
    death_rate_label_3_mirror.innerHTML = `${slider_death_rate_3.noUiSlider.get()} %`;
  });

  // Number of People
  var slider_no_people_3 = document.getElementById('slider-no-people-3');

  var initial_no_people_3 = document.getElementById('initial-no-people-3');
  var initial_no_susceptible_3 = document.getElementById('initial-no-susceptible-3');
  var initial_no_infected_3 = document.getElementById('initial-no-infected-3');

  var initial_no_susceptible_3_mirror = document.getElementById('initial-no-susceptible-3-mirror');
  var initial_no_infected_3_mirror = document.getElementById('initial-no-infected-3-mirror');

  noUiSlider.create(slider_no_people_3, {
      animate: true,
      start: [INITIAL_SUSCEPTIBLE_PEOPLE_SC[3], INITIAL_SUSCEPTIBLE_PEOPLE_SC[3] + INITIAL_INFECTED_PEOPLE_SC[3]],
      step: 1,
      connect: [true, true, false],
      range: {
          'min': 1,
          'max': MAX_NUMBER_OF_PEOPLE_SC[3]
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

  slider_no_people_3.noUiSlider.on('change', function(){
    var slider_values = slider_no_people_3.noUiSlider.get();

    initial_no_people_3.innerHTML = Math.round(slider_values[1]);
    initial_no_susceptible_3.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_3.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    initial_no_susceptible_3_mirror.innerHTML = Math.round(slider_values[0]);
    initial_no_infected_3_mirror.innerHTML = Math.round(slider_values[1] - slider_values[0]);

    INITIAL_SUSCEPTIBLE_PEOPLE_SC[3] = Math.round(slider_values[0]);
    INITIAL_INFECTED_PEOPLE_SC[3]  = Math.round(slider_values[1] - slider_values[0]);
    // NUMBER_OF_PEOPLE = INITIAL_SUSCEPTIBLE_PEOPLE + INITIAL_INFECTED_PEOPLE;
  });


  // Probability of infection person to person
  var slider_prob_infec_3 = document.getElementById('slider-prob-infec-3');
  var infected_prob_3 = document.getElementById('infected-prob-3');
  var infected_prob_3_mirror = document.getElementById('infected-prob-3-mirror');

  noUiSlider.create(slider_prob_infec_3, {
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

  slider_prob_infec_3.noUiSlider.on('change', function(){
    var slider_values = slider_prob_infec_3.noUiSlider.get();
    infected_prob_3.innerHTML = `${Math.round(slider_values)} %`;
    infected_prob_3_mirror.innerHTML = `${Math.round(slider_values)} %`;
    INFECTION_PROBABILTY_SC[3] = slider_values/100;
  });

  // Recovery time
  var slider_recovery_time_3 = document.getElementById('slider-recovery-time-3');
  var recovery_time_label_3 = document.getElementById('recovery-time-3');
  var recovery_time_label_3_mirror = document.getElementById('recovery-time-3-mirror');


  noUiSlider.create(slider_recovery_time_3, {
      start: RECOVERY_TIME_SC[3],
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

  slider_recovery_time_3.noUiSlider.on('change', function(){
    var slider_values = slider_recovery_time_3.noUiSlider.get();
    recovery_time_label_3.innerHTML = `${Math.round(slider_values)} days`;
    recovery_time_label_3_mirror.innerHTML = `${Math.round(slider_values)} days`;

    RECOVERY_TIME_SC[3] = slider_values;
  });

}

$('#load-parameters-3').click(function(){
  loadScenario(3, INITIAL_SUSCEPTIBLE_PEOPLE_SC[3], INITIAL_INFECTED_PEOPLE_SC[3]);
});

$('#load-scenario-3').click(function(){
  loadScenario(3, INITIAL_SUSCEPTIBLE_PEOPLE_SC[3], INITIAL_INFECTED_PEOPLE_SC[3]);
});

$('#stop-scenario-3').click(function(){
  stopScenario(3);
});

$('#play-scenario-3').click(function(){
  playScenario(3, INFECTION_PROBABILTY_SC[3], RECOVERY_TIME_SC[3], DEATH_RATE_SC[3]);
});

$('#update-scenario-3').click(function(){
  updateScenario(3, INFECTION_PROBABILTY_SC[3], RECOVERY_TIME_SC[3], DEATH_RATE_SC[3]);
});

setUpHospitalSliders();
loadScenario(3, INITIAL_SUSCEPTIBLE_PEOPLE_SC[3], INITIAL_INFECTED_PEOPLE_SC[3]);
