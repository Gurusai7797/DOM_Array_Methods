// my assumption

//IF you use normal function then data goes only inside the fetch like we need to uuse every thing in  "then" so use async

// async function usr() {
//   // fetch('https://randomuser.me/api')
//   //   .then(function (res) {
//   //     console.log(res);
//   //     return res.json();
//   //   })
//   //   .then((data) => console.log(data.results[0].name.first));
//   // OR
//   // const res = await fetch('https://randomuser.me/api');
//   // const data = await res.json();
//   // userArr.push(
//   //   data.results[0].name.first + ' ' + data.results[0].name.last + '\n'
//   // );
//   // main.innerText = userArr;

//   // console.log(data.results[0].name.first + ' ' + data.results[0].name.last);

//   // or
//   // arFn = [];
//   // arLn = [];

//   // for (let i = 0; i <= 10; i++) {
//   //   const res = await fetch('https://randomuser.me/api');
//   //   const data = await res.json();
//   //   arFn[i] = data.results[0].name.first;
//   //   arLn[i] = data.results[0].name.last;
//   // }
//   // console.log(arFn, arLn);
//   // arFn.forEach((item) => console.log(item));
//   // arLn.forEach((item) => console.log(item));
// }

// userArr = [];
// addUser.addEventListener('click', usr);

const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

// fetch random user & money
let userData = [];

user();
user();
user();

async function user() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const newUser = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// to double money

function doubleMoney() {
  userData = userData.map((item) => {
    return { ...item, money: item.money * 2 };
  });

  updateDOM();
}

// to sort money

function moneySort() {
  userData.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Add new obj to data arr
function addData(obj) {
  userData.push(obj);
  updateDOM();
}

// to filtering (showMillionires)

function showMil() {
  userData = userData.filter((item) => item.money > 1000000);
  updateDOM();
}

// to calculate wealth

function totalCal() {
  const totalWealth = userData.reduce((acc, item) => (acc += item.money), 0); // to depend on to acc
  console.log(formatMoney(totalWealth));
  const wealthElement = document.createElement('div');

  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;

  main.appendChild(wealthElement);
}

// to update dom

function updateDOM(providedData = userData) {
  //clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  // forEach(item, index, array)
  //here createEllement is used to creat a new html tag
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person'); // to add a class "person" to the div tag
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Liseners

addUser.addEventListener('click', user);
double.addEventListener('click', doubleMoney);
sort.addEventListener('click', moneySort);
showMillionires.addEventListener('click', showMil);
calculateWealth.addEventListener('click', totalCal);

// function user() {
//   fetch('https://randomuser.me/api')
//     .then((res) => res.json())
//     .then((data) => {
//       userData.push(
//         data.results[0].name.first + ' ' + data.results[0].name.last
//       );
//       return userData;
//     })
//     .then((d) => console.log(d));
//   //...............then's go on not confortable use async function
// }
