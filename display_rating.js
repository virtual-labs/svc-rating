import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
export class DisplayRating extends LitElement {
  static get styles() {
    return [
      Fontawesome,
      css`
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
    };
  }
  set rating(newRating) {
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
  get fullStars() {
    return this._fullStars;
  }
  get halfStars() {
    return this._halfStars;
  }
  set fullStars(newVal) {
    this._fullStars = newVal;
    this.requestUpdate();
  }
  set halfStars(newVal) {
    this._halfStars = newVal;
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
  constructor() {
    super();
    this._numberOfStars = 5;
    this._title = "Rating";
    this._rating = 5;
    this._roundRating = Math.round(2 * this._rating) / 2;
    if (this._roundRating % 1 === 0) {
      this._fullStars = this._roundRating;
      this._halfStars = 0;
    } else {
      this._fullStars = Math.floor(this._roundRating);
      this._halfStars = 1;
    }
    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.type = "text/css";
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    document.head.appendChild(fa);
  }
  render() {
    const stars = [];
    for (let i = 0; i < this._fullStars; i++) {
      stars.push(html`<span class="fa fa-star checked"></span>`);
    }
    for (let i = 0; i < this._halfStars; i++) {
      stars.push(html`<span class="fa fa-star-half checked"></span>`);
    }
    console.log(this._numberOfStars, this._fullStars, this._halfStars);
    for (
      let i = 0;
      i < this._numberOfStars - this._fullStars - this._halfStars;
      i++
    ) {
      stars.push(html`<span class="fa fa-star-o"></span>`);
    }
    console.log(stars);
    return html`<div>
      <h3>${this.title}</h3>
      <div class="star-div">${stars}</div>
    </div>`;
  }
}

customElements.define("display-rating", DisplayRating);
