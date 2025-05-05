// Inicialização do AOS
AOS.init({
    duration: 800,
    once: true
});

// Inicialização do Fancybox
Fancybox.bind('[data-fancybox]', {
    // Opções do Fancybox
});

// Sistema de preços
const precos = {
    carro: {
        'lavagem-simples': {
            pequeno: 50,
            medio: 60,
            grande: 70
        },
        'lavagem-completa': {
            pequeno: 80,
            medio: 100,
            grande: 120
        },
        'polimento': {
            pequeno: 250,
            medio: 300,
            grande: 350
        }
    },
    moto: {
        'lavagem-simples-moto': {
            pequeno: 35,
            medio: 45,
            grande: 55
        },
        'lavagem-detalhada-moto': {
            pequeno: 60,
            medio: 80,
            grande: 100
        }
    }
};

// Atualização dos serviços baseado no tipo de veículo
document.addEventListener('DOMContentLoaded', function() {
    const servicoSelect = document.getElementById('servico');
    const tipoVeiculoInputs = document.querySelectorAll('input[name="tipoVeiculo"]');
    const tamanhoInputs = document.querySelectorAll('input[name="tamanho"]');
    const precoEstimado = document.querySelector('#precoEstimado strong');

    // Função para atualizar serviços
    function atualizarServicos(tipoVeiculo) {
        servicoSelect.innerHTML = '<option value="">Selecione o Serviço</option>';
        
        if (tipoVeiculo === 'carro') {
            servicoSelect.innerHTML += `
                <option value="lavagem-simples">Lavagem Simples</option>
                <option value="lavagem-completa">Lavagem Completa</option>
                <option value="polimento">Polimento</option>
            `;
        } else {
            servicoSelect.innerHTML += `
                <option value="lavagem-simples-moto">Lavagem Simples</option>
                <option value="lavagem-detalhada-moto">Lavagem Detalhada</option>
            `;
        }
    }

    // Função para calcular preço
    function calcularPreco() {
        const tipoVeiculo = document.querySelector('input[name="tipoVeiculo"]:checked')?.value;
        const servico = servicoSelect.value;
        const tamanho = document.querySelector('input[name="tamanho"]:checked')?.value;

        if (tipoVeiculo && servico && tamanho && precos[tipoVeiculo][servico]) {
            const preco = precos[tipoVeiculo][servico][tamanho];
            precoEstimado.textContent = `R$ ${preco.toFixed(2)}`;
        } else {
            precoEstimado.textContent = 'R$ 0,00';
        }
    }

    // Event listeners
    tipoVeiculoInputs.forEach(input => {
        input.addEventListener('change', () => {
            atualizarServicos(input.value);
            calcularPreco();
        });
    });

    servicoSelect.addEventListener('change', calcularPreco);
    
    tamanhoInputs.forEach(input => {
        input.addEventListener('change', calcularPreco);
    });

    // Inicializar com o tipo de veículo padrão
    atualizarServicos('carro');
});


// Filtros da Galeria
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemType = item.getAttribute('data-type');
                
                if (filterValue === 'all' || filterValue === itemType) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});


// Funcionalidade do Modal de Vídeo
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoLinks = document.querySelectorAll('.video-link');
    const closeModal = document.querySelector('.close-modal');

    // Abrir modal e reproduzir vídeo
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Previne rolagem
        });
    });

    // Fechar modal
    function closeVideoModal() {
        modal.style.display = 'none';
        videoPlayer.src = '';
        document.body.style.overflow = ''; // Restaura rolagem
    }

    closeModal.addEventListener('click', closeVideoModal);

    // Fechar modal ao clicar fora do vídeo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeVideoModal();
        }
    });
});