document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // TRUCUL 1: FUNCȚIA DE CĂUTARE ÎN PAGINĂ (Obligatorie)
    // ==========================================
    const searchForm = document.querySelector('form[role="search"]');
    
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Oprim reîncărcarea paginii
            
            const searchInput = searchForm.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm === "") {
                alert("Te rugăm să introduci un cuvânt pentru căutare.");
                return;
            }
            
            // Eliminăm evidențierile anterioare (dacă există)
            removeHighlights(document.body);
            
            // Căutăm cuvântul în corpul textului paginii
            const gasit = highlightText(document.body, searchTerm);
            
            if (!gasit) {
                // Nielsen Euristică 9: Mesaj clar în limbaj simplu
                alert(`Nu am găsit rezultate pentru: "${searchTerm}". Încearcă cuvinte ca 'vineri', 'bega' sau 'concert'.`);
            } else {
                // Dacă s-a găsit, facem scroll automat la primul element evidențiat
                const primulElement = document.querySelector('mark.search-highlight');
                if (primulElement) {
                    primulElement.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
        });
    }

    // Funcție secundară: Îngălbenește textul găsit
    function highlightText(element, term) {
        if (element.nodeType === 3) { // Nod de text
            const text = element.nodeValue;
            const regex = new RegExp(`(${term})`, "gi");
            
            if (regex.test(text)) {
                const span = document.createElement("span");
                span.innerHTML = text.replace(regex, '<mark class="search-highlight" style="background-color: yellow; color: black; padding: 2px; border-radius: 2px;">$1</mark>');
                element.parentNode.replaceChild(span, element);
                return true;
            }
        } else if (element.nodeType === 1 && element.childNodes && !/(script|style|nav|form)/i.test(element.tagName)) {
            // Căutăm în toți copiii elementului, dar ignorăm meniurile, scripturile și stilurile
            let sAuGasitRezultate = false;
            for (let i = 0; i < element.childNodes.length; i++) {
                const gasitInCopil = highlightText(element.childNodes[i], term);
                if (gasitInCopil) sAuGasitRezultate = true;
            }
            return sAuGasitRezultate;
        }
        return false;
    }

    // Funcție secundară: Curăță evidențierile vechi
    function removeHighlights(element) {
        const highlights = element.querySelectorAll('mark.search-highlight');
        highlights.forEach(highlight => {
            const parinte = highlight.parentNode;
            parinte.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parinte.normalize(); // Unește nodurile de text sparte
        });
    }


    // ==========================================
    // TRUCUL 2: VALIDAREA FORMULARULUI DE CONTACT
    // ==========================================
    const formContact = document.getElementById("formContact");
    const mesajSucces = document.getElementById("mesajSucces");

    if (formContact) {
        formContact.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            let formularValid = true;

            // Validare Email
            const emailInput = document.getElementById("email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add("is-invalid");
                formularValid = false;
            } else {
                emailInput.classList.remove("is-invalid");
                emailInput.classList.add("is-valid");
            }

            // Validare Telefon
            const telefonInput = document.getElementById("telefon");
            const telefonRegex = /^[0-9]{10}$/;
            if (!telefonRegex.test(telefonInput.value)) {
                telefonInput.classList.add("is-invalid");
                formularValid = false;
            } else {
                telefonInput.classList.remove("is-invalid");
                telefonInput.classList.add("is-valid");
            }

            // Validare Nume și Mesaj
            const numeInput = document.getElementById("nume");
            const mesajInput = document.getElementById("mesaj");

            if (numeInput.value.trim() === "") {
                numeInput.classList.add("is-invalid");
                formularValid = false;
            } else {
                numeInput.classList.remove("is-invalid");
                numeInput.classList.add("is-valid");
            }

            if (mesajInput.value.trim() === "") {
                mesajInput.classList.add("is-invalid");
                formularValid = false;
            } else {
                mesajInput.classList.remove("is-invalid");
                mesajInput.classList.add("is-valid");
            }

            if (formularValid) {
                mesajSucces.classList.remove("d-none");
                formContact.reset();
                setTimeout(() => {
                    numeInput.classList.remove("is-valid");
                    emailInput.classList.remove("is-valid");
                    telefonInput.classList.remove("is-valid");
                    mesajInput.classList.remove("is-valid");
                }, 5000);
            } else {
                mesajSucces.classList.add("d-none");
            }
        });
    }
});