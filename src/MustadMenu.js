/* eslint max-classes-per-file: 0 */

import { html, css, LitElement } from 'lit';

const STORAGE_PREFIX = 'MUSTAD_MENU';
const WEEKDAYS = [
  'Søndag',
  'Mandag',
  'Tirsdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lørdag',
];
const RESTAURANTS = {
  kafekroken: 'https://mustadkantine.no/kafekroken',
  brightcafe: 'https://mustadkantine.no/brightcafe',
};

/**
 * Returns the norwegian name of the day of the week represented by "day".
 * @param {day} day of the week from 0 to 6 where 0 is sunday.
 * @returns returns the name of the day of the week
 */
function getWeekDayFromNumber(day) {
  return WEEKDAYS[day];
}

function getDayOfTheWeek() {
  const now = new Date();
  return getWeekDayFromNumber(now.getDay());
}

// function getWeekNumberFromDate(currentDate) {
//   let startDate = new Date(currentDate.getFullYear(), 0, 1);
//   let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
//   let weekNumber = Math.ceil(days / 7);
//   return weekNumber;
// }

/*
  FIRST PART TAKEN FROM::: https://github.com/jjyepez/minimal-js-scraper extractMenus is a custon new method for this component
  Name   : minimal-js-scraper
  version: v0.1b
  author : @jjyepez
  date   : nov-24-2018
  license: MIT
*/
class Scraper {
  constructor(src = null, removeCRLF = false) {
    // --- this.BASE_CORS = "https://cors-escape.herokuapp.com/"
    // --- this.BASE_CORS = "https://crossorigin.me/"
    // this.BASE_CORS = "https://cors-anywhere.herokuapp.com/"
    // this.BASE_CORS = "https://cors.io/?"
    // works in but problem with CDN (HTTP only cookie)
    // this.BASE_CORS = 'https://thingproxy.freeboard.io/fetch/';
    // this.BASE_CORS = 'https://folk.ntnu.no/carlosvm/proxy/index.php?url=';
    // this.BASE_CORS = 'https://folk.ntnu.no/carlosvm/proxy/proxy.php?url=';
    this.BASE_CORS = '';
    this.urlSrc = null;
    this.removeCRLF = removeCRLF;
    if (src) this.setSrc(src);
  }

  setSrc(src) {
    this.urlSrc = `${this.BASE_CORS}${src}`;
  }

  async getHTML() {
    // const headers = {};

    // const src = this.urlSrc;
    // const rsp = await fetch(src, {
    //   method: 'GET',
    //   mode: 'cors',
    // });

    const data = {
      cors: this.urlSrc, // endpoint URL
      method: 'POST', // should be the same with endpoint request type
      // endpoint data comes
    };

    // proxy
    const src = 'https://folk.ntnu.no/carlosvm/proxy/proxy.php';
    const rsp = await fetch(src, {
      method: 'POST',
      crossDomain: true,
      body: JSON.stringify(data),
    });
    const rslt = await rsp.text();
    // if( this.removeCRLF ) rslt = rslt.replace(/\n/g,'').replace(/\r/g,'')
    this.scrapedHTML = await rslt;
    return rslt;
  }

  async extractMenus() {
    const htmlCode = await this.getHTML();

    // The html structure of Mustad menus is very unpredictable
    // the following code is not the best way of implementing it. Not reliable and hard to maintain.
    // however, it is a simple way of doing it fast for testing purposes.
    const result = htmlCode
      .match(/<body>(.*?)<\/body>/g)
      .map(val => val.replace(/<\/?body>/g, ''));

    // parsed page stored in an HTML body element.
    // Goal: being able to use queryselectors since it will be easier to change in the future if the structure is modified.
    const body = document.createElement('body');
    body.innerHTML = result;

    // children is HTMLCollection, not Array...
    const menuContainer = body.querySelector(
      '.maincontent section .row .col-12'
    );
    let strRawMenus = menuContainer.innerText; // contain plain text with all the menus (if found)

    // Find all menus
    let i;
    const menus = {};
    for (i = 5; i >= 1; i -= 1) {
      const dayMenu = strRawMenus.slice(
        strRawMenus.indexOf(WEEKDAYS[i]),
        strRawMenus.length - 1
      );
      strRawMenus = strRawMenus.replace(dayMenu, '');
      // store/hash day
      // Tirsdag LunsjFiskekarbonade med råkost og kokte poteter.kr. 57,-/ 95,- Allergener: Fisk, Laktose
      // the string could be processed to remove the first part "day+lunsj". However, this is not constant all the weeks. Therefore, ignored from now.
      menus[WEEKDAYS[i]] = dayMenu;
    }
    return menus;
  }
}

export class MustadMenu extends LitElement {
  static get styles() {
    return css`
      :host {
        font-size: var(--mustad-menu-font-size, 1rem);
        font-family: var(
          --mustad-menu-font-family,
          'Gill Sans',
          'Gill Sans MT',
          Calibri,
          'Trebuchet MS',
          sans-serif
        );

        color: var(--mustad-menu-text-color, #000);
        background-color: var(--mustad-menu-background-color, #fff);
      }

      :host .menu-container {
        display: grid;
        padding: var(--mustad-menu-padding, 1.5rem);

        grid-template-rows: var(
          --mustad-menu-grid-template-rows,
          repeat(3, auto)
        );
        grid-template-columns: var(
          --mustad-menu-grid-template-columns,
          1fr min-content
        );

        align-items: var(--mustad-menu-align-items, center);
      }

      :host .menu-container .title {
        font-weight: var(--mustad-menu-title-font-weight, bold);
        font-size: var(--mustad-menu-title-font-size, 0.8rem);
        grid-area: var(--mustad-menu-title-grid-area, 1 / 1 / span 1 / span 2);
      }

      :host .menu-container .dayOfWeek {
        font-weight: var(--mustad-menu-day-font-weight, bold);
        font-size: var(--mustad-menu-day-font-size, 1.5rem);
        grid-area: var(--mustad-menu-day-grid-area, 2 / 1 / span 1 / span 2);
      }

      :host .menu-container .menu {
        grid-area: var(--mustad-menu-menu-grid-area, 3 / 1 / span 1 / span 2);
      }

      :host .menu-container button {
        grid-area: var(--mustad-menu-button-grid-area, 1 / 2 / span 1 / span 1);
        cursor: pointer;
      }

      :host .error {
        color: var(--mustad-menu-error-color, #cc0000);
      }
    `;
  }

  static get properties() {
    return {
      day: { type: String },
      restaurant: { type: String },
      kafekroken: { type: Object },
      brightcafe: { type: Object },
    };
  }

  constructor() {
    super();
    this.restaurant = 'kafekroken';
    this.day = getDayOfTheWeek();
  }

  connectedCallback() {
    super.connectedCallback();
    this.__fetchMenuAndProcess();
  }

  updated(changedProperties) {
    if (changedProperties.has('restaurant')) {
      this.__fetchMenuAndProcess();
    }

    // No need to call any other method here.
  }

  __fetchMenuAndProcess() {
    let error = '';
    const today = new Date();
    // let weekNumber = getWeekNumberFromDate(today);

    const weekDay = this.day ? this.day : getDayOfTheWeek();

    // 1 VALIDATIONS
    // ---------------
    // check day of the week from HTML attribute (day exists?)
    if (
      WEEKDAYS.findIndex(
        element => element.toLowerCase().trim() === weekDay.toLowerCase().trim()
      ) < 0
    ) {
      error = `${weekDay}: dagikke funnet`;
    }

    // No menu Sunday or Saturday.
    if (
      weekDay.toLowerCase().trim() === WEEKDAYS[0].toLowerCase().trim() ||
      weekDay.toLowerCase().trim() === WEEKDAYS[6].toLowerCase().trim()
    ) {
      error = `${weekDay}: dag ikke funnet`;
    }

    // check if restaurant exists
    if (!RESTAURANTS[this.restaurant]) {
      error = `${this.restaurant} restauranten er ikke gyldig`;
    }

    if (error) {
      this.error = error;
      return;
    }

    // 2 check if menu is in cache. Otherwise, fetch
    // ---------------
    let fetchNew;
    try {
      const timeCached = localStorage.getItem(
        `${STORAGE_PREFIX}_${this.restaurant}__time`
      );
      const strDate = timeCached ? JSON.parse(timeCached) : null;
      // check if date is valid
      const cachedDate = strDate ? Date.parse(strDate) : null;
      // compare if cached the same day. Otherwise, fetch again.
      fetchNew =
        cachedDate !== null && !Number.isNaN(cachedDate)
          ? new Date(strDate).toDateString() !== today.toDateString()
          : true;

      // if we want to use the cached version, we retrieve the date
      if (!fetchNew) {
        const menuCached = localStorage.getItem(
          `${STORAGE_PREFIX}_${this.restaurant}`
        );
        const menu = menuCached ? JSON.parse(menuCached) : null;
        this[this.restaurant] = menu;
      }
    } catch (e) {
      // console.error(e instanceof SyntaxError);
      // console.log(e.message);
      fetchNew = false;
    }

    if (fetchNew) {
      this.__fetchNow();
    }
  }

  __fetchNow() {
    const scraper = new Scraper(RESTAURANTS[this.restaurant]);
    scraper.extractMenus().then(data => {
      this[this.restaurant] = data;
      const now = new Date();
      // update localStorage
      localStorage.setItem(
        `${STORAGE_PREFIX}_${this.restaurant}__time`,
        JSON.stringify(now.toISOString())
      );
      localStorage.setItem(
        `${STORAGE_PREFIX}_${this.restaurant}`,
        JSON.stringify(this[this.restaurant])
      );
    });
  }

  render() {
    let menu = '...Loading';
    if (this[this.restaurant]) {
      menu = this[this.restaurant][this.day];
    }

    if (this.error) {
      return html`
        <div class="menu-container">
          <div class="error">${this.error}</div>
        </div>
      `;
    }

    return html`
      <div class="menu-container">
        <div class="title">${this.restaurant}</div>
        <div class="dayOfWeek">${this.day}</div>
        <div class="menu ${menu ? '' : 'error'}">
          ${menu || 'Error: meny ikke funnet!'}
        </div>
        <button title="refresh" @click=${this.__fetchNow}>↺</button>
      </div>
    `;
  }
}
