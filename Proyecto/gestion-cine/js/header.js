class CustomHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .header-container {
                    display: flex;
                    justify-content: center; /* Centrar contenido */
                    align-items: center; /* Alinear verticalmente */
                    background-color: #2c3e50; 
                    color: white;
                    padding: 20px 0; 
                    font-size: 20px;
                    font-family: 'Times New Roman', Times, serif; 
                    letter-spacing: 1px;
                    border-bottom: 3px solid #ecf0f1; 
                    box-sizing: border-box;
                    margin-bottom: 3px;
                    gap: 20px; /* Espacio entre logo y texto */
                }
                .header-container h1 {
                    margin: 0;
                    font-size: 36px;
                    font-weight: 600;
                }
                .logo {
                    width: 250px;  /* Ajusta el tamaño del logo */
                    height: auto;
                }
            </style>
            <div class="header-container">
                <img class="logo" src="https://www.espe.edu.ec/wp-content/uploads/2018/11/espe.png" alt="Logo de la ESPE">
                <h1>Sistema de Cine: Películas y Actores</h1>
            </div>
        `;

        
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define("custom-header", CustomHeader);
