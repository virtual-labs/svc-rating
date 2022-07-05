import { LitElement, css, html } from "lit-element";
export class RatingModal extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: Arial, Helvetica, sans-serif;
      }

      #submit-button,
      #rating-button,
      #cancel-button {
        border: none;
        color: #ffffff;
        background-color: #288ec8;
        text-align: center;
        font-size: 1.05rem;
        border-radius: 1em;
        padding: 0.6em 1.2em;
        cursor: pointer;
      }
      #cancel-button {
        background-color: grey;
      }
      #cancel-button:hover {
        background-color: #888;
      }

      #rating-button:hover,
      #submit-button:hover {
        background-color: #a9a9a9;
      }

      #rating-button {
        margin-top: 1rem;
      }
      h1 {
        margin-bottom: 0rem;
        margin-top: 1rem;
      }
      .modal {
        display: none;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        position: relative;
        top: 1px;
        right: 1px;
        background-color: #fefefe;
        padding: 20px;
        border: 1px solid #888;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        border-radius: 14px;
      }
      .close {
        color: #aaaaaa;
        font-size: 28px;
        font-weight: bold;
      }
      .fa {
        color: orange;
      }
      .rating-div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        margin: 20px;
      }
      .rating-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .rating-header > img {
        height: 48px;
      }
      .rating-button {
        position: absolute;
        top: 100px;
        right: 100px;
      }
      #submit-button {
        margin-right: 1rem;
      }

      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
    `;
  }
  open() {
    this.shadowRoot.querySelector(".modal").style.display = "flex";
  }
  close() {
    this.shadowRoot.querySelector(".modal").style.display = "none";
  }

  handleClick() {
    console.log("OK");
    this.dispatchEvent(new CustomEvent("button-click"));
    this.close();
  }
  static properties = {
    text: { type: String },
    experiment_rating: { type: Number },
    lab_rating: { type: Number },
  };
  createRating(elementId, rating) {
    const element = this.shadowRoot.querySelector(elementId);
  }
  constructor() {
    super();
    this.title = "Rating";
  
    this.experiment_rating = 4.5;
    this.lab_rating = 4.5;
  }
  render() {
    return html`
      <div class="rating-page">
        <div class="rating-lab">
          <h3>Lab Rating</h3>
        </div>
        <div class="rating-experiment">
          <h3>Experiment Rating</h3>
        </div>
        <div>
          <div class="modal">
            <div class="modal-content">
              <div class="rating-header">
                <img src="./images/logo.jpg" />
                <span class="close" @click=${this.close}>&times;</span>
              </div>
              <h1 id="title">${this.title}</h1>
              <div class="rating-div">
                <rating-element rating="6"></rating-element>
              </div>
              <div class="button-div">
                <button id="submit-button" @click=${this.handleSubmit}>
                  Submit
                </button>
                <button id="cancel-button" @click=${this.close}>Cancel</button>
              </div>
            </div>
          </div>
          <button class="rating-button" id="rating-button" @click=${this.open}>
            Rate Experiment
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("rating-modal", RatingModal);
