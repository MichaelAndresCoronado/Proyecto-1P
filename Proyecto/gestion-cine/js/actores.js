class ActoresList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchActores();
    }

    async fetchActores() {
        try {
            const response = await fetch('http://localhost:8000/actores/');
            const actores = await response.json();
            this.renderActores(actores);
        } catch (error) {
            console.error('Error al obtener los actores:', error);
        }
    }

    renderActores(actores) {
        const listContainer = this.shadowRoot.querySelector('.actores-list');
        listContainer.innerHTML = '';  

        actores.forEach(actor => {
            const actorItem = document.createElement('div');
            actorItem.classList.add('actor-item');
            actorItem.innerHTML = `
                <p>${actor.nombre} - ${actor.nacionalidad} (${actor.edad} años)</p>
                <div class="btn-container">
                    <button class="btn btn-editar" data-id="${actor.id_actor}">Editar</button>
                    <button class="btn btn-eliminar" data-id="${actor.id_actor}">Eliminar</button>
                </div>
            `;

            
            actorItem.querySelector('.btn-editar').addEventListener('click', () => this.editActor(actor));
            actorItem.querySelector('.btn-eliminar').addEventListener('click', () => this.deleteActor(actor.id_actor));

            listContainer.appendChild(actorItem);
        });
    }

    async deleteActor(id) {
        try {
            const response = await fetch(`http://localhost:8000/actores/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Actor eliminado exitosamente');
                this.fetchActores(); 
            } else {
                alert('Error al eliminar el actor');
            }
        } catch (error) {
            console.error('Error al eliminar el actor:', error);
        }
    }

    editActor(actor) {
        this.shadowRoot.querySelector('.form-container').classList.remove('hidden');
        const form = this.shadowRoot.querySelector('.form-container form');
        form.nombre.value = actor.nombre;
        form.nacionalidad.value = actor.nacionalidad;
        form.edad.value = actor.edad;
        form.id_actor.value = actor.id_actor;
    }

    async updateActor(event) {
        event.preventDefault();
        const form = event.target;

        const actorData = {
            nombre: form.nombre.value,
            nacionalidad: form.nacionalidad.value,
            edad: form.edad.value,
        };

        const id = form.id_actor.value;

        try {
            const response = await fetch(`http://localhost:8000/actores/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actorData),
            });

            if (response.ok) {
                alert('Actor actualizado exitosamente');
                this.fetchActores();  
                form.reset();
                this.shadowRoot.querySelector('.form-container').classList.add('hidden'); 
            } else {
                alert('Error al actualizar el actor');
            }
        } catch (error) {
            console.error('Error al actualizar el actor:', error);
        }
    }

    async addActor(event) {
        event.preventDefault();
        const form = event.target;

        const actorData = {
            nombre: form.nombre.value,
            nacionalidad: form.nacionalidad.value,
            edad: form.edad.value,
        };

        try {
            const response = await fetch('http://localhost:8000/actores/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actorData),
            });

            if (response.ok) {
                alert('Actor agregado exitosamente');
                this.fetchActores(); 
                form.reset();
                this.shadowRoot.querySelector('.form-container').classList.add('hidden'); 
            } else {
                alert('Error al agregar el actor');
            }
        } catch (error) {
            console.error('Error al agregar el actor:', error);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .actores-list {
                    margin: 20px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .actor-item {
                    margin-bottom: 10px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .form-container {
                    margin: 20px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .form-container.hidden {
                    display: none;
                }
                #add-actor-btn {
                    margin: 20px 0;
                    background-color: #28a745;
                    color: white;
                    padding: 10px;
                    width: 140px; /* Botón con texto visible */
                    height: 40px;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    display: inline-block;
                    text-align: center;
                    line-height: 20px; /* Para centrar el texto */
                }
                #add-actor-btn:hover {
                    background-color: #218838;
                }
                .btn-container {
                    display: flex;
                    gap: 10px;
                }
                .btn {
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 14px;
                    cursor: pointer;
                }
                .btn-editar {
                    background-color: #5bc0de; /* Celeste suave */
                    color: white;
                }
                .btn-editar:hover {
                    background-color: #31b0d5;
                }
                .btn-eliminar {
                    background-color: #d9534f; /* Rojo suave */
                    color: white;
                }
                .btn-eliminar:hover {
                    background-color: #c9302c;
                }
            </style>
            <div id="add-actor-btn">Agregar Actor</div>

            <div class="actores-list">
                <h3>Actores</h3>
            </div>

            <div class="form-container hidden">
                <h3>Agregar/Editar Actor</h3>
                <form>
                    <input type="hidden" name="id_actor" />
                    <label for="nombre">Nombre:</label>
                    <input type="text" name="nombre" required />
                    <label for="nacionalidad">Nacionalidad:</label>
                    <input type="text" name="nacionalidad" required />
                    <label for="edad">Edad:</label>
                    <input type="number" name="edad" required />
                    <button type="submit">Guardar</button>
                </form>
            </div>
        `;

        this.shadowRoot.querySelector('#add-actor-btn').addEventListener('click', () => {
            this.shadowRoot.querySelector('.form-container').classList.remove('hidden');
        });


        this.shadowRoot.querySelector('.form-container form').addEventListener('submit', (event) => {
            const idActor = event.target.id_actor.value;
            if (idActor) {
                this.updateActor(event);
            } else {
                this.addActor(event);
            }
        });
    }
}

window.customElements.define('actores-list', ActoresList);
