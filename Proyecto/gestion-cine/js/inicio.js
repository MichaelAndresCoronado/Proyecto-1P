class CustomInicio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
    }

    connectedCallback() {
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Estilos del contenedor principal */
                .inicio-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 70vh; /* Ajusta la altura para centrarlo sin estar muy abajo */
                    background-color: #f4f6f7;
                    padding: 20px;
                    box-sizing: border-box;
                }

                /* Estilos del contenido de inicio */
                .inicio-container {
                    background-color: #3498db; 
                    color: white;
                    text-align: center;
                    padding: 40px 20px;
                    font-size: 24px; 
                    font-family: 'Arial', sans-serif;
                    border-radius: 8px; /* Bordes redondeados */
                    border-bottom: 3px solid #2980b9; 
                    box-sizing: border-box;
                    max-width: 600px; /* Ancho máximo */
                    width: 100%; /* Ocupa todo el ancho posible, hasta el máximo */
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra ligera */
                }

                .inicio-container h2 {
                    margin: 0;
                    font-size: 32px;
                    font-weight: 600;
                }

                .inicio-container p {
                    font-size: 18px;
                    margin-top: 15px;
                    font-weight: 300;
                }
            </style>

            <!-- Contenedor que centra el contenido en la pantalla -->
            <div class="inicio-wrapper">
                <div class="inicio-container">
                    <h2>Bienvenido al Sistema de Cine</h2>
                    <p id="welcomeMessage"></p>
                </div>
            </div>
        `;

        
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        
        this.setWelcomeMessage();
    }

    
    setWelcomeMessage() {
        const welcomeMessageElement = this.shadowRoot.querySelector('#welcomeMessage');
        welcomeMessageElement.textContent = "Aquí podrás gestionar películas, actores y mucho más. ¡Explora el sistema!";
    }
}


window.customElements.define("custom-inicio", CustomInicio);
