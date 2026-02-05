import "form-core/form.css";

import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { mountForm } from "form-core";
import stylesheet from "form-core/form.css?raw";

@customElement("formata-form")
export class FormataForm extends LitElement {
  //

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const container = this.renderRoot.querySelector(".formata");
      if (!container) return;
      mountForm(container);
    });
  }

  render() {
    return html` <div class="formata"></div> `;
  }

  static styles = css`
    ${unsafeCSS(stylesheet)}
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "formata-form": FormataForm;
  }
}
