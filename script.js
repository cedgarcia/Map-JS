'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
  constructor() {}
  
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        alert('Could not get your position');
      });
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    // DISPLAY MAP
    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // HANDLE CLICK ON MAP
    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    });

    console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
  }

  _showForm() {}
  _toggleElevetionField() {}
  _newWorkout() {}
}

form.addEventListener('submit', function () {
  // e.preventDefault();

  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';

  const { lat, lng } = mapEvent.latlng;
  // MARKER THAT ADDS TO THE MAP
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});

// const Person = function (firstname, lastname) {
//   this.firstname = firstname;
//   this.lastname = lastname;
// };
// const ced = new Person('Ced', 'Garcia');
// console.log(ced);
// console.log(__proto__);
// console.log(this);
// console.log(Object);
