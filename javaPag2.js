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

    document.getElementById("anterior").addEventListener("click", function () {
        revista.flipPrev();
    });

    document.getElementById("siguiente").addEventListener("click", function () {
        revista.flipNext();
    });
});