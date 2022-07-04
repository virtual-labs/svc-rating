import { LitElement, html, css } from "lit";

export class RatingElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    }
    .star-div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0;
    }
    input {
      display: none;
    }

    label::before {
      content: "\u2606";
      position: relative;
      top: 0px;
      line-height: 26px;
    }
    label {
      width: 30px;
      height: 30px;
      font-family: Verdana;
      font-size: 30px;
      color: orange;
      transition: 0.2s ease;
    }
    label:hover {
      color: #ffb931;
      transition: 0.2s ease;
      cursor: pointer;
    }
    input:checked ~ label::before {
      content: "\u2605";
    }
  `;

  static get properties() {
    return {
      checked: {
        type: Number,
      },
      values: {
        type: Array,
      },
      ids: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.values = [5, 4, 3, 2, 1];
    this.ids = ["star-5", "star-4", "star-3", "star-2", "star-1"];
    this.checked = 0;
  }

  render() {
    return html`
      <div class="star-div">
        
        ${this.values.map(
          (value, index) =>
            html`
              <input type="radio" name="stars" id=${this.ids[index]} />
              <label for=${this.ids[index]}></label>
            `
        )}
      </div>
    `;
  }
}

customElements.define("rating-element", RatingElement);
