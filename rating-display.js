import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element/lit-element.js?module";

const googleApiKey = "AIzaSyAJ9pMGaHcmOiNeHEXQLGCiJcr5k3TV4F8";
const timeLimit = 4 * 60 * 60 * 1000;
export class DisplayRating extends LitElement {
  static get styles() {
    return [
      css`
        .star-images {
          width: 25px;
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
  parse_local_storage_object(object, key) {
    // function to parse the local storage object and return the rating data
    //  returns a dictionary with timeFetched and rating
    if (object === null) {
      return null;
    }
    const parsedObject = JSON.parse(object);
    if (parsedObject[key] === undefined) {
      return null;
    }

    const newObject = {
      timeFetched: parsedObject.timeFetched,
      rating: parsedObject["rating"][key],
    };
    return newObject;
  }
  async get_rating() {
    //  get the rating data from the experiment from local storage
    console.log("Getting the rating....", this.columnValue);
    const key = this.columnValue;

    const dataObject = this.parse_local_storage_object(
      localStorage.getItem("vl_data"),
      key
    );

    const rating = localStorage.getItem(this.columnValue);
    // see the time threshold for the rating data
    const timeFetched = localStorage.getItem("timeFetched");
    const currentTime = new Date().getTime();
    //  caching
    if (
      dataObject !== null &&
      dataObject.rating !== null &&
      dataObject.rating !== undefined &&
      timeFetched.timeFetched !== null &&
      timeFetched.timeFetched !== undefined &&
      currentTime - timeFetched < timeLimit
    ) {
      // set the rating data
      this.rating = dataObject.rating;
      return;
    } else {
      // need to make a request to the backend and save the data into the local storage of the browser
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetID}/values/${this.sheetName}!A:E?key=${googleApiKey}`;
      try {
        console.log("Fetching the data");
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        console.log(data);
        const values = data.values;
        //  get the column index of the column name
        const colIndex = values[0].indexOf(this.columnName);
        const ratingIndex = values[0].indexOf("Rating");
        console.log("Col Index is ", colIndex);
        // go over the entire fetched data and cache it for next reference
        const vl_data = {};
        vl_data["rating"] = {};

        for (let i = 1; i < values.length; i++) {
          vl_data["rating"][values[i][colIndex]] = values[i][ratingIndex];
          if (values[i][colIndex] === this.columnValue) {
            // set the rating for the current display
            this.rating = values[i][ratingIndex];
          }
        }
        //  update the time fetched
        vl_data["timeFetched"] = new Date().getTime();
        localStorage.setItem("vl_data", JSON.stringify(vl_data));
      } catch {
        this.rating = 0;
        console.log("Something went wrong");
      }
    }
  }
  // as soon as the web component is loaded into the browser window
  // the connectedCallback() method is called
  connectedCallback() {
    super.connectedCallback();
    console.log("Connected Callback");
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
  get columnValue() {
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
    fa.href = "https://unpkg.com/fontawesome@5.6.3/index.js";
    document.head.appendChild(fa);
  }
  render() {
    console.log(this._fullStars, this._halfStars);
    const stars = [];
    for (let i = 0; i < this._fullStars; i++) {
      // stars.push(html`<span class="fa fa-star checked"></span>`);
      stars.push(html`<img src="http://localhost:5500/images/star.svg" class="star-images"></img>
      `);
    }
    for (let i = 0; i < this._halfStars; i++) {
      // stars.push(html`<span class="fa fa-star-half"></span>`);
      stars.push(
        html`<img src="http://localhost:5500/images/half-star.svg" class="star-images"></img>`
      );
    }
    console.log(this._numberOfStars, this._fullStars, this._halfStars);
    for (
      let i = 0;
      i < this._numberOfStars - this._fullStars - this._halfStars;
      i++
    ) {
      stars.push(
        html`<img style="width:25px;height:23.84px;" src="http://localhost:5500/images/empty-star.svg" class="star-images"></img>`
      );
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
