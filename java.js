
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
        width: 460,
        height: 620,


        size: "stretch",
        minWidth: 280,
        maxWidth: 460,
        minHeight: 320,
        maxHeight: 620,

        // Configuración visual
        showCover: true,
        maxShadowOpacity: 0.35,
        mobileScrollSupport: false,
        usePortrait: true

    });

    const paginas = document.querySelectorAll("#book .page");

    // ESTO ES PARA CARGAR LAS PAGINAS DE LA REVISTA
    revista.loadFromHTML(paginas);

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
