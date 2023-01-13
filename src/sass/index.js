document.addEventListener('click', blurHandler);

let ServiceButtonActive = [];

function blurHandler(event) {
  if (!event.target.classList.contains('service__button')) {
    return;
  }

  let selectedButton = event.target.closest('button');
  selectedButton.classList.toggle('active');

  if (
    Object.values(document.querySelectorAll('.service__button.active')).length >
    2
  ) {
    ServiceButtonActive[0].classList.remove('active');

    for (evr of document.querySelectorAll('.card')) {
      if (evr.classList.contains(ServiceButtonActive[0].classList[1])) {
        evr.classList.add('blured');
      }
    }

    ServiceButtonActive.shift();
  }

  let buttonClass = selectedButton.classList[1];

  function blurCard() {
    for (evr of document.querySelectorAll('.card')) {
      evr.classList.add('blured');
      if (evr.classList.contains(buttonClass)) {
        evr.classList.remove('blured');
      }
    }
  }

  if (document.querySelector('.blured')) {
    for (evr of document.querySelectorAll('.card')) {
      if (evr.classList.contains(buttonClass)) {
        evr.classList.toggle('blured');
      }
    }
  } else {
    blurCard();
  }

  if (document.querySelector(`.${buttonClass}`).classList.contains('active')) {
    ServiceButtonActive.push(document.querySelector(`.${buttonClass}`));
  }

  if (
    !Object.values(document.querySelectorAll('.service__button.active')).length
  ) {
    for (evr of document.querySelectorAll('.card')) {
      evr.classList.remove('blured');
    }
    ServiceButtonActive = [];
  }
}

function mobileMenu() {
  let navOption = document.querySelector('.nav-list');
  navOption.classList.toggle('activeMobileMenu');
}

document.addEventListener('click', function (event) {
  if (
    event.target != document.querySelector('.nav-list') &&
    event.target != document.querySelector('.nav-gamburg-icon')
  ) {
    document.querySelector('.nav-list').classList.remove('activeMobileMenu');
  }
});

document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('nav-list__link')) {
    return;
  }

  setTimeout(() => {
    document.querySelector('.nav-list').classList.remove('activeMobileMenu');
  }, 100);
});

document.addEventListener('click', function (event) {
  let cityButton = event.target.closest('button');
  if (!event.target.classList.contains('contactus__button')) return;

  if (
    document.querySelector('.contactus__button').innerHTML.match(/^City/) &&
    document
      .querySelector('.contactus__dropdown-content')
      .classList.contains('activeCitySelect')
  ) {
    cityButton.classList.remove('cityButtonHovered');
    document
      .querySelector('.contactus__dropdown-content')
      .classList.remove('activeCitySelect');
    cityButton.querySelector('img').src = 'src/assets/icons/arrow_down2.svg';
    return;
  }

  document.querySelector('.contactus__city-selected-frame').style.display =
    'none';

  document
    .querySelector('.contactus__dropdown-content')
    .classList.toggle('activeCitySelect');

  if (
    !document
      .querySelector('.contactus__dropdown-content')
      .classList.contains('activeCitySelect') &&
    cityButton.textContent != 'City'
  ) {
    document.querySelector('.contactus__city-selected-frame').style.display =
      'block';
  }
  cityButton.classList.add('cityButtonHovered');

  cityButton.querySelector('img').src = 'src/assets/icons/drop_btn_up.svg';
});

class City {
  constructor(name, phone, officeAdress) {
    this.name = name;
    this.phone = phone;
    this.officeAdress = officeAdress;
  }
}
let yonkers = new City('Yonkers, NY', '+1	914	678 0003', '511 Warburton Ave');
let canandaigua = new City(
  'Canandaigua, NY',
  '+1	585	393 0001',
  '151 Charlotte Street'
);
let sherrill = new City('Sherrill, NY', '+1	315	908 0004', '14 WEST Noyes BLVD');
let newYork = new City('New York City', '+1	212	456 0002', '9 East 91st Street');

let cityArray = [yonkers, canandaigua, sherrill, newYork];

document.addEventListener('click', function (event) {
  let cityButton = event.target.closest('li');

  if (
    !cityButton ||
    !event.target.closest('li').classList.contains('contactus__city-link')
  ) {
    return;
  }

  document
    .querySelector('.contactus__dropdown-content')
    .classList.remove('activeCitySelect');

  document.querySelector('.contactus__button').innerHTML = document
    .querySelector('.contactus__button')
    .innerHTML.replace(/.+\</, `${cityButton.querySelector('a').innerHTML}<`);

  document.querySelector('.contactus__city-selected-frame').style.display =
    'block';

  let regEx = document
    .querySelector('.contactus__button')
    .innerHTML.match(/\w\w\w/)[0]
    .toLowerCase();

  let currentCity = cityArray.filter(
    (a) => a.name.match(/\w\w\w/)[0].toLowerCase() == regEx
  )[0];

  cityInfo.innerHTML = currentCity.name;
  phoneInfo.innerHTML = currentCity.phone;
  adressInfo.innerHTML = currentCity.officeAdress;

  if (document.documentElement.offsetWidth < 700) {
    document.querySelector('.contactus__woman-img').style.display = 'none';
  }
});

document.addEventListener('click', function (event) {
  if (
    event.target.closest('button') &&
    event.target.closest('button').classList.contains('call-us')
  ) {
    let telNumber = phoneInfo.textContent;
    window.open(`tel:${telNumber}`, '_self');
  } else {
    return;
  }
});

let activatedPriceButtons = [];

document.addEventListener('click', function (event) {
  let button = event.target.closest('.price__button');

  if (event.target.closest('.price__order-button')) {
    window.open(`#contact`, '_self');
    return;
  }

  if (!button || !button.classList.contains('price__button')) return;

  for (evr of document.querySelectorAll('.price__details')) {
    evr.classList.remove('active-price-details');
  }

  for (evr of document.querySelectorAll('.price__accord-button')) {
    evr.src = 'src/assets/icons/arrow_down.svg';
  }

  button.classList.add('activePrice');

  button.querySelector('.price__details').classList.add('active-price-details');

  if (activatedPriceButtons.length > 0) {
    activatedPriceButtons[0].classList.remove('activePrice');
    activatedPriceButtons.shift();
    button
      .querySelector('.price__details')
      .classList.remove('active-price-details');
    button.querySelector('img').src = 'src/assets/icons/arrow_down.svg';
    activatedPriceButtons = [];
  }

  if (button.classList.contains('activePrice')) {
    activatedPriceButtons.push(button);
    button
      .querySelector('.price__details')
      .classList.add('active-price-details');
    button.querySelector('img').src = 'src/assets/icons/drop_btn_up_prices.svg';
  }
});
