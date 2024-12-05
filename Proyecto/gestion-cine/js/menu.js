class CustomMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .menu-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #2c3e50;
                    padding: 10px 20px;
                    height: 60px;
                    box-sizing: border-box;
                    color: white;
                }

                .menu-title {
                    font-size: 20px;
                    font-weight: bold;
                    letter-spacing: 1px;
                    color: #ecf0f1;
                }

                .menu-options {
                    display: flex;
                    gap: 20px;
                }

                .menu-item {
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .menu-item:hover {
                    color: #1abc9c;
                }
            </style>

            <div class="menu-container">
                <div class="menu-title">SISTEMA DE CINE</div>
                <div class="menu-options">
                    <div class="menu-item" id="inicio">Inicio</div>
                    <div class="menu-item" id="peliculas">Películas</div>
                    <div class="menu-item" id="actores">Actores</div>
                    <div class="menu-item" id="participaciones">Participaciones Película</div>
                    <div class="menu-item" id="acerca">Acerca de</div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        
        this.shadowRoot.querySelector('#inicio').addEventListener('click', () => this.navigateToInicio());
        this.shadowRoot.querySelector('#peliculas').addEventListener('click', () => this.navigateToPeliculas());
        this.shadowRoot.querySelector('#actores').addEventListener('click', () => this.navigateToActores());
        this.shadowRoot.querySelector('#participaciones').addEventListener('click', () => this.navigateToParticipaciones());
        this.shadowRoot.querySelector('#acerca').addEventListener('click', () => this.navigateToAcerca());

        
        this.navigateToInicio();
    }

    
    navigateToInicio() {
        const mainContent = document.querySelector('custom-main');
        mainContent.innerHTML = '';  
        const inicio = document.createElement('custom-inicio');
        mainContent.appendChild(inicio);
    }

    
    navigateToPeliculas() {
        const mainContent = document.querySelector('custom-main');
        mainContent.innerHTML = '';  
        const peliculasList = document.createElement('peliculas-list');
        peliculasList.apiUrl = "http://localhost:8000/peliculas";  
        mainContent.appendChild(peliculasList);
    }

    
    navigateToActores() {
        const mainContent = document.querySelector('custom-main');
        mainContent.innerHTML = '';  
        const actoresList = document.createElement('actores-list');
        actoresList.apiUrl = "http://localhost:8000/actores";  
        mainContent.appendChild(actoresList);
    }

    
    navigateToParticipaciones() {
        const mainContent = document.querySelector('custom-main');
        mainContent.innerHTML = '';  
        const participacionesPeliculaTable = document.createElement('participaciones-pelicula-table');
        mainContent.appendChild(participacionesPeliculaTable);
    }

    
    navigateToAcerca() {
        const mainContent = document.querySelector('custom-main');
        mainContent.innerHTML = '';  
        const profile = document.createElement('social-profile');
        mainContent.appendChild(profile);
    }
}

window.customElements.define("mi-menu", CustomMenu);
