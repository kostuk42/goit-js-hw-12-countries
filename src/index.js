// import "@pnotify/core/dist/PNotify.css";
// import "@pnotify/core/dist/BrightTheme.css";
// import "@pnotify/mobile/dist/PNotifyMobile.css";
// import "@pnotify/countdown/dist/PNotifyCountdown.css";
// import { alert } from '@pnotify/core';
import './style.css';

import fetchCountries from './fetchCountries.js';
import { debounce } from 'lodash';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

const refs = {
    country: document.body.querySelector('.country'),
    input: document.body.querySelector('.input'),
    countries: document.body.querySelector('.countries'),
    name: document.body.querySelector('.name'),
    capital: document.body.querySelector('.capital'),
    population: document.body.querySelector('.population'),
    languages: document.body.querySelector('.languages'),
    flag: document.body.querySelector('.flag'),
}


const search = () => {
    refs.countries.innerHTML = null;
    refs.country.style.display = "none";
    let value = refs.input.value;
    if(!value) return
    let promiseCountries = fetchCountries(value);
    promiseCountries.then(list => {
        console.log(list)
        if (list.length === 0) {
             alert({
              title: "No matches found.",
              text: "Please enter more specific query!",
              type: 'error',
              delay: 3000,
              hide: true,
             });
            return
        }
        if (list.length > 10) {
            alert({
             title: "Too many matches found",
             text: "Please enter a more specific query!",
             type: 'error',
             delay: 3000,
             hide: true,
            });
            return
        }
        if (list.status === 404) {
            alert({
             title: "I don't know  such country.",
             text: "Please ask something more simple.",
             type: 'error',
             delay: 3000,
             hide: true,
            });
            return
        }
        if (list.length >= 2 && list.length <= 10) {
            list.forEach((country) => {
                refs.countries.insertAdjacentHTML('afterbegin', `<li>${country.name}</li>`);
                })
                return
        }
        if (list.length === 1) {
            refs.country.style.display = "block";
            refs.name.textContent = list[0].name;
            refs.capital.textContent = list[0].capital;
            refs.population.textContent = list[0].population;
            refs.flag.src = list[0].flag;
            refs.name.textContent = list[0].name;
            refs.languages.innerHTML = null;
            list[0].languages.forEach(lang => refs.languages.insertAdjacentHTML('afterbegin', `<li>${lang.name}</li>`));
        }
            
               
    }).catch(() => {
      alert({
        title: "Error",
        text: "Something went wrong",
        type: 'error',
        delay: 3000,
        hide: true,
      });
    });

}

refs.input.addEventListener('input', debounce(search, 500));