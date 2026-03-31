function toggleLanguage() {
    const htmlTag = document.documentElement;
    const langText = document.getElementById('lang-text');
    
    if (htmlTag.getAttribute('lang') === 'pt') {
        htmlTag.setAttribute('lang', 'en');
        langText.innerText = 'PT'; // Mostra a opção de voltar para PT
    } else {
        htmlTag.setAttribute('lang', 'pt');
        langText.innerText = 'EN'; // Mostra a opção de mudar para EN
    }
}
