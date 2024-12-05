class PeliculasList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchPeliculas();
    }

    async fetchPeliculas() {
        try {
            const response = await fetch('http://localhost:8000/peliculas/');
            const peliculas = await response.json();
            this.renderPeliculas(peliculas);
        } catch (error) {
            console.error('Error al obtener las películas:', error);
        }
    }

    renderPeliculas(peliculas) {
        const listContainer = this.shadowRoot.querySelector('.peliculas-list');
        listContainer.innerHTML = '';

        peliculas.forEach(pelicula => {
            const peliculaItem = document.createElement('div');
            peliculaItem.classList.add('pelicula-item');
            peliculaItem.innerHTML = `
                <p>${pelicula.titulo} (${pelicula.anio}) - ${pelicula.genero}</p>
                <div class="btn-container">
                    <button class="btn btn-editar" data-id="${pelicula.id_pelicula}">Editar</button>
                    <button class="btn btn-eliminar" data-id="${pelicula.id_pelicula}">Eliminar</button>
                </div>
            `;

            peliculaItem.querySelector('.btn-editar').addEventListener('click', () => this.editPelicula(pelicula));
            peliculaItem.querySelector('.btn-eliminar').addEventListener('click', () => this.deletePelicula(pelicula.id_pelicula));

            listContainer.appendChild(peliculaItem);
        });
    }

    async deletePelicula(id) {
        try {
            const response = await fetch(`http://localhost:8000/peliculas/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Película eliminada exitosamente');
                this.fetchPeliculas();
            } else {
                alert('Error al eliminar la película');
            }
        } catch (error) {
            console.error('Error al eliminar la película:', error);
        }
    }

    editPelicula(pelicula) {
        this.shadowRoot.querySelector('.form-container').classList.remove('hidden');
        const form = this.shadowRoot.querySelector('.form-container form');
        form.titulo.value = pelicula.titulo;
        form.anio.value = pelicula.anio;
        form.genero.value = pelicula.genero;
        form.id_pelicula.value = pelicula.id_pelicula;
    }

    async updatePelicula(event) {
        event.preventDefault();
        const form = event.target;

        const peliculaData = {
            titulo: form.titulo.value,
            anio: form.anio.value,
            genero: form.genero.value,
        };

        const id = form.id_pelicula.value;

        try {
            const response = await fetch(`http://localhost:8000/peliculas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(peliculaData),
            });

            if (response.ok) {
                alert('Película actualizada exitosamente');
                this.fetchPeliculas();
                form.reset();
                this.shadowRoot.querySelector('.form-container').classList.add('hidden');
            } else {
                alert('Error al actualizar la película');
            }
        } catch (error) {
            console.error('Error al actualizar la película:', error);
        }
    }

    async addPelicula(event) {
        event.preventDefault();
        const form = event.target;

        const peliculaData = {
            titulo: form.titulo.value,
            anio: form.anio.value,
            genero: form.genero.value,
        };

        try {
            const response = await fetch('http://localhost:8000/peliculas/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(peliculaData),
            });

            if (response.ok) {
                alert('Película agregada exitosamente');
                this.fetchPeliculas();
                form.reset();
                this.shadowRoot.querySelector('.form-container').classList.add('hidden');
            } else {
                alert('Error al agregar la película');
            }
        } catch (error) {
            console.error('Error al agregar la película:', error);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .peliculas-list {
                    margin: 20px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .pelicula-item {
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
                #add-pelicula-btn {
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
                #add-pelicula-btn:hover {
                    background-color: #218838;
                }
                /* Estilo para posicionar el botón debajo del navbar */
                .navbar + #add-pelicula-btn {
                    position: absolute;
                    top: 60px; /* Ajusta esta posición dependiendo de la altura de tu navbar */
                    left: 20px;
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
            <div id="add-pelicula-btn">Agregar Película</div>

            <div class="peliculas-list">
                <h3>Películas</h3>
            </div>

            <div class="form-container hidden">
                <h3>Agregar/Editar Película</h3>
                <form>
                    <input type="hidden" name="id_pelicula" />
                    <label for="titulo">Título:</label>
                    <input type="text" name="titulo" required />
                    <label for="anio">Año:</label>
                    <input type="number" name="anio" required />
                    <label for="genero">Género:</label>
                    <input type="text" name="genero" required />
                    <button type="submit">Guardar</button>
                </form>
            </div>
        `;

        this.shadowRoot.querySelector('#add-pelicula-btn').addEventListener('click', () => {
            this.shadowRoot.querySelector('.form-container').classList.remove('hidden');
        });

        this.shadowRoot.querySelector('.form-container form').addEventListener('submit', (event) => {
            const idPelicula = event.target.id_pelicula.value;
            if (idPelicula) {
                this.updatePelicula(event);
            } else {
                this.addPelicula(event);
            }
        });
    }
}

window.customElements.define('peliculas-list', PeliculasList);
