document.addEventListener("DOMContentLoaded", function () {
    const canciones = [
        {
            titulo: "Crimen",
            artista: "Gustavo Cerati",
            audio: "assets%20pagina%205/1-crimen.mp3",
            portada: "assets%20pagina%205/1-imagencrimen.jpg"
        },
        {
            titulo: "Deja Vu",
            artista: "Gustavo Cerati",
            audio: "assets%20pagina%205/2-dejavu.mp3",
            portada: "assets%20pagina%205/2-imagendejavu.jpg"
        },
        {
            titulo: "Dime",
            artista: "Silvana Estrada",
            audio: "assets%20pagina%205/3-dime.mp3",
            portada: "assets%20pagina%205/3-imagendime.jpg"
        },
        {
            titulo: "El alma mía",
            artista: "Silvana Estrada",
            audio: "assets%20pagina%205/4-elalmamia.mp3",
            portada: "assets%20pagina%205/4-imagenelalmamia.jpg"
        },
        {
            titulo: "Sálvate Tú",
            artista: "LosPetitFellas",
            audio: "assets%20pagina%205/5-salvatetu.mp3",
            portada: "assets%20pagina%205/5-imagensalvatetu.jpg"
        },
        {
            titulo: "Los verbos",
            artista: "LosPetitFellas",
            audio: "assets%20pagina%205/6-losverbos.mp3",
            portada: "assets%20pagina%205/6-imagenlosverbos.jpg"
        }
    ];

    const audio = document.getElementById("audio-cancion");
    const portada = document.getElementById("portada-cancion");
    const titulo = document.getElementById("titulo-cancion");
    const artista = document.getElementById("artista-cancion");
    const botonReproducir = document.getElementById("reproducir-pausar");
    const botonAnterior = document.getElementById("cancion-anterior");
    const botonSiguiente = document.getElementById("cancion-siguiente");
    const barraProgreso = document.getElementById("barra-progreso");
    const tiempoActual = document.getElementById("tiempo-actual");
    const duracionCancion = document.getElementById("duracion-cancion");
    const estadoReproductor = document.getElementById("estado-reproductor");
    let indiceCancion = Math.floor(Math.random() * canciones.length);
    let cancionesAleatorias = [];
    const historialCanciones = [];

    function formatearTiempo(segundos) {
        if (!Number.isFinite(segundos)) {
            return "0:00";
        }
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = Math.floor(segundos % 60).toString().padStart(2, "0");
        return minutos + ":" + segundosRestantes;
    }

    function cargarCancion(indice) {
        indiceCancion = indice;
        const cancion = canciones[indiceCancion];
        titulo.textContent = cancion.titulo;
        artista.textContent = cancion.artista;
        portada.src = cancion.portada;
        portada.alt = "Portada de " + cancion.titulo;
        audio.src = cancion.audio;
        audio.load();
        barraProgreso.value = "0";
        tiempoActual.textContent = "0:00";
        duracionCancion.textContent = "0:00";
        estadoReproductor.textContent = "";
    }

    function reproducir() {
        audio.play().then(function () {
            botonReproducir.textContent = "❚❚";
            botonReproducir.setAttribute("aria-label", "Pausar");
            estadoReproductor.textContent = "";
        }).catch(function () {
            estadoReproductor.textContent = "No se pudo reproducir el audio. Inténtalo de nuevo.";
        });
    }

    function mezclarCanciones() {
        cancionesAleatorias = canciones
            .map(function (_, indice) {
                return indice;
            })
            .filter(function (indice) {
                return indice !== indiceCancion;
            });

        for (let indice = cancionesAleatorias.length - 1; indice > 0; indice -= 1) {
            const indiceAleatorio = Math.floor(Math.random() * (indice + 1));
            const temporal = cancionesAleatorias[indice];
            cancionesAleatorias[indice] = cancionesAleatorias[indiceAleatorio];
            cancionesAleatorias[indiceAleatorio] = temporal;
        }
    }

    function cambiarCancionSiguiente() {
        if (cancionesAleatorias.length === 0) {
            mezclarCanciones();
        }
        historialCanciones.push(indiceCancion);
        cargarCancion(cancionesAleatorias.shift());
        reproducir();
    }

    function cambiarCancionAnterior() {
        if (historialCanciones.length === 0) {
            audio.currentTime = 0;
            reproducir();
            return;
        }
        cancionesAleatorias.unshift(indiceCancion);
        cargarCancion(historialCanciones.pop());
        reproducir();
    }

    botonReproducir.addEventListener("click", function () {
        if (audio.paused) {
            reproducir();
            return;
        }
        audio.pause();
    });

    botonAnterior.addEventListener("click", function () {
        cambiarCancionAnterior();
    });

    botonSiguiente.addEventListener("click", function () {
        cambiarCancionSiguiente();
    });

    audio.addEventListener("play", function () {
        botonReproducir.textContent = "❚❚";
        botonReproducir.setAttribute("aria-label", "Pausar");
    });

    audio.addEventListener("pause", function () {
        botonReproducir.textContent = "▶";
        botonReproducir.setAttribute("aria-label", "Reproducir");
    });

    audio.addEventListener("loadedmetadata", function () {
        barraProgreso.max = String(audio.duration);
        duracionCancion.textContent = formatearTiempo(audio.duration);
    });

    audio.addEventListener("timeupdate", function () {
        barraProgreso.value = String(audio.currentTime);
        tiempoActual.textContent = formatearTiempo(audio.currentTime);
    });

    audio.addEventListener("ended", function () {
        cambiarCancionSiguiente();
    });

    audio.addEventListener("error", function () {
        estadoReproductor.textContent = "No se pudo cargar el audio de esta canción.";
    });

    barraProgreso.addEventListener("input", function () {
        audio.currentTime = Number(barraProgreso.value);
    });

    cargarCancion(indiceCancion);
});
