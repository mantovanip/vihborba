/* =========================================================
   VIH BORBA
   Interactive Experience
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const SITE_CONFIG = {

    imageCount: 25,

    reelCount: 6

};



/* =========================================================
   ELEMENTOS
========================================================= */

const body = document.body;

const header = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");

const scrollProgress =
    document.getElementById("scrollProgress");

const heroImage =
    document.getElementById("heroImage");

const parallaxImage =
    document.querySelector(".parallax-image");

const ctaBackground =
    document.querySelector(".cta-background");

const polaroidGallery =
    document.getElementById("polaroidGallery");

const reelsGrid =
    document.getElementById("reelsGrid");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");



/* =========================================================
   HEADER / MENU
========================================================= */

function updateHeader() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();



/* MENU MOBILE */

function closeMenu() {

    mainNav.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    body.classList.remove("menu-open");

}


function openMenu() {

    mainNav.classList.add("open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    body.classList.add("menu-open");

}


menuToggle.addEventListener(
    "click",
    () => {

        if (mainNav.classList.contains("open")) {

            closeMenu();

        } else {

            openMenu();

        }

    }
);


document
    .querySelectorAll(".main-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });



/* =========================================================
   SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    if (scrollHeight <= 0) return;

    const percentage =
        (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width =
        `${percentage}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);



/* =========================================================
   PARALLAX
========================================================= */

let ticking = false;


function updateParallax() {

    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {

        return;

    }


    const scrollY =
        window.scrollY;


    /*
     * HERO
     */

    if (heroImage) {

        const heroOffset =
            Math.min(scrollY * .16, 130);

        heroImage.style.transform =
            `scale(1.05) translateY(${heroOffset}px)`;

    }


    /*
     * PARALLAX IMAGE
     */

    if (parallaxImage) {

        const rect =
            parallaxImage.parentElement
                .getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;

        if (
            rect.bottom > 0 &&
            rect.top < viewportHeight
        ) {

            const progress =
                (
                    viewportHeight - rect.top
                ) /
                (
                    viewportHeight + rect.height
                );

            const movement =
                (progress - .5) * 90;

            parallaxImage.style.transform =
                `translate3d(0, ${movement}px, 0)`;

        }

    }


    /*
     * CTA
     */

    if (ctaBackground) {

        const rect =
            ctaBackground.parentElement
                .getBoundingClientRect();

        if (
            rect.bottom > 0 &&
            rect.top < window.innerHeight
        ) {

            const progress =
                (
                    window.innerHeight - rect.top
                ) /
                (
                    window.innerHeight + rect.height
                );

            const movement =
                (progress - .5) * 50;

            ctaBackground.style.transform =
                `scale(1.08) translate3d(0, ${movement}px, 0)`;

        }

    }


    ticking = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateParallax
            );

            ticking = true;

        }

    },
    { passive: true }
);



/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });



/* =========================================================
   GALERIA POLAROID
========================================================= */

function createGallery() {

    if (!polaroidGallery) return;


    polaroidGallery.innerHTML = "";


    for (
        let index = 1;
        index <= SITE_CONFIG.imageCount;
        index++
    ) {

        const card =
            document.createElement("article");

        card.className = "polaroid";

        const image =
            document.createElement("img");

        const caption =
            document.createElement("span");


        const imagePath =
            `IMAGENS/vih${index}.jpg`;


        image.src =
            imagePath;

        image.alt =
            `Vih Borba — foto ${index}`;

        image.loading =
            index <= 5
                ? "eager"
                : "lazy";


        caption.className =
            "polaroid-caption";

        caption.textContent =
            `Vih / ${String(index).padStart(2, "0")}`;


        /*
         * Caso uma imagem não exista,
         * o card desaparece.
         */

        image.addEventListener(
            "error",
            () => {

                card.remove();

            }
        );


        card.appendChild(image);

        card.appendChild(caption);

        polaroidGallery.appendChild(card);


        /*
         * Clique abre o lightbox.
         */

        card.addEventListener(
            "click",
            () => {

                openLightbox(
                    imagePath,
                    `Vih Borba — foto ${index}`
                );

            }
        );

    }

}


createGallery();



/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(
    imagePath,
    altText
) {

    lightboxImage.src =
        imagePath;

    lightboxImage.alt =
        altText;

    lightbox.classList.add(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "menu-open"
    );

}


function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    lightboxImage.src = "";

    body.classList.remove(
        "menu-open"
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);



/* =========================================================
   REELS
========================================================= */

function createReels() {

    if (!reelsGrid) return;


    reelsGrid.innerHTML = "";


    for (
        let index = 1;
        index <= SITE_CONFIG.reelCount;
        index++
    ) {

        const card =
            document.createElement("article");

        card.className =
            "reel-card";


        const video =
            document.createElement("video");


        const overlay =
            document.createElement("div");

        overlay.className =
            "reel-overlay";


        const number =
            document.createElement("span");

        number.className =
            "reel-number";

        number.textContent =
            `REEL / ${String(index).padStart(2, "0")}`;


        const play =
            document.createElement("span");

        play.className =
            "reel-play";


        video.src =
            `REELS/bor${index}.mp4`;

        video.preload =
            "metadata";

        video.muted =
            true;

        video.loop =
            true;

        video.playsInline =
            true;


        /*
         * Vídeo inexistente:
         * remove o card.
         */

        video.addEventListener(
            "error",
            () => {

                card.remove();

            }
        );


        overlay.appendChild(
            number
        );


        card.appendChild(video);

        card.appendChild(overlay);

        card.appendChild(play);

        reelsGrid.appendChild(card);


        /*
         * Play / Pause
         */

        card.addEventListener(
            "click",
            () => {

                if (
                    video.paused
                ) {

                    /*
                     * Pausa outros reels.
                     */

                    document
                        .querySelectorAll(
                            ".reel-card video"
                        )
                        .forEach(
                            otherVideo => {

                                if (
                                    otherVideo !== video
                                ) {

                                    otherVideo.pause();

                                    otherVideo
                                        .closest(".reel-card")
                                        ?.classList
                                        .remove("playing");

                                }

                            }
                        );


                    video.play()
                        .then(() => {

                            card.classList.add(
                                "playing"
                            );

                        })
                        .catch(() => {});


                } else {

                    video.pause();

                    card.classList.remove(
                        "playing"
                    );

                }

            }
        );


        /*
         * Quando termina/reinicia.
         */

        video.addEventListener(
            "pause",
            () => {

                card.classList.remove(
                    "playing"
                );

            }
        );

    }

}


createReels();



/* =========================================================
   SMOOTH ANCHORS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor.getAttribute("href");


                if (
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });



/* =========================================================
   HERO FALLBACK
========================================================= */

if (heroImage) {

    heroImage.addEventListener(
        "error",
        () => {

            heroImage.style.display =
                "none";

        }
    );

}



/* =========================================================
   MOBILE RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900 &&
            mainNav.classList.contains("open")
        ) {

            closeMenu();

        }

    }
);



/* =========================================================
   INITIAL
========================================================= */

updateHeader();

updateScrollProgress();

updateParallax();