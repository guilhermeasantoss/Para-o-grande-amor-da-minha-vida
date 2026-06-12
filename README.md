# 💝 Para o Grande Amor da Minha Vida

Um presente digital especial e interativo criado com muito amor para celebrar um relacionamento único.

## 🎨 Sobre o Projeto

Este é um site responsivo e elegante desenvolvido para presentear alguém especial. Ele conta a história de um casal através de múltiplas seções interativas, combinando tecnologia, design e emoção.

## ✨ Funcionalidades

### 🎬 Tela de Abertura
- Animação inicial elegante com coração animado
- Botão para iniciar a jornada

### 📊 Contador de Tempo
- Calcula dias, horas, minutos e segundos desde o início do relacionamento
- Atualização em tempo real
- Data configurável

### 🎵 Player de Música
- Reprodutor de áudio interativo
- Controles de play/pause
- Barra de progresso com tempo
- Música local integrada: "Lisboa - ANAVITÓRIA & Lenine"

### 🖼️ Galeria de Fotos
- 20 fotos organizadas em grid responsivo
- Efeitos de hover e animações
- Modal interativo para visualização em tela cheia
- Navegação por teclado (setas ← → e ESC)
- Compatível com mobile

### 💌 Carta Pessoal
- Mensagem emotiva e personalizada
- Design elegante com ornamentação especial

### 🎯 Seção Final
- Coração animado com efeito de brilho
- Botão para recomeçar a jornada

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo com Grid e Flexbox
  - Gradientes e animações personalizadas
  - Fonts Google: Playfair Display e Lato
  - Variáveis CSS para fácil customização
- **JavaScript** - Interatividade
  - Canvas para partículas de coração
  - Galeria modal interativa
  - Contador automático
  - Controle de áudio

## 📁 Estrutura do Projeto

```
amor/
├── index.html              # Arquivo principal HTML
├── style.css              # Estilos CSS
├── script.js              # Lógica JavaScript
├── README.md              # Este arquivo
├── ANAVITORIA...m4r       # Arquivo de música
└── midias/
    ├── amor1.jpeg
    ├── amor2.jpeg
    ├── ... (até amor21.jpeg)
    └── 20 fotos no total
```

## 🎨 Customização

### Alterar a data do relacionamento
No arquivo `script.js`, linha 3:
```javascript
const DATA_INICIO = new Date('2024-10-29T00:00:00');
```

### Modificar cores
No arquivo `style.css`, edite as variáveis CSS:
```css
:root {
  --bg-dark:       #1a0a0e;
  --bg-mid:        #2a1018;
  --petal:         #f7c5d0;
  --coral:         #e8857a;
  --gold:          #f0d9a0;
  --white:         #fff5f7;
}
```

### Trocar a música
Substitua o arquivo `ANAVITORIA, Lenine e Orquestra e Ouro Preto - Lisboa (Ao Vivo).m4r` e atualize o atributo `src` em `index.html`.

## 📱 Responsividade

O projeto é totalmente responsivo e funciona perfeitamente em:
- 💻 Desktop (1920px+)
- 💻 Tablets (768px - 1024px)
- 📱 Mobile (até 767px)

## 🎯 Recursos Especiais

- ✅ Suporte a redução de movimento (acessibilidade)
- ✅ Scroll suave automático
- ✅ Animações em Canvas para performance
- ✅ Lazy loading de imagens
- ✅ Navegação por teclado
- ✅ Modal gallery com controles

## 🚀 Como Usar

1. Clone o repositório:
```bash
git clone https://github.com/guilhermeasantoss/Para-o-grande-amor-da-minha-vida.git
```

2. Abra o arquivo `index.html` em um navegador moderno

3. Personalize conforme necessário

## 💡 Dicas

- Teste em diferentes dispositivos para melhor experiência
- Use navegadores modernos (Chrome, Firefox, Safari, Edge)
- Para adicionar mais fotos, coloque-as na pasta `midias/` e adicione no HTML
- As animações são otimizadas para performance

## 📝 Notas

- Todas as imagens devem estar em formato JPEG
- A música pode ser em MP4 ou outros formatos compatíveis
- O projeto funciona offline (exceto para Google Fonts em primeira carga)

## 💖 Dedicado com amor

Este projeto foi criado para celebrar um amor genuíno e único.

---

**Desenvolvido com ❤️**
