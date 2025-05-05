// Máscaras para os campos
$(document).ready(function(){
    $('#cpf').mask('000.000.000-00');
    $('#telefone').mask('(00) 00000-0000');
});

// Validação do formulário
(function () {
    'use strict'

    // Busca todos os formulários que precisam de validação
    var forms = document.querySelectorAll('.needs-validation')

    // Função para validar CPF
    function validaCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');
        if(cpf == '') return false;
        if(cpf.length != 11) return false;

        // Validação do primeiro dígito
        let add = 0;
        for(let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rev = 11 - (add % 11);
        if(rev == 10 || rev == 11) rev = 0;
        if(rev != parseInt(cpf.charAt(9))) return false;

        // Validação do segundo dígito
        add = 0;
        for(let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rev = 11 - (add % 11);
        if(rev == 10 || rev == 11) rev = 0;
        if(rev != parseInt(cpf.charAt(10))) return false;

        return true;
    }

    // Loop sobre os formulários e previne submissão se inválido
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    
                    // Validação adicional do CPF
                    const cpf = document.getElementById('cpf').value;
                    if(!validaCPF(cpf)) {
                        document.getElementById('cpf').setCustomValidity('CPF inválido');
                        form.classList.add('was-validated');
                        return;
                    }

                    // Se tudo estiver válido, envia mensagem para o WhatsApp
                    const nome = document.getElementById('nome').value;
                    const telefone = document.getElementById('telefone').value;
                    const email = document.getElementById('email').value;
                    const tipoVeiculo = document.getElementById('tipoVeiculo').value;
                    const servico = document.getElementById('servico').value;
                    const mensagem = document.getElementById('mensagem').value;

                    // Função para formatar a mensagem do WhatsApp
                    function formatarMensagemWhatsApp(dados) {
                        return `*Novo Agendamento - Car 360*

                        👤 *Nome:* ${dados.nome}
                        📱 *Telefone:* ${dados.telefone}
                        📧 *E-mail:* ${dados.email}

                        🚗 *Tipo de Veículo:* ${dados.tipoVeiculo}
                        🔧 *Serviço Desejado:* ${dados.servico}

                        ${dados.mensagem ? `💬 *Mensagem Adicional:*\n${dados.mensagem}` : ''}

                        -------------------
                        Enviado via site Car 360`;
                    }

                    // Validação e envio do formulário
                    document.getElementById('contactForm').addEventListener('submit', function(event) {
                        event.preventDefault();
                        
                        if (this.checkValidity()) {
                            // Coleta os dados do formulário
                            const dados = {
                                nome: document.getElementById('nome').value,
                                telefone: document.getElementById('telefone').value,
                                email: document.getElementById('email').value,
                                tipoVeiculo: document.getElementById('tipoVeiculo').value,
                                servico: document.getElementById('servico').value,
                                mensagem: document.getElementById('mensagem').value
                            };

                            // Formata a mensagem e envia para o WhatsApp
                            const mensagemFormatada = formatarMensagemWhatsApp(dados);
                            const numeroWhatsApp = '5591998116629';
                            
                            // Abre o WhatsApp com a mensagem formatada
                            window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemFormatada)}`);
                            
                            // Limpa o formulário
                            this.reset();
                            
                            // Feedback para o usuário
                            alert('Agendamento enviado com sucesso! Você será redirecionado para o WhatsApp.');
                        }
                        
                        this.classList.add('was-validated');
                    });
                }

                form.classList.add('was-validated');
            }, false)
        })
})()