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

    const videoPagina2 = document.getElementById("video-pagina-2");
    const videoPagina3 = document.getElementById("video-pagina-3");
    const botonReproducir = document.getElementById("reproducir-video");
    const enlacePagina3 = document.getElementById("pagina-3");
    const videos = [videoPagina2, videoPagina3];
    let videosActivos = [];

    function actualizarEnlacePagina3() {
        enlacePagina3.hidden = revista.getCurrentPageIndex() !== paginas.length - 1;
    }

    function actualizarVideoPaginas() {
        const indice = revista.getCurrentPageIndex();
        const esVertical = elementoRevista.querySelector(".stf__wrapper").classList.contains("--portrait");

        if (esVertical && indice === 1) {
            videosActivos = [videoPagina2];
        } else if (esVertical && indice === 2) {
            videosActivos = [videoPagina3];
        } else if (!esVertical && indice === 1) {
            videosActivos = videos;
        } else {
            videosActivos = [];
        }

        videos.forEach(function (video) {
            const activo = videosActivos.includes(video);
            video.hidden = !activo;
            video.muted = videosActivos.length > 1 ? video === videoPagina3 : video !== videosActivos[0];

            if (activo) {
                video.currentTime = 0;
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });

        botonReproducir.hidden = videosActivos.length === 0;
        if (videosActivos.length > 0) {
            reproducirVideos();
        }
    }

    function reproducirVideos() {
        const videosAReproducir = videosActivos.slice();
        Promise.all(videosAReproducir.map(function (video) {
            return video.play();
        })).then(function () {
            if (videosAReproducir.every(function (video) {
                return videosActivos.includes(video);
            })) {
                botonReproducir.hidden = true;
            }
        }).catch(function (error) {
            const siguenActivos = videosAReproducir.every(function (video) {
                return videosActivos.includes(video);
            });
            if (!siguenActivos) {
                return;
            }

            videosAReproducir.forEach(function (video) {
                video.pause();
            });
            botonReproducir.hidden = false;
            console.warn("No se pudo iniciar automáticamente el video; usa el botón para reproducirlo con sonido.", error);
        });
    }

    videoPagina2.addEventListener("timeupdate", function () {
        if (videosActivos.length > 1 && Math.abs(videoPagina2.currentTime - videoPagina3.currentTime) > 0.15) {
            videoPagina3.currentTime = videoPagina2.currentTime;
        }
    });

    botonReproducir.addEventListener("click", reproducirVideos);

    revista.on("flip", actualizarVideoPaginas);
    revista.on("flip", actualizarEnlacePagina3);
    actualizarVideoPaginas();
    actualizarEnlacePagina3();

    document.getElementById("anterior").addEventListener("click", function () {
        revista.flipPrev();
    });

    document.getElementById("siguiente").addEventListener("click", function () {
        revista.flipNext();
    });
});