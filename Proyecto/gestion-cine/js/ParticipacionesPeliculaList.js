class ParticipacionesPeliculaTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
    }

    connectedCallback() {
        this.renderForm();
        this.renderTable();
        this.loadOptions();
    }

    async loadOptions() {
        try {
            
            const peliculasResponse = await fetch('http://localhost:8000/peliculas');
            const peliculas = await peliculasResponse.json();

            const actoresResponse = await fetch('http://localhost:8000/actores');
            const actores = await actoresResponse.json();

            
            const peliculaSelect = this.shadowRoot.querySelector('#pelicula-select');
            peliculas.forEach(pelicula => {
                const option = document.createElement('option');
                option.value = pelicula.id_pelicula;
                option.textContent = pelicula.titulo;
                peliculaSelect.appendChild(option);
            });

            
            const actorSelect = this.shadowRoot.querySelector('#actor-select');
            actores.forEach(actor => {
                const option = document.createElement('option');
                option.value = actor.id_actor;
                option.textContent = actor.nombre;
                actorSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error al cargar las opciones:', error);
        }
    }

    renderForm() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .form-container {
                    margin: 30px auto;
                    max-width: 800px;
                    background-color: rgba(173, 216, 230, 0.8); /* Celeste suave con transparencia */
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                label {
                    margin: 10px 0;
                    font-weight: bold;
                }
                select, input[type="checkbox"] {
                    margin-bottom: 15px;
                }
                button {
                    background-color: #f39c12;
                    border: none;
                    padding: 10px 20px;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                }
                button:hover {
                    background-color: #e67e22;
                }
            </style>
            <div class="form-container">
                <h2>Agregar Participación en Película</h2>
                <form id="participacion-form">
                    <label for="pelicula-select">Película</label>
                    <select id="pelicula-select" required>
                        <option value="">Selecciona una película</option>
                    </select>

                    <label for="actor-select">Actor</label>
                    <select id="actor-select" required>
                        <option value="">Selecciona un actor</option>
                    </select>

                    <label for="roles">Rol (puedes seleccionar varios):</label>
                    <div id="roles">
                        <input type="checkbox" id="protagonista" name="rol" value="Protagonista">
                        <label for="protagonista">Protagonista</label>
                        <input type="checkbox" id="cineasta" name="rol" value="Cineasta">
                        <label for="cineasta">Cineasta</label>
                        <input type="checkbox" id="director" name="rol" value="Director">
                        <label for="director">Director</label>
                    </div>

                    <button type="submit">Agregar Participación</button>
                </form>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        
        this.shadowRoot.querySelector('#participacion-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        
        const peliculaId = this.shadowRoot.querySelector('#pelicula-select').value;
        const actorId = this.shadowRoot.querySelector('#actor-select').value;
        
        
        const roles = Array.from(this.shadowRoot.querySelectorAll('input[name="rol"]:checked'))
                            .map(checkbox => checkbox.value);

        if (!peliculaId || !actorId || roles.length === 0) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        
        const data = {
            id_pelicula: peliculaId,
            id_actor: actorId,
            rol: roles.join(', ') 
        };

        fetch('http://localhost:8000/participaciones/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => {
            alert('Participación agregada con éxito');
            this.updateTable();  
        })
        .catch(error => {
            console.error('Error al agregar participación:', error);
        });
    }

    updateTable() {
        
        fetch('http://localhost:8000/participaciones')
            .then(response => response.json())
            .then(data => {
                const tbody = this.shadowRoot.querySelector('tbody');
                tbody.innerHTML = '';  

                data.forEach(participacion => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${participacion.titulo}</td>
                        <td>${participacion.nombre}</td>
                        <td>${participacion.rol}</td>
                    `;
                    tbody.appendChild(row); 
                });
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                const tbody = this.shadowRoot.querySelector('tbody');
                tbody.innerHTML = '<tr><td colspan="3">Error al cargar los datos.</td></tr>';
            });
    }

    renderTable() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .table-container {
                    margin: 30px auto;
                    max-width: 1000px;
                    background-color: rgba(173, 216, 230, 0.8); /* Celeste suave con transparencia */
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f39c12;
                    color: Black;
                    font-weight: bold;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
                caption {
                    font-size: 1.5rem;
                    margin: 10px 0;
                    font-weight: bold;
                    color: #f39c12;
                }
            </style>
            <div class="table-container">
                <caption>Participaciones en Películas</caption>
                <table id="participaciones-table">
                    <thead>
                        <tr>
                            <th>Película</th>
                            <th>Actor</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Los datos de las participaciones se cargarán aquí -->
                    </tbody>
                </table>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('participaciones-pelicula-table', ParticipacionesPeliculaTable);
