# 🎓 Guia Rápido - Administração Pública UFRN

[![Deploy Status](https://img.shields.io/badge/deploy-ready-brightgreen)](https://github.com)
[![Mobile Optimized](https://img.shields.io/badge/mobile-optimized-blue)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Made with Love](https://img.shields.io/badge/made%20with-❤️-red)](https://github.com)

Um site moderno, **mobile-first** e intuitivo para auxiliar estudantes do curso de Administração Pública da UFRN. Otimizado especialmente para dispositivos móveis, com informações essenciais sobre regulamentos, estrutura curricular, calendário acadêmico e muito mais.

## 📱 Otimizações Mobile

Este site foi desenvolvido com foco principal em dispositivos móveis:

### ✅ Recursos Mobile-First
- **Design responsivo**: Adapta-se perfeitamente a qualquer tamanho de tela
- **Touch-friendly**: Botões e elementos otimizados para toque
- **Carregamento rápido**: CSS e JS otimizados para conexões móveis
- **Navegação intuitiva**: Menu hambúrguer e navegação por gestos
- **Tipografia legível**: Tamanhos de fonte otimizados para telas pequenas
- **Viewport otimizado**: Corrige problemas de altura em iOS e Android

### 🔧 Otimizações Técnicas Mobile
- Uso de `touch-action: manipulation` para melhor responsividade
- Desabilitação de highlight em elementos touch
- Viewport height dinâmico para dispositivos móveis
- Animações reduzidas em dispositivos com bateria baixa
- Carregamento lazy de elementos não críticos

## 🚀 Deploy Rápido

### GitHub Pages (Gratuito)
1. Faça upload dos arquivos para um repositório no GitHub
2. Vá em Settings → Pages
3. Selecione "Deploy from a branch" → "main" → "/ (root)"
4. Seu site estará disponível em: `https://seuusuario.github.io/nome-do-repositorio`

### Netlify (Gratuito)
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para a área de deploy
3. Seu site estará online instantaneamente!

### Vercel (Gratuito)
1. Acesse [vercel.com](https://vercel.com)
2. Importe o projeto do GitHub ou faça upload
3. Deploy automático!

## 📁 Estrutura dos Arquivos

```
danielGurgel/
├── index.html           # Página principal
├── style.css           # Estilos customizados
├── script.js           # JavaScript interativo
├── mapacampuscentral.png # Imagem do mapa do campus
└── README.md           # Documentação
```

### 🖼️ Imagem do Mapa
- **Arquivo**: `mapacampuscentral.png`
- **Localização**: Mesma pasta do index.html
- **Funcionalidade**: Mapa interativo com zoom
- **Responsivo**: Otimizado para mobile e desktop

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **Tailwind CSS**: Framework CSS utilitário (via CDN)
- **CSS3 Custom**: Estilos complementares e animações
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones modernos (via CDN)

## ✨ Funcionalidades Principais

### 📱 Interface Mobile-First
- **Design responsivo avançado**: Funciona perfeitamente do iPhone SE ao desktop 4K
- **Menu mobile otimizado**: Navegação hambúrguer com feedback visual
- **Touch gestures**: Suporte a gestos touch para melhor experiência
- **Viewport dinâmico**: Adapta-se automaticamente à orientação do dispositivo
- Layout adaptativo com Tailwind CSS

### 🧭 Navegação Inteligente
- Menu fixo com scroll suave
- Indicador visual da seção ativa
- Links internos com offset para header fixo

### 📚 Conteúdo Organizado
- **RCG**: Regulamento dos Cursos de Graduação resumido
- **PPC**: Projeto Pedagógico do Curso detalhado
- **Calendário**: Datas importantes e dicas de organização
- **Estágio**: Orientações sobre estágio não obrigatório
- **FAQ**: Perguntas frequentes com accordion
- **Mapa**: Localização detalhada do campus e do CCSA
- **Quiz**: 10 perguntas sobre normas do curso

### 🗺️ Mapa do Campus
- Localização visual do Campus Central UFRN
- Identificação das zonas por cores
- Localização específica do CCSA (Zona 04 - Roxa)
- Dicas de navegação e pontos de referência
- Informações sobre transporte e acesso

### 🧠 Quiz Interativo
- 10 perguntas baseadas nas normas da UFRN
- Feedback imediato com explicações
- Sistema de pontuação e resultado final
- Funcionalidade de reiniciar quiz

### 🎯 Recursos Especiais
- Animações suaves de entrada
- Notificações toast elegantes
- Cores da identidade visual UFRN (azul, branco, verde)
- Código otimizado para performance

## ✏️ Como Editar o Conteúdo

### 📝 Editando Textos das Seções

**Arquivo: `index.html`**

1. **Texto da página inicial:**
```html
<!-- Procure por esta seção -->
<section id="inicio" class="min-h-screen bg-gradient-to-br from-ufrn-blue to-ufrn-light-blue text-white">
    <!-- Edite os textos dentro das tags <h1>, <h2>, <p> -->
</section>
```

2. **Informações do RCG:**
```html
<!-- Procure por esta seção -->
<section id="rcg" class="py-16 bg-white">
    <!-- Edite as listas <ul> e textos dentro dos cards -->
</section>
```

3. **Dados do PPC:**
```html
<!-- Procure por -->
<div class="flex justify-between border-b pb-2">
    <span class="font-semibold">Duração:</span>
    <span>8 semestres (4 anos)</span> <!-- Edite aqui -->
</div>
```

### 🧠 Adicionando/Editando Perguntas do Quiz

**Arquivo: `script.js`**

Encontre a seção `QUIZ_QUESTIONS` e edite:

```javascript
const QUIZ_QUESTIONS = [
    {
        question: "Sua pergunta aqui?",
        options: ["Opção A", "Opção B", "Opção C", "Opção D"],
        correct: 1, // Índice da resposta correta (0, 1, 2 ou 3)
        explanation: "Explicação detalhada da resposta correta."
    },
    // Adicione mais perguntas aqui...
];
```

**Para adicionar uma nova pergunta:**
1. Copie o bloco de uma pergunta existente
2. Cole no final do array (antes do `];`)
3. Edite o conteúdo
4. Adicione vírgula após o `}` (exceto na última pergunta)

### ❓ Editando FAQ

**Arquivo: `index.html`**

Procure pela seção FAQ e edite:

```html
<details class="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <summary class="p-6 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-gray-100 transition-colors">
        <span class="flex items-center">
            <i class="fas fa-chart-line text-ufrn-blue mr-3"></i>
            Sua pergunta aqui? <!-- Edite a pergunta -->
        </span>
        <i class="fas fa-chevron-down text-gray-500"></i>
    </summary>
    <div class="px-6 pb-6 text-gray-700">
        <p>Sua resposta detalhada aqui.</p> <!-- Edite a resposta -->
    </div>
</details>
```

### 🎨 Mudando Cores e Visual

**Arquivo: `style.css`**

1. **Cores principais (topo do arquivo):**
```css
:root {
    --ufrn-blue: #1e40af;     /* Azul principal */
    --ufrn-green: #059669;    /* Verde accent */
    --ufrn-light-blue: #3b82f6; /* Azul claro */
}
```

### 📱 Adicionando Nova Seção

1. **No HTML, adicione antes do footer:**
```html
<section id="nova-secao" class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <i class="fas fa-star text-4xl text-ufrn-blue mb-4"></i>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Título da Nova Seção
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Descrição da seção
                </p>
            </div>
            <!-- Conteúdo da seção aqui -->
        </div>
    </div>
</section>
```

2. **Adicione no menu de navegação:**
```html
<!-- Desktop Menu -->
<a href="#nova-secao" class="nav-link text-gray-700 hover:text-ufrn-blue transition-colors px-3 py-2 rounded-md font-medium">
    <i class="fas fa-star mr-1"></i> Nova Seção
</a>
```

## 🚀 Como Executar Localmente

1. **Abrir diretamente no navegador:**
   - Navegue até a pasta do projeto
   - Clique duas vezes em `index.html`
   - O site abrirá no seu navegador padrão

2. **Usando servidor local (Python):**
   ```bash
   # Navegue até a pasta do projeto
   cd caminho/para/guia-rapido-ufrn
   
   # Python 3
   python -m http.server 8000
   
   # Acesse: http://localhost:8000
   ```

3. **Usando Live Server (VS Code):**
   - Instale a extensão "Live Server"
   - Clique com botão direito em `index.html`
   - Selecione "Open with Live Server"

## 🐛 Solucionando Problemas

### ❌ Quiz não funciona
- Verifique se o `script.js` está carregando
- Abra o Console do navegador (F12) e veja se há erros
- Certifique-se de que os IDs dos elementos estão corretos

### 📱 Menu mobile não abre
- Verifique se o JavaScript está carregando
- Confirme que os IDs `mobile-menu-btn` e `mobile-menu` existem

### 🎨 Cores não aparecem
- Verifique se a configuração do Tailwind no `<script>` está correta
- Confirme que as classes CSS personalizadas estão no `style.css`

## 📞 Suporte e Contribuições

### 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 🆘 Precisa de Ajuda?

- 📚 **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- 🎨 **Font Awesome**: [fontawesome.com/icons](https://fontawesome.com/icons)
- 🌐 **GitHub Pages**: [pages.github.com](https://pages.github.com)
- ⚡ **Netlify**: [docs.netlify.com](https://docs.netlify.com)

---

<div align="center">

**🎓 Desenvolvido com ❤️ por estudantes para estudantes**

*Administração Pública - Universidade Federal do Rio Grande do Norte*

[![UFRN](https://img.shields.io/badge/UFRN-Administração%20Pública-blue)](https://ufrn.br)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3.3-38B2AC)](https://tailwindcss.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

**Última atualização:** Junho 2025 | **Versão:** 1.0.0

</div>

## 📍 Atualizações Recentes (2025)

O site foi atualizado para refletir o estado atual das **regras estabelecidas desde 2024**:

- ✅ **Regras de aprovação consolidadas**: Média ≥ 6,0 + Rendimento ≥ 4,0
- ✅ **Critérios atuais para prova final**: Entre 4,0 e 5,9
- ✅ **Informações sobre os tipos de formação**: Generalista e Associada
- ✅ **FAQ atualizado** com as principais dúvidas sobre as regras vigentes
- ✅ **Quiz interativo** com perguntas sobre as regras atuais
- ✅ **Mapa do Campus** com localização detalhada do CCSA e outras zonas

### 📋 Regras RCG Vigentes
- **Aprovação**: Média ≥ 6,0 + rendimento ≥ 4,0 (estabelecido em 2024)
- **Prova Final**: Para notas entre 4,0 e 5,9  
- **Tipos de Formação**: Generalista e Associada disponíveis
- **Localização**: CCSA - Centro de Ciências Sociais Aplicadas (Zona 04 - Roxa)
