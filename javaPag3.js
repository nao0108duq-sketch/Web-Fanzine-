document.addEventListener("DOMContentLoaded", function () {
    if (typeof St === "undefined" || !St.PageFlip) {
        console.error("No se pudo cargar StPageFlip.");
        return;
    }

    const elementoRevista = document.getElementById("book");
    const paginas = document.querySelectorAll("#book .page");
    const revista = new St.PageFlip(elementoRevista, {
        width: 705,
        height: 591,
        size: "stretch",
        minWidth: 280,
        maxWidth: 705,
        minHeight: 320,
        maxHeight: 591,
        showCover: true,
        startPage: 0,
        maxShadowOpacity: 0.35,
        mobileScrollSupport: false,
        usePortrait: true
    });

    revista.loadFromHTML(paginas);

    const botonSiguienteArtista = document.getElementById("siguiente-artista");
    const botonPaginaCinco = document.getElementById("ir-pagina-5");

    function reiniciarAnimacion(elemento) {
        elemento.classList.remove("animate__animated");
        void elemento.offsetWidth;
        elemento.classList.add("animate__animated");
    }

    function actualizarPaginasActivas() {
        const indiceActual = revista.getCurrentPageIndex();
        const esVertical = elementoRevista.querySelector(".stf__wrapper")
            .classList.contains("--portrait");

        paginas.forEach(function (pagina, indice) {
            const activa = esVertical
                ? indice === indiceActual
                : indice === indiceActual || indice === indiceActual + 1;

            const estabaActiva = pagina.classList.contains("activa");
            pagina.classList.toggle("activa", activa);

            if (activa && !estabaActiva) {
                pagina.querySelectorAll(".animate__animated").forEach(reiniciarAnimacion);
            }
        });
    }

    function actualizarBotonSiguienteArtista() {
        const enContraportada = revista.getCurrentPageIndex() === paginas.length - 1;
        if (botonSiguienteArtista) {
            botonSiguienteArtista.hidden = !enContraportada;
        }
        if (botonPaginaCinco) {
            botonPaginaCinco.hidden = !enContraportada;
        }
    }

    revista.on("flip", function () {
        actualizarBotonSiguienteArtista();
        window.setTimeout(actualizarPaginasActivas, 420);
    });
    actualizarBotonSiguienteArtista();
    actualizarPaginasActivas();

    document.getElementById("anterior").addEventListener("click", function () {
        revista.flipPrev();
    });

    document.getElementById("siguiente").addEventListener("click", function () {
        revista.flipNext();
    });

});