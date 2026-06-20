$(document).ready(function() {

    // 🔴 CAMBIA AQUÍ
    const mostrarContador = false;

    const tournamentDate = new Date("Jun 11, 2026 16:54:00").getTime();

    if (!mostrarContador) {

        $(".event-box").html(`
            <div class="coming-soon">
                <h3>PRÓXIMAMENTE</h3>
                <p>Estamos preparando nuevos torneos.</p>
                <a href="https://discord.gg/Rgj5SQPYKR" target="_blank" class="btn">
                    QUÉDATE ATENTO EN NUESTRO DISCORD
                </a>
            </div>
        `);

    } else {

        const timer = setInterval(function() {

            const now = new Date().getTime();
            const distance = tournamentDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $("#days").text(days < 10 ? "0" + days : days);
            $("#hours").text(hours < 10 ? "0" + hours : hours);
            $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
            $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);

            if (distance < 0) {

                clearInterval(timer);

                $(".event-box").html(`
                    <div class="coming-soon">
                        <h3>TORNEO EN CURSO</h3>
                        <p>Las inscripciones están cerradas.</p>
                    </div>
                `);

            }

        }, 1000);

    }

    // ── RECLUTAMIENTO ─────────────────────────

    const reclutamientoAbierto = true;

    if (reclutamientoAbierto) {

        $("#recruitmentBox").html(`
            <div class="recruitment-status">

                <h3>¿TIENES LO NECESARIO?</h3>

                <p>
                    Estamos buscando jugadores competitivos con mentalidad de crecimiento
                    para representar a Draconis Esports en futuras competencias.
                </p>

                <a href="https://forms.gle/c7qXdMmLVybxdbGbA"
                   target="_blank"
                   class="btn">
                    ENVIAR SOLICITUD
                </a>

            </div>
        `);

    } else {

        $("#recruitmentBox").html(`
            <div class="recruitment-status">

                <h3>NO HAY CONVOCATORIAS ACTIVAS</h3>

                <p>
                    Actualmente no estamos aceptando nuevos jugadores.
                    Mantente atento a futuras aperturas del roster de Draconis Esports.
                </p>

            </div>
        `);

    }

    // ── TIMELINE ─────────────────────────

    const timelineData = [

    {
        badge: "ORIGEN",
        title: "Fundación de Draconis",
        text: "Draconis Esports nace con el objetivo de construir una organización competitiva basada en disciplina, compromiso y desarrollo constante.",
        date: "Enero • 2026"
    },

    {
        badge: "CAMPEÓN",
        title: "Symphony LAN",
        text: "Draconis se coronó campeón de Symphony LAN, torneo organizado a través de Vortex con la participación de 32 equipos, consiguiendo el primer título oficial de la organización.",
        date: "Junio • 2026"
    },

    {
        badge: "FUTURO",
        title: "Próximos objetivos",
        text: "La organización continúa expandiendo su roster, desarrollando su comunidad y preparándose para futuras competiciones y proyectos propios.",
        date: "2026"
    }

];

    let currentSlide = 0;

    function renderTimeline() {

        const item = timelineData[currentSlide];

        $("#timelineBadge").text(item.badge);
        $("#timelineTitle").text(item.title);
        $("#timelineText").text(item.text);
        $("#timelineDate").text(item.date);

        let dots = "";

        timelineData.forEach((_, index) => {

            dots += `
                <div class="timeline-dot ${index === currentSlide ? 'active' : ''}"
                     data-index="${index}">
                </div>
            `;

        });

        $("#timelineDots").html(dots);

    }

    if ($("#timelineBadge").length) {

        renderTimeline();

        $("#nextSlide").on("click", function() {

            currentSlide++;

            if (currentSlide >= timelineData.length) {
                currentSlide = 0;
            }

            renderTimeline();

        });

        $("#prevSlide").on("click", function() {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = timelineData.length - 1;
            }

            renderTimeline();

        });

        $(document).on("click", ".timeline-dot", function() {

            currentSlide = parseInt($(this).data("index"));

            renderTimeline();

        });

    }

    // ── SPONSOR BAR ─────────────────────────────

    const track = document.getElementById('sponsorTrack');

    if (track) {

        const textoOriginal = track.querySelector('.sponsor-content').innerHTML;

        const medidor = document.createElement('span');

        medidor.style.cssText = `
            position:absolute;
            visibility:hidden;
            white-space:nowrap;
            font-family:Orbitron,sans-serif;
            font-size:14px;
            padding:10px 40px;
        `;

        medidor.innerHTML = textoOriginal;

        document.body.appendChild(medidor);

        const textoW = medidor.offsetWidth;

        document.body.removeChild(medidor);

        const reps = Math.ceil(window.innerWidth / textoW) + 2;

        let bloque = '';

        for (let i = 0; i < reps; i++) {

            bloque += `
                <span class="sponsor-content">
                    ${textoOriginal}
                </span>
            `;

        }

        track.innerHTML = `
            <div class="sponsor-bloque" id="bloqueA">${bloque}</div>
            <div class="sponsor-bloque" id="bloqueB">${bloque}</div>
        `;

        const bloqueW = document.getElementById('bloqueA').offsetWidth;

        const duracion = bloqueW / 80;

        const style = document.createElement('style');

        style.innerHTML = `
            .sponsor-track {
                display:flex !important;
                width:max-content !important;
                animation:scroll-infinito ${duracion}s linear infinite !important;
            }

            @keyframes scroll-infinito {

                0% {
                    transform:translateX(0px);
                }

                100% {
                    transform:translateX(-${bloqueW}px);
                }

            }
        `;

        document.head.appendChild(style);

    }

});

