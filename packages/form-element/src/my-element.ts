import "form-core/variables.css";

import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import litLogo from "./assets/lit.svg";
import viteLogo from "/vite.svg";
import { mountForm } from "form-core";
import stylesheet from "form-core/form.css?raw";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Click on the Vite and Lit logos to learn more";

  connectedCallback(): void {
    super.connectedCallback();
    // Wait for the shadow DOM to be rendered
    this.updateComplete.then(() => {
      const app = this.renderRoot.querySelector(".my-app");
      if (app) {
        console.log("app", app);
        mountForm(app);
      }
    });
  }

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
      <div class="my-app"></div>
    `;
  }

  private _onClick() {
    this.count++;
  }

  static styles = css`
    ${unsafeCSS(stylesheet)}
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
