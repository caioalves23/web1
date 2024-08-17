function changeStatus(event) {
    const element = event.target.closest(".ambiente");
    if (element.classList.contains("ocupado")) {
        element.classList.remove("ocupado");
        element.classList.add("livre");
    } else if (element.classList.contains("livre")) {
        element.classList.remove("livre");
        element.classList.add("manutencao");
    } else if (element.classList.contains("manutencao")) {
        element.classList.remove("manutencao");
        element.classList.add("ocupado");
    }
}

function saveStatus() {
    const ambientes = document.querySelectorAll(".ambiente");
    const status = {};
    ambientes.forEach(function(ambiente) {
        status[ambiente.querySelector("span").textContent] = ambiente.className;
    });
    localStorage.setItem("ambienteStatus", JSON.stringify(status));
}

function loadStatus() {
    const status = JSON.parse(localStorage.getItem("ambienteStatus"));
    if (status) {
        const ambientes = document.querySelectorAll(".ambiente");
        ambientes.forEach(function(ambiente) {
            const spanText = ambiente.querySelector("span").textContent;
            if (status[spanText]) {
                ambiente.className = status[spanText];
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    const ambientes = document.querySelectorAll(".ambiente");
    ambientes.forEach(function(ambiente) {
        ambiente.addEventListener("click", changeStatus);
    });

    loadStatus(); 

    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", saveStatus);
});