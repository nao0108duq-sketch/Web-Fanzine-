
document.addEventListener("DOMContentLoaded", function () {

    // StPageFlip
    if (typeof St === "undefined" || !St.PageFlip) {
        console.error("No se pudo cargar StPageFlip.");
        return;
    }

    // Espacio de la revista
    const elementoRevista = document.getElementById("book");

    // CREACION DE REVISTA
    const revista = new St.PageFlip(elementoRevista, {

        // Tamaño de cada página
        width: 705,
        height: 591,


        size: "stretch",
        minWidth: 280,
        maxWidth: 705,
        minHeight: 320,
        maxHeight: 591,

        // Configuración visual
        showCover: true,
        startPage: 0,
        maxShadowOpacity: 0.35,
        mobileScrollSupport: false,
        usePortrait: true

    });

    const paginas = document.querySelectorAll("#book .page");

    // ESTO ES PARA CARGAR LAS PAGINAS DE LA REVISTA
    revista.loadFromHTML(paginas);

    const botonPrimerArtista = document.getElementById("primer-artista");

    function actualizarBotonPrimerArtista() {
        botonPrimerArtista.hidden = revista.getCurrentPageIndex() !== paginas.length - 1;
    }

    revista.on("flip", actualizarBotonPrimerArtista);
    actualizarBotonPrimerArtista();

    // BOTÓN ANTERIOR
    const botonAnterior = document.getElementById("anterior");

    botonAnterior.addEventListener("click", function () {
        revista.flipPrev();
    });

    // BOTÓN SIGUIENTE
    const botonSiguiente = document.getElementById("siguiente");

    botonSiguiente.addEventListener("click", function () {
        revista.flipNext();
    });

});
