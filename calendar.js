// Elementos do DOM
const calendarDays = document.getElementById('calendarDays');
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const moonPhaseDisplay = document.getElementById('moonPhaseDisplay');
const moonTips = document.getElementById('moonTips');

// Estado do calendário
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Nomes dos meses em português
const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Fases da lua e suas dicas
const moonPhases = {
    'Lua Nova': {
        emoji: '🌑',
        tips: {
            positivas: [
                'Ideal para plantar raízes e tubérculos',
                'Bom período para podar plantas doentes',
                'Ótimo para semear plantas que crescem abaixo da terra',
                'Período favorável para transplantar mudas'
            ],
            negativas: [
                'Evite colher frutos e flores',
                'Não é recomendado fazer enxertos',
                'Evite podar plantas saudáveis',
                'Não é o melhor momento para fertilização'
            ]
        }
    },
    'Lua Crescente': {
        emoji: '🌒',
        tips: {
            positivas: [
                'Período favorável para plantar folhas e flores',
                'Bom para fertilização do solo',
                'Ideal para semear plantas que crescem acima da terra',
                'Ótimo para fazer mudas por estacas'
            ],
            negativas: [
                'Evite podar plantas',
                'Não é recomendado colher raízes',
                'Evite transplantar plantas frágeis',
                'Não é o melhor momento para controle de pragas'
            ]
        }
    },
    'Quarto Crescente': {
        emoji: '🌓',
        tips: {
            positivas: [
                'Ótimo para plantar frutos e sementes',
                'Ideal para colheita de frutos',
                'Bom período para enxertia',
                'Favorável para adubação foliar'
            ],
            negativas: [
                'Evite podar plantas',
                'Não é recomendado transplantar',
                'Evite trabalhar com raízes',
                'Não é o melhor momento para controle de ervas daninhas'
            ]
        }
    },
    'Lua Cheia': {
        emoji: '🌕',
        tips: {
            positivas: [
                'Ideal para colheita e armazenamento',
                'Bom para podar plantas saudáveis',
                'Ótimo para colher sementes',
                'Período favorável para fazer conservas'
            ],
            negativas: [
                'Evite semear novas plantas',
                'Não é recomendado fazer mudas',
                'Evite transplantar',
                'Não é o melhor momento para adubação'
            ]
        }
    },
    'Quarto Minguante': {
        emoji: '🌗',
        tips: {
            positivas: [
                'Bom para podar e controlar crescimento',
                'Ideal para colher raízes',
                'Ótimo para controle de pragas',
                'Favorável para capinar e limpar o jardim'
            ],
            negativas: [
                'Evite semear plantas que crescem acima da terra',
                'Não é recomendado fazer enxertos',
                'Evite fertilização',
                'Não é o melhor momento para colher frutos'
            ]
        }
    },
    'Lua Minguante': {
        emoji: '🌘',
        tips: {
            positivas: [
                'Período de descanso para o jardim',
                'Bom para planejamento',
                'Ideal para preparar o solo',
                'Ótimo para fazer compostagem'
            ],
            negativas: [
                'Evite semear qualquer tipo de planta',
                'Não é recomendado fazer podas',
                'Evite transplantar',
                'Não é o melhor momento para colheitas'
            ]
        }
    }
};

// Função para converter UTC para horário de Brasília
function convertToBrasiliaTime(date) {
    // Horário de Brasília (UTC-3)
    const brasiliaOffset = -3;
    const utcDate = new Date(date);
    const brasiliaDate = new Date(utcDate.getTime() + (brasiliaOffset * 60 * 60 * 1000));
    return brasiliaDate;
}

// Função para calcular a fase lunar aproximada para o Brasil
function calculateMoonPhase(date) {
    // Data da última lua nova conhecida no Brasil (ajustada para horário de Brasília)
    const lastNewMoon = new Date('2024-03-10T06:00:00-03:00'); // Última lua nova em Brasília
    const lunarMonth = 29.530588853; // Duração média do mês lunar em dias
    
    // Converter a data para horário de Brasília
    const brasiliaDate = convertToBrasiliaTime(date);
    
    // Calcular dias desde a última lua nova
    const daysSinceNewMoon = (brasiliaDate - lastNewMoon) / (1000 * 60 * 60 * 24);
    
    // Calcular a fase atual (0 a 1)
    const phase = (daysSinceNewMoon % lunarMonth) / lunarMonth;
    
    // Determinar a fase lunar com ajustes para o Brasil
    // Os valores foram ajustados para corresponder melhor às fases observadas no Brasil
    if (phase < 0.03 || phase >= 0.97) return 'Lua Nova';
    if (phase < 0.22) return 'Lua Crescente';
    if (phase < 0.28) return 'Quarto Crescente';
    if (phase < 0.47) return 'Lua Crescente';
    if (phase < 0.53) return 'Lua Cheia';
    if (phase < 0.72) return 'Lua Minguante';
    if (phase < 0.78) return 'Quarto Minguante';
    return 'Lua Minguante';
}

// Função para obter a próxima mudança de fase lunar
function getNextPhaseChange(date) {
    const currentPhase = calculateMoonPhase(date);
    const lunarMonth = 29.530588853;
    const lastNewMoon = new Date('2024-03-10T06:00:00-03:00');
    const brasiliaDate = convertToBrasiliaTime(date);
    
    const daysSinceNewMoon = (brasiliaDate - lastNewMoon) / (1000 * 60 * 60 * 24);
    const currentPhaseValue = (daysSinceNewMoon % lunarMonth) / lunarMonth;
    
    // Definir os limites das fases
    const phaseLimits = {
        'Lua Nova': [0.97, 0.03],
        'Lua Crescente': [0.03, 0.22],
        'Quarto Crescente': [0.22, 0.28],
        'Lua Crescente': [0.28, 0.47],
        'Lua Cheia': [0.47, 0.53],
        'Lua Minguante': [0.53, 0.72],
        'Quarto Minguante': [0.72, 0.78],
        'Lua Minguante': [0.78, 0.97]
    };
    
    // Encontrar o próximo limite de fase
    let nextLimit = 1;
    for (const [phase, [start, end]] of Object.entries(phaseLimits)) {
        if (currentPhaseValue >= start && currentPhaseValue < end) {
            nextLimit = end;
            break;
        }
    }
    
    // Calcular dias até a próxima mudança
    const daysToNextPhase = (nextLimit - currentPhaseValue) * lunarMonth;
    const nextPhaseDate = new Date(brasiliaDate.getTime() + (daysToNextPhase * 24 * 60 * 60 * 1000));
    
    return {
        nextDate: nextPhaseDate,
        daysRemaining: Math.round(daysToNextPhase)
    };
}

// Função para atualizar o display da fase lunar
function updateMoonPhaseDisplay() {
    const now = new Date();
    const phase = calculateMoonPhase(now);
    const phaseInfo = moonPhases[phase];
    const nextPhase = getNextPhaseChange(now);
    
    // Formatar a data da próxima mudança
    const nextPhaseDate = nextPhase.nextDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    moonPhaseDisplay.innerHTML = `
        <div class="moon-emoji-large">${phaseInfo.emoji}</div>
        <p>${phase}</p>
        <p class="next-phase">Próxima mudança: ${nextPhaseDate}</p>
        <p class="days-remaining">Faltam ${nextPhase.daysRemaining} dias</p>
    `;
    
    // Criar HTML para as dicas
    const tipsHTML = `
        <div class="moon-tips-container">
            <div class="tips-positive">
                <h4>O que fazer:</h4>
                <ul>
                    ${phaseInfo.tips.positivas.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            <div class="tips-negative">
                <h4>O que evitar:</h4>
                <ul>
                    ${phaseInfo.tips.negativas.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    moonTips.innerHTML = tipsHTML;
}

// Função para mostrar as dicas do dia selecionado
function showDayTips(date, phase) {
    const phaseInfo = moonPhases[phase];
    const formattedDate = date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Criar o modal de dicas
    const modalHTML = `
        <div class="day-tips-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${formattedDate}</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="phase-info">
                        <span class="moon-emoji-large">${phaseInfo.emoji}</span>
                        <h4>${phase}</h4>
                    </div>
                    <div class="moon-tips-container">
                        <div class="tips-positive">
                            <h4>O que fazer:</h4>
                            <ul>
                                ${phaseInfo.tips.positivas.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="tips-negative">
                            <h4>O que evitar:</h4>
                            <ul>
                                ${phaseInfo.tips.negativas.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adicionar o modal ao DOM
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement.firstElementChild);

    // Adicionar evento para fechar o modal
    const modal = document.querySelector('.day-tips-modal');
    const closeButton = modal.querySelector('.close-modal');
    
    closeButton.onclick = function() {
        modal.remove();
    }

    // Fechar o modal ao clicar fora dele
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    }
}

// Função para gerar o calendário
function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    // Atualizar o título do mês
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Limpar o calendário
    calendarDays.innerHTML = '';
    
    // Adicionar dias vazios para o início do mês
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day other-month';
        calendarDays.appendChild(emptyDay);
    }
    
    // Adicionar os dias do mês
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        // Marcar o dia atual
        if (day === currentDate.getDate() && 
            currentMonth === currentDate.getMonth() && 
            currentYear === currentDate.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Adicionar o número do dia
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Adicionar a fase lunar
        const date = new Date(currentYear, currentMonth, day);
        const phase = calculateMoonPhase(date);
        const phaseInfo = moonPhases[phase];
        
        const moonPhase = document.createElement('div');
        moonPhase.className = 'moon-phase';
        moonPhase.innerHTML = `<span class="moon-emoji">${phaseInfo.emoji}</span>`;
        dayElement.appendChild(moonPhase);

        // Adicionar evento de clique
        dayElement.addEventListener('click', () => {
            showDayTips(date, phase);
        });
        
        // Adicionar cursor pointer
        dayElement.style.cursor = 'pointer';
        
        calendarDays.appendChild(dayElement);
    }
}

// Event Listeners
prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

// Inicializar o calendário
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    updateMoonPhaseDisplay();
}); 