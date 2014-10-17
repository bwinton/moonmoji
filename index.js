var suncalc = require('suncalc');

var phases = [
  { emoji: '🌑', name: 'New Moon', weight: 1 },
  { emoji: '🌒', name: 'Waxing Crescent', weight: 6.3825 },
  { emoji: '🌓', name: 'First Quarter', weight: 1 },
  { emoji: '🌔', name: 'Waxing Gibbous', weight: 6.3825 },
  { emoji: '🌕', name: 'Full Moon', weight: 1 },
  { emoji: '🌖', name: 'Waning Gibbous', weight: 6.3825 },
  { emoji: '🌗', name: 'Last Quarter', weight: 1 },
  { emoji: '🌘', name: 'Waning Crescent', weight: 6.3825 },
  { emoji: '🌚', name: 'New Moon *', weight: 0 },
  { emoji: '🌝', name: 'Full Moon *', weight: 0 }
];

function stepPhase(phase, randomVal) {
  if (randomVal === undefined) {
    randomVal = 0.1;
  }

  var weight = phases.reduce(function (a, b) {
    return a + b.weight;
  }, 0);

  phase *= weight;
  for (var rv = 0; rv < phases.length; rv++) {
    phase -= phases[rv].weight;
    if (phase <= 0) {
      break;
    }
  };

  if (Math.random() <= randomVal && rv === 0) {
    return 8;
  }

  if (Math.random() <= randomVal && rv === 4) {
    return 9;
  }

  return rv;
}

module.exports = function(){
  var phase = suncalc.getMoonIllumination(new Date()).phase;

  return phases[stepPhase(phase)];
};


function test() {
  for (var i = 1; i <= 31; i++) {
    var phase = suncalc.getMoonIllumination(new Date(2014, 9, i)).phase;
    console.log("2014-09-" + i, phases[stepPhase(phase, 1)]);
  };
}
