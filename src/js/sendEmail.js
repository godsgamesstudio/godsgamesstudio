emailjs.init("oFu7Pf0pZEL99iQgd");

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio tradicional do formulário

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    // Envio de e-mail usando EmailJS
    emailjs.send("service_6gcjtjt", "template_6n019ud", {
        name: name,
        email: email,
        subject: subject,
        message: message
    }).then(function(response) {
        showAlert("Mensagem enviada com sucesso!", "success");
        console.log("Mensagem enviada:", response);
    }).catch(function(error) {
        showAlert("Erro ao enviar a mensagem. Tente novamente.", "error");
        console.log("Erro:", error);
    });
});

function showAlert(message, type) {
    var alertBox = document.getElementById("custom-alert");
    var alertMessage = document.getElementById("alert-message");
    var closeButton = document.getElementById("close-alert");

    // Atualiza o texto do alerta
    alertMessage.innerText = message;

    // Altera a cor do alerta com base no tipo
    if (type === "success") {
        alertBox.classList.add("bg-opacity-50");
        alertBox.classList.add("flex")
    } else if (type === "error") {
        alertBox.classList.add("bg-opacity-50");
        alertBox.classList.add("flex")
    }

    // Limpa os campos do formulário
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
    
    // Exibe o alerta
    alertBox.classList.remove("hidden");

    // Fecha o alerta quando o botão de fechar é clicado
    closeButton.addEventListener("click", function() {
        alertBox.classList.remove("flex")
        alertBox.classList.add("hidden");
    });

    // Fecha o alerta após 5 segundos
    setTimeout(function() {
        alertBox.classList.add("hidden");
    }, 5000);
}