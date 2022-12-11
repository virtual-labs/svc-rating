  import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element/lit-element.js?module";

// import Fontawesome from "lit-fontawesome";
import "./config";
export class DisplayRating extends LitElement {
  static get styles() {
    return [
      // Fontawesome,
      css`
        .star-images{
        
          width: 25px;
          float: left;
          overflow: hidden;
        }
        .fa::before {
          color: #ffb931;
        }
        .fa-star-o {
          color: #ffb931;
        }
      

      `,
    ];
  }

  static get properties() {
    return {
      numberOfStars: {
        type: Number,
      },
      rating: {
        type: Number,
      },
      roundRating: {
        type: Number,
      },
      title: {
        type: String,
      },
      fullStars: {
        type: Number,
      },
      halfStars: {
        type: Number,
      },

      //  the sheet parameters
      spreadsheetID: {
        // the sheet ID to be referenced for the fetching the rating data
        type: String,
      },
      sheetName: {
        // the sheet Name to be referenced in the main spreadsheet for the fetching the rating data
        type: String,
      },
      columnName: {
        // the column name to be referenced for the fetching the rating data
        type: String,
      },
      columnValue: {
        // the column value to be referenced for the fetching the rating data
        // should be a unique identifier
        // lab_name for lab rating
        // exp_name for experiment rating
        type: String,
      },
    };
  }
  // function too fetch the rating data from the google sheet

  async get_rating() {
    //  get the rating data from the experiment from local storage
    const rating = localStorage.getItem(this.columnValue);
    // see the time threshold for the rating data
    const timeFetched = localStorage.getItem("timeFetched");
    const currentTime = new Date().getTime();
    //  caching
    if (
      rating !== null &&
      timeFetched !== null &&
      currentTime - timeFetched < timeLimit
    ) {
      // set the rating data
      this.rating = rating;
      return;
    } else {
      // need to make a request to the backend and save the data into the local storage of the browser
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetID}/values/${this.sheetName}!A:E?key=${googleApiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const values = data.values;
        //  get the column index of the column name
        const colIndex = values[0].indexOf(this.columnName);
        const ratingIndex = values[0].indexOf('Rating');
        console.log("Col Index is ", colIndex);
        // go over the entire fetched data and cache it for next reference 
        for (let i = 1; i < values.length; i++) {
          localStorage.setItem(values[i][colIndex], values[i][ratingIndex]);
          
          if (values[i][colIndex] === this.columnValue) {
            // set the rating for the current display
            this.rating = values[i][ratingIndex];
          }
        }
        //  update the time fetched
        localStorage.setItem("timeFetched", new Date().getTime());
      } catch {
        console.log("Something went wrong");
      }
    }
  }
  // as soon as the web component is loaded into the browser window
  // the connectedCallback() method is called
  connectedCallback() {
    super.connectedCallback();
    this.get_rating(this.experimentURL, this.experimentName);
  }
  // get and set methods for the properties
  get sheetName() {
    return this._sheetName;
  }
  set sheetName(name) {
    this._sheetName = name;
    this.requestUpdate();
  }
  set spreadsheetID(id) {
    this._spreadsheetID = id;
    this.requestUpdate();
  }
  get spreadsheetID() {
    return this._spreadsheetID;
  }
  set columnName(name) {
    this._columnName = name;
    this.requestUpdate();
  }
  get columnName() {
    return this._columnName;
  }
  set columnValue(value) {
    this._columnValue = value;
    this.requestUpdate();
  }
  get columnName() {
    return this._columnValue;
  }
  get fullStars() {
    return this._fullStars;
  }
  set fullStars(newVal) {
    this._fullStars = newVal;
    this.requestUpdate();
  }
  get halfStars() {
    return this._halfStars;
  }
  set halfStars(newVal) {
    this._halfStars = newVal;
    this.requestUpdate();
  }
  set rating(newRating) {
    console.log("New Rating is ", newRating);
    this._rating = newRating;
    this._roundRating = Math.round(2 * newRating) / 2;
    if (this._roundRating % 1 === 0) {
      this._fullStars = this._roundRating;
      this._halfStars = 0;
    } else {
      this._fullStars = Math.floor(this._roundRating);
      this._halfStars = 1;
    }
    console.log(this._fullStars, this._halfStars);
    this.requestUpdate();
  }
  get rating() {
    return this._rating;
  }
  set title(newTitle) {
    this._title = newTitle;
  }
  get title() {
    return this._title;
  }
  get numberOfStars() {
    return this._numberOfStars;
  }
  set numberOfStars(newVal) {
    this._numberOfStars = newVal;
    this.requestUpdate();
  }
  //  constructor
  constructor() {
    super();
   this._numberOfStars = 5;
  if (this._roundRating % 1 === 0) {
      this._fullStars = this._roundRating;
      this._halfStars = 0;
    } else {
      this._fullStars = Math.floor(this._roundRating);
      this._halfStars = 1;
    }
    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.type = "text/javascript";
    fa.href =
      "https://unpkg.com/fontawesome@5.6.3/index.js";
    document.head.appendChild(fa);
  }
  render() {
    console.log(this._fullStars, this._halfStars);
    const stars = [];
    for (let i = 0; i < this._fullStars; i++) {
      // stars.push(html`<span class="fa fa-star checked"></span>`);
      stars.push(html`<img src="./images/star.svg" class="star-images"></img>
      `)
    }
    for (let i = 0; i < this._halfStars; i++) {
      // stars.push(html`<span class="fa fa-star-half"></span>`);
      stars.push(html`<img src="./images/half-star.svg" class="star-images"></img>`)
    }
    console.log(this._numberOfStars, this._fullStars, this._halfStars);
    for (
      let i = 0;
      i < this._numberOfStars - this._fullStars - this._halfStars;
      i++
    ) {
      stars.push(html`<span class="fa fa-star-o"></span>`);
      // stars.push(html`<input name="star" type="radio"></input>`)
    }
    console.log(this.rating);
    return html`<div>
      <h3>${this.title}</h3>
      <div class="star-div">${stars}</div>
    </div>`;
  }
}

customElements.define("rating-display", DisplayRating);
