class CustomMain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    min-height: 500px;
                    box-sizing: border-box;
                }
            </style>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define("custom-main", CustomMain);
