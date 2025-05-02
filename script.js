// Dados dos serviços
const servicos = {
    carro: {
        "Lavagem Simples": {
            pequeno: 50.00,
            medio: 70.00,
            grande: 100.00
        },
        "Limpeza Especializada": {
            pequeno: 100.00,
            medio: 140.00,
            grande: 200.00
        },
        "Limpeza Detalhada": {
            pequeno: 150.00,
            medio: 210.00,
            grande: 300.00
        }
    },
    moto: {
        "Limpeza Especializada": {
            pequeno: 100.00,
            medio: 150.00,
            grande: 200.00
        },
        "Limpeza Detalhada": {
            pequeno: 150.00,
            medio: 200.00,
            grande: 250.00
        }
    }
};

// Função para atualizar os serviços disponíveis
function atualizarServicos() {
    const tipoVeiculo = document.querySelector('input[name="tipoVeiculo"]:checked').value;
    const servicoSelect = document.getElementById('servico');
    const servicosDisponiveis = servicos[tipoVeiculo];

    // Limpa as opções atuais
    servicoSelect.innerHTML = '<option value="">Selecione o Serviço</option>';

    // Adiciona as novas opções
    Object.keys(servicosDisponiveis).forEach(servico => {
        const option = document.createElement('option');
        option.value = servico;
        option.textContent = servico;
        servicoSelect.appendChild(option);
    });

    // Reseta a seleção de tamanho
    document.querySelectorAll('input[name="tamanho"]').forEach(radio => radio.checked = false);
    
    // Atualiza o preço
    atualizarPreco();
}

// Função para atualizar o preço
function atualizarPreco() {
    const tipoVeiculo = document.querySelector('input[name="tipoVeiculo"]:checked').value;
    const servico = document.getElementById('servico').value;
    const tamanho = document.querySelector('input[name="tamanho"]:checked')?.value;
    const precoEstimado = document.getElementById('precoEstimado');

    if (servico && tamanho && servicos[tipoVeiculo][servico]) {
        const preco = servicos[tipoVeiculo][servico][tamanho];
        precoEstimado.innerHTML = `Preço Estimado: <strong>R$ ${preco.toFixed(2)}</strong>`;
    } else {
        precoEstimado.innerHTML = 'Preço Estimado: <strong>R$ 0,00</strong>';
    }
}

// Event Listeners
document.querySelectorAll('input[name="tipoVeiculo"]').forEach(radio => {
    radio.addEventListener('change', atualizarServicos);
});

document.getElementById('servico').addEventListener('change', atualizarPreco);

document.querySelectorAll('input[name="tamanho"]').forEach(radio => {
    radio.addEventListener('change', atualizarPreco);
});

// Inicializa os serviços quando a página carrega
document.addEventListener('DOMContentLoaded', atualizarServicos);

// Manipulação do formulário
// Adicionar feedback visual ao formulário
// Função para validar número de WhatsApp
function validarWhatsApp(numero) {
    // Remove caracteres não numéricos
    numero = numero.replace(/\D/g, '');
    
    // Verifica se o número tem o formato correto (DDD + 9 dígitos)
    if (!/^\d{2}9\d{8}$/.test(numero)) {
        return false;
    }
    
    return true;
}

// Adicionar máscara ao campo WhatsApp
document.getElementById('whatsapp').addEventListener('input', function(e) {
    let numero = e.target.value.replace(/\D/g, '');
    
    if (numero.length >= 11) {
        numero = numero.substring(0, 11);
    }
    
    if (numero.length > 0) {
        if (numero.length <= 2) {
            numero = `(${numero}`;
        } else if (numero.length <= 7) {
            numero = `(${numero.substring(0, 2)}) ${numero.substring(2)}`;
        } else {
            numero = `(${numero.substring(0, 2)}) ${numero.substring(2, 7)}-${numero.substring(7)}`;
        }
    }
    
    e.target.value = numero;
});

// Função para validar placa de veículo
function validarPlaca(placa) {
    // Remove espaços e traços
    placa = placa.trim().replace(/-/g, '').toUpperCase();
    
    // Padrão antigo: ABC1234
    const padraoAntigo = /^[A-Z]{3}[0-9]{4}$/;
    
    // Padrão Mercosul: ABC1D23
    const padraoMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    
    return padraoAntigo.test(placa) || padraoMercosul.test(placa);
}

// Adicionar máscara ao campo placa
document.getElementById('placa').addEventListener('input', function(e) {
    let placa = e.target.value.toUpperCase();
    
    // Remove caracteres inválidos
    placa = placa.replace(/[^A-Z0-9-]/g, '');
    
    // Limita o tamanho
    if (placa.length > 8) {
        placa = placa.substring(0, 8);
    }
    
    // Adiciona o hífen para o formato antigo
    if (placa.length > 3 && !placa.includes('-')) {
        placa = placa.slice(0, 3) + '-' + placa.slice(3);
    }
    
    e.target.value = placa;
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação dos campos obrigatórios
    const nome = document.getElementById('nome').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim().replace(/\D/g, '');
    const placa = document.getElementById('placa').value.trim();
    const servico = document.getElementById('servico').value;
    const tamanho = document.querySelector('input[name="tamanho"]:checked')?.value;

    // Validação específica do WhatsApp
    if (!validarWhatsApp(whatsapp)) {
        Swal.fire({
            title: 'Número de WhatsApp Inválido!',
            text: 'Por favor, insira um número de WhatsApp válido com DDD (Ex: (91) 98859-2333)',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#FF0000'
        });
        return;
    }

    // Validação da placa
    if (!validarPlaca(placa)) {
        Swal.fire({
            title: 'Placa Inválida!',
            html: `
                <div class="text-start">
                    <p>Por favor, insira uma placa válida.</p>
                    <p>Formatos aceitos:</p>
                    <ul>
                        <li>Padrão antigo: ABC-1234</li>
                        <li>Padrão Mercosul: ABC1D23</li>
                    </ul>
                </div>
            `,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#FF0000'
        });
        return;
    }

    // Lista de campos obrigatórios e suas mensagens
    const camposObrigatorios = [
        { valor: nome, nome: 'Nome' },
        { valor: whatsapp, nome: 'WhatsApp' },
        { valor: placa, nome: 'Placa do Veículo' },
        { valor: servico, nome: 'Serviço' },
        { valor: tamanho, nome: 'Tamanho do Veículo' }
    ];

    // Verifica campos vazios
    const camposVazios = camposObrigatorios
        .filter(campo => !campo.valor)
        .map(campo => campo.nome);

    if (camposVazios.length > 0) {
        Swal.fire({
            title: 'Campos Obrigatórios!',
            html: `
                <div class="text-start">
                    <p>Por favor, preencha os seguintes campos:</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        ${camposVazios.map(campo => `<li>• ${campo}</li>`).join('')}
                    </ul>
                </div>
            `,
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#FF0000'
        });
        return;
    }

    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    button.disabled = true;
    
    setTimeout(() => {
        const whatsapp = document.getElementById('whatsapp').value;
        const tipoVeiculo = document.querySelector('input[name="tipoVeiculo"]:checked').value;
        const tamanho = document.querySelector('input[name="tamanho"]:checked').value;
        const preco = servicos[tipoVeiculo][servico][tamanho];

        // Mensagem formatada para WhatsApp
        const mensagem = `*Novo Agendamento Car-360*\n\n` +
            `*Nome:* ${nome}\n` +
            `*WhatsApp:* ${whatsapp}\n` +
            `*Placa:* ${placa}\n` +
            `*Tipo de Veículo:* ${tipoVeiculo}\n` +
            `*Serviço:* ${servico}\n` +
            `*Tamanho:* ${tamanho}\n` +
            `*Preço:* R$ ${preco.toFixed(2)}`;

        // Número do WhatsApp da empresa
        const numeroEmpresa = "5591989776418";

        // Criar link do WhatsApp - Adiciona o código do país (55) apenas ao enviar
        const linkWhatsApp = `https://wa.me/55${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(mensagem)}`;

        Swal.fire({
            title: 'Agendamento Recebido!',
            html: `
                <div class="text-start">
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                    <p><strong>Placa:</strong> ${placa}</p>
                    <p><strong>Serviço:</strong> ${servico}</p>
                    <p><strong>Tipo:</strong> ${tipoVeiculo}</p>
                    <p><strong>Tamanho:</strong> ${tamanho}</p>
                    <p><strong>Preço:</strong> R$ ${preco.toFixed(2)}</p>
                </div>
            `,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Confirmar no WhatsApp',
            cancelButtonText: 'Fechar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(linkWhatsApp, '_blank');
            }
        });

        this.reset();
        atualizarServicos();
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
});

document.addEventListener('DOMContentLoaded', function() {
    var imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var imageUrl = button.getAttribute('data-bs-image');
            var modalImage = document.getElementById('modalImage');
            modalImage.src = imageUrl;
        });
    }
});

// Funções para a galeria
// Variáveis globais para a galeria
let galeriaImagens = [];
let indiceAtual = 0;

// Função para inicializar a galeria
function inicializarGaleria() {
    // Coleta todas as imagens da galeria
    galeriaImagens = Array.from(document.querySelectorAll('.gallery-image img')).map(img => ({
        src: img.src,
        alt: img.alt
    }));

    // Adiciona miniaturas ao modal
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    galeriaImagens.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.className = 'gallery-thumbnail';
        thumb.onclick = () => abrirImagem(index);
        thumbnailsContainer.appendChild(thumb);
    });
}

// Função para abrir imagem específica
function abrirImagem(index) {
    indiceAtual = index;
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.querySelector('.modal-title');
    
    modalImage.src = galeriaImagens[index].src;
    modalImage.alt = galeriaImagens[index].alt;
    modalTitle.textContent = galeriaImagens[index].alt;
    
    // Atualiza miniaturas ativas
    document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Função para navegar entre imagens
function navegarGaleria(direcao) {
    let novoIndice = indiceAtual;
    
    if (direcao === 'next') {
        novoIndice = (indiceAtual + 1) % galeriaImagens.length;
    } else {
        novoIndice = (indiceAtual - 1 + galeriaImagens.length) % galeriaImagens.length;
    }
    
    abrirImagem(novoIndice);
}

// Função para inicializar o carrossel
function inicializarCarrossel() {
    const carouselInner = document.querySelector('#imageCarousel .carousel-inner');
    const indicators = document.querySelector('#imageCarousel .carousel-indicators');
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    
    // Limpa os containers
    carouselInner.innerHTML = '';
    indicators.innerHTML = '';
    thumbnailsContainer.innerHTML = '';
    
    // Coleta todas as imagens da galeria
    const imagens = Array.from(document.querySelectorAll('.gallery-image img'));
    
    // Adiciona cada imagem ao carrossel
    imagens.forEach((img, index) => {
        // Adiciona slide
        const slide = document.createElement('div');
        slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${img.src}" class="d-block w-100" alt="${img.alt}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${img.alt}</h5>
            </div>
        `;
        carouselInner.appendChild(slide);
        
        // Adiciona indicador
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#imageCarousel');
        indicator.setAttribute('data-bs-slide-to', index.toString());
        if (index === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        indicators.appendChild(indicator);
        
        // Adiciona miniatura
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.style.width = '60px';
        thumb.style.height = '60px';
        thumb.style.objectFit = 'cover';
        thumb.style.cursor = 'pointer';
        thumb.onclick = () => {
            const carousel = new bootstrap.Carousel(document.getElementById('imageCarousel'));
            carousel.to(index);
            atualizarMiniaturas(index);
        };
        thumbnailsContainer.appendChild(thumb);
    });
}

// Função para atualizar miniaturas ativas
function atualizarMiniaturas(indiceAtivo) {
    document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === indiceAtivo);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o carrossel quando o modal é aberto
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function(event) {
            inicializarCarrossel();
            
            // Encontra o índice da imagem clicada
            const button = event.relatedTarget;
            const imagemSrc = button.getAttribute('data-bs-image');
            const imagens = Array.from(document.querySelectorAll('.gallery-image img'));
            const index = imagens.findIndex(img => img.src.includes(imagemSrc));
            
            // Vai para o slide correto
            if (index !== -1) {
                const carousel = new bootstrap.Carousel(document.getElementById('imageCarousel'));
                carousel.to(index);
                atualizarMiniaturas(index);
            }
        });
        
        // Atualiza miniaturas quando o slide muda
        document.getElementById('imageCarousel').addEventListener('slide.bs.carousel', function(event) {
            atualizarMiniaturas(event.to);
        });
    }
});

// Adiciona navegação por teclado
document.addEventListener('keydown', function(e) {
    if (document.getElementById('imageModal').classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            navegarGaleria('prev');
        } else if (e.key === 'ArrowRight') {
            navegarGaleria('next');
        }
    }
});