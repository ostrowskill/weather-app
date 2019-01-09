// clock

const date = new Date();
const hour = date.getHours();

//const hour = 11;

// check daytime
const container = document.querySelector('.container');
let daytime = document.querySelector('.cycle');

if (hour > 16) {
    container.classList.add('night');
    daytime.src = './img/moon.png';
} else {
    container.classList.add('day');
    daytime.src = './img/sun.png';
}


// display data variables
const temp__div = document.querySelector('.temp-value');
const hecto__div = document.querySelector('.hecto-value');
const wind__div = document.querySelector('.wind-value');

// user location input
const city__input = document.querySelector('.city-input');
let user__location = document.querySelector('.city-input').value;

// weather API key
const key_one = 'bedc16930b38400ea657c392148328db';
const key_two = '57a4e73bffea4aa4bbebff4e174272c3';

let weather__api = `https://api.weatherbit.io/v2.0/history/daily?city=${user__location}&start_date=2019-01-04&end_date=2019-01-05&key=${key_two}`;



// logic

function get(url) {
    return new Promise((resolve, rejects) => {
        const xhtml = new XMLHttpRequest;
        xhtml.open('GET', url, true);
        xhtml.onload = () => {
            if (xhtml.status === 200) {
                resolve(JSON.parse(xhtml.response))
            } else {
                rejects(xhtml.statusText);
            }
        }
        xhtml.send();
    });
}



const data = get(weather__api);

data.then(
    (resolve) => {
        const {temp, pres, wind_spd} = resolve.data[0];

        temp__div.innerHTML = Math.floor(temp);
        hecto__div.innerHTML = pres;
        wind__div.innerHTML = wind_spd;
    }
).catch(error => console.log(error));

// event handler
city__input.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        user__location = this.value;
        const new__api = `https://api.weatherbit.io/v2.0/history/daily?city=${user__location}&start_date=2019-01-04&end_date=2019-01-05&key=${key_two}`;
        
        console.log(new__api);

        const data = get(new__api);
        data.then(
            (resolve) => {
                const {temp, pres, wind_spd} = resolve.data[0];

                temp__div.innerHTML = Math.floor(temp);
                hecto__div.innerHTML = pres;
                wind__div.innerHTML = wind_spd;

            }
        ).catch(
            error => console.log(error)
        )
    }
});