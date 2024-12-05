class SocialProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
    }

    connectedCallback() {
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .profile-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 100%;
                    max-width: 400px;
                    margin: 50px auto;
                    background-color: rgba(241, 196, 15, 0.3); 
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
                .profile-photo {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 20px;
                }
                .profile-details {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                .profile-details p {
                    font-size: 16px;
                    margin: 5px 0;
                    color: #333;
                }
                .profile-footer button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                    width: 150px; /* Establece un ancho fijo para los botones */
                }
                .profile-footer button.follow {
                    background-color: #3498db;
                    color: white;
                }
                .profile-footer button.follow:hover {
                    background-color: #2980b9;
                }
                .profile-footer button.message {
                    background-color: #e74c3c;
                    color: white;
                }
                .profile-footer button.message:hover {
                    background-color: #c0392b;
                }
            </style>
            <div class="profile-container">
                <div class="profile-header">
                    <h2>Datos Personales</h2>
                    <p>Explora los datos del Usuario</p>
                </div>

                <img class="profile-photo" src="img/Acerca de.png" alt="Foto de perfil">

                <div class="profile-details">
                    <b>Información:</b>
                    <slot name="nombre">Michael Andres Coronado Achig</slot>
                    <br>
                    <slot name="edad">Edad: 25 años</slot>
                    <br>
                    <slot name="ciudad">Ciudad: Quito</slot>
                    <br>
                    <slot name="educacíon">Estudio: Universidad de las Fuerzas Armadas ESPE</slot>
                    <br>
                    <slot name="carrera">Carrera: Carrera de Ingeniería en Tecnologías de la Información, en curso</slot>
                    <br>
                    <slot name="email">Correo: macoronado@espe.edu.ec</slot>
                    <br></br>
                </div>

                <div class="profile-footer">
                    <button class="follow" id="follow-button">Seguir</button>
                    <button class="message" id="message-button">Mensaje</button>
                </div>
            </div>
        `;
        
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        
        this.shadowRoot.querySelector('#follow-button').addEventListener('click', () => {
            window.open('https://www.facebook.com/michaelandres.coronado.1', '_blank');
        });

        
        this.shadowRoot.querySelector('#message-button').addEventListener('click', () => {
            window.open('https://www.instagram.com/michael_coronado_29/', '_blank');
        });
    }
}

window.customElements.define('social-profile', SocialProfile);
