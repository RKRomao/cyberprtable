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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation
    const animatedElements = document.querySelectorAll('.service-row, .pillar-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// ROI CALCULATOR LOGIC
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-roi');
    const resultsDiv = document.getElementById('roi-results');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateROI);
    }
    
    function calculateROI() {
        const employees = parseInt(document.getElementById('employees').value) || 50;
        const revenue = parseFloat(document.getElementById('revenue').value) || 5000000;
        const sector = document.getElementById('sector').value;
        
        // Risk factors by sector
        const riskFactors = {
            technology: 1.2,      // High risk
            finance: 1.5,          // Very high risk
            healthcare: 1.3,        // High risk (data sensitivity)
            manufacturing: 1.0      // Medium risk
        };
        
        // Calculate potential costs
        const riskFactor = riskFactors[sector] || 1.0;
        const avgRansomwareCost = 250000; // Average cost from the page
        const auditCostRange = { min: 50000, max: 500000 };
        const gdprFineRisk = 0.04; // 4% of revenue
        const downtimeDays = 21;
        const dailyRevenueLoss = revenue / 365;
        const downtimeCost = downtimeDays * dailyRevenueLoss;
        
        // Calculate potential losses
        const potentialRansomwareCost = avgRansomwareCost * riskFactor;
        const potentialAuditCost = (auditCostRange.min + auditCostRange.max) / 2;
        const potentialGDPRFine = revenue * gdprFineRisk * riskFactor;
        const customerLossRate = 0.4; // 40% customer loss
        const customerAcquisitionCost = revenue * 0.1; // 10% of revenue for new customers
        const customerLossCost = customerAcquisitionCost * customerLossRate;
        
        const totalPotentialLoss = potentialRansomwareCost + potentialAuditCost + 
                                  potentialGDPRFine + downtimeCost + customerLossCost;
        
        // CyberPrTable solution costs
        const monthlyCost = 129; // From the page
        const annualCost = monthlyCost * 12;
        const implementationCost = annualCost * 0.5; // 6 months implementation
        
        const totalSolutionCost = annualCost + implementationCost;
        
        // Calculate savings and ROI
        const annualSavings = totalPotentialLoss - totalSolutionCost;
        const roiPercentage = ((annualSavings / totalSolutionCost) * 100).toFixed(0);
        const paybackMonths = Math.ceil(totalSolutionCost / (annualSavings / 12));
        
        // Risk reduction percentages
        const ransomwareReduction = 85; // 85% reduction
        const complianceReduction = 95; // 95% reduction
        const downtimeReduction = 90; // 90% reduction
        
        // Display results
        displayROIResults({
            employees,
            revenue,
            sector,
            totalPotentialLoss,
            totalSolutionCost,
            annualSavings,
            roiPercentage,
            paybackMonths,
            riskFactor,
            ransomwareReduction,
            complianceReduction,
            downtimeReduction
        });
    }
    
    function displayROIResults(data) {
        const isPT = document.documentElement.lang === 'pt';
        const currency = isPT ? '€' : '€';
        
        const resultsHTML = `
            <div class="bg-card rounded-2xl p-8 border border-accent/30 slide-in-up">
                <h4 class="text-2xl font-bold mb-6 gradient-text">
                    ${isPT ? 'Resultados da Análise de ROI' : 'ROI Analysis Results'}
                </h4>
                
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="text-center">
                        <div class="text-4xl font-bold text-danger mb-2">
                            ${currency}${formatNumber(data.totalPotentialLoss)}
                        </div>
                        <div class="text-gray-400">
                            ${isPT ? 'Perda Anual Potencial' : 'Potential Annual Loss'}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-accent mb-2">
                            ${currency}${formatNumber(data.totalSolutionCost)}
                        </div>
                        <div class="text-gray-400">
                            ${isPT ? 'Custo Anual CyberPrTable' : 'Annual CyberPrTable Cost'}
                        </div>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-gradient-to-br from-accent/20 to-electric/20 rounded-xl p-6 text-center">
                        <div class="text-3xl font-bold gradient-text mb-2">
                            ${formatNumber(data.roiPercentage)}%
                        </div>
                        <div class="text-sm text-gray-300">
                            ${isPT ? 'ROI no Primeiro Ano' : 'First Year ROI'}
                        </div>
                    </div>
                    <div class="bg-gradient-to-br from-accent/20 to-electric/20 rounded-xl p-6 text-center">
                        <div class="text-3xl font-bold gradient-text mb-2">
                            ${currency}${formatNumber(data.annualSavings)}
                        </div>
                        <div class="text-sm text-gray-300">
                            ${isPT ? 'Economia Anual' : 'Annual Savings'}
                        </div>
                    </div>
                    <div class="bg-gradient-to-br from-accent/20 to-electric/20 rounded-xl p-6 text-center">
                        <div class="text-3xl font-bold gradient-text mb-2">
                            ${data.paybackMonths} ${isPT ? 'meses' : 'months'}
                        </div>
                        <div class="text-sm text-gray-300">
                            ${isPT ? 'Payback' : 'Payback Period'}
                        </div>
                    </div>
                </div>
                
                <div class="border-t border-gray-700 pt-6">
                    <h5 class="text-xl font-bold mb-4 text-accent">
                        ${isPT ? 'Redução de Risco' : 'Risk Reduction'}
                    </h5>
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div class="text-2xl font-bold text-accent mb-1">
                                -${data.ransomwareReduction}%
                            </div>
                            <div class="text-sm text-gray-400">
                                ${isPT ? 'Risco Ransomware' : 'Ransomware Risk'}
                            </div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-accent mb-1">
                                -${data.complianceReduction}%
                            </div>
                            <div class="text-sm text-gray-400">
                                ${isPT ? 'Risco de Conformidade' : 'Compliance Risk'}
                            </div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-accent mb-1">
                                -${data.downtimeReduction}%
                            </div>
                            <div class="text-sm text-gray-400">
                                ${isPT ? 'Tempo de Inatividade' : 'Downtime'}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <p class="text-sm text-center">
                        <i class="fas fa-info-circle text-accent mr-2"></i>
                        <span class="text-accent font-semibold">
                            ${isPT ? 'Investimento de €129/mês pode economizar' : '€129/month investment can save'}
                        </span>
                        ${currency}${formatNumber(data.annualSavings)} 
                        ${isPT ? 'anualmente' : 'annually'}
                    </p>
                </div>
            </div>
        `;
        
        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.classList.remove('hidden');
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function formatNumber(num) {
        return Math.round(num).toLocaleString('pt-PT');
    }
    
    // Get sector name in current language
    function getSectorName(sectorValue) {
        const isPT = document.documentElement.lang === 'pt';
        const sectorNames = {
            technology: isPT ? 'Tecnologia' : 'Technology',
            finance: isPT ? 'Financeiro' : 'Finance',
            healthcare: isPT ? 'Saúde' : 'Healthcare',
            manufacturing: isPT ? 'Manufatura' : 'Manufacturing'
        };
        return sectorNames[sectorValue] || sectorValue;
    }
});
