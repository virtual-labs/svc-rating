import { LitElement, html } from "lit";

class MyListener extends LitElement {
  static properties = {
    canCheck: {},
  };
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("submit-rating", this.onSubmitRating);
  }
  onSubmitRating(e) {
    console.debug(e);
    alert(e.detail.data);
    console.debug("submit-rating", e.detail);
  }

  constructor() {
    super();
    this.canCheck = false;
    this.addEventListener("submit-rating", this._checkedHandler);
  }
  render() {
    return html`
      <div
        @submit-rating=${(e) => {
          console.debug(e);
        }}
      >
      </div>
    `;
  }
}
customElements.define("my-listener", MyListener);
