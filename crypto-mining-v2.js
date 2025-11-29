// ============ ระบบภาษา ============
const translations = {
    th: {
        title: '⛏️ Crypto Mining Pro',
        subtitle: 'ขุดรายได้ รับเงินจริง',
        theme: 'Dark Mode',
        vipFree: '👤 Free User',
        logout: 'ออกจากระบบ',
        totalBalance: 'ยอดเงินรวม',
        canWithdraw: 'ถอนได้ทันที',
        miningRate: 'อัตราการขุด',
        bonus: 'โบนัส',
        todayEarnings: 'รายได้วันนี้',
        ofGoal: 'ของเป้าหมาย',
        totalPower: 'พลังขุดรวม',
        miners: 'เครื่อง',
        miningControl: 'ควบคุมการขุด',
        startMining: '🚀 เริ่มขุดเลย!',
        stopMining: '⏸️ หยุดขุด',
        miningInfo: 'เริ่มต้นขุดฟรี! ไม่ต้องลงทุน',
        hourlyChart: '📊 รายได้รายชั่วโมง',
        cumulativeChart: '📈 ยอดเงินสะสม',
        shopTitle: '🛒 ร้านค้าเครื่องขุด',
        shopDesc: 'ซื้อเครื่องขุดเพื่อเพิ่มรายได้ของคุณ!',
        dailyRewards: '🎁 รางวัลประจำวัน',
        rewardsDesc: 'เข้ามารับรางวัลทุกวัน! ต่อเนื่อง 7 วันรับโบนัสพิเศษ',
        claimReward: '🎁 รับรางวัลวันนี้',
        dailyQuests: '🎯 เควสรายวัน',
        questsDesc: 'ทำเควสเพื่อรับรางวัลเพิ่ม!',
        congratulations: 'ยินดีด้วย!',
        ok: 'รับรางวัล',
        buy: 'ซื้อ',
        owned: 'มีแล้ว',
        notEnough: 'เงินไม่พอ',
        day: 'วันที่'
    },
    en: {
        title: '⛏️ Crypto Mining Pro',
        subtitle: 'Mine & Earn Real Money',
        theme: 'Light Mode',
        vipFree: '👤 Free User',
        logout: 'Logout',
        totalBalance: 'Total Balance',
        canWithdraw: 'Available Now',
        miningRate: 'Mining Rate',
        bonus: 'Bonus',
        todayEarnings: "Today's Earnings",
        ofGoal: 'of Goal',
        totalPower: 'Total Power',
        miners: 'Miners',
        miningControl: 'Mining Control',
        startMining: '🚀 Start Mining!',
        stopMining: '⏸️ Stop Mining',
        miningInfo: 'Start Mining for Free! No Investment Required',
        hourlyChart: '📊 Hourly Earnings',
        cumulativeChart: '📈 Cumulative Balance',
        shopTitle: '🛒 Miner Shop',
        shopDesc: 'Buy miners to increase your earnings!',
        dailyRewards: '🎁 Daily Rewards',
        rewardsDesc: 'Login daily! Get special bonus for 7 days streak',
        claimReward: '🎁 Claim Today',
        dailyQuests: '🎯 Daily Quests',
        questsDesc: 'Complete quests for extra rewards!',
        congratulations: 'Congratulations!',
        ok: 'Claim Prize',
        buy: 'Buy',
        owned: 'Owned',
        notEnough: 'Not Enough',
        day: 'Day'
    }
};

let currentLang = localStorage.getItem('language') || 'th';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.getElementById('currentLang').textContent = lang === 'th' ? 'ไทย' : 'English';
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    updateVIPStatus();
    renderShop();
    renderDailyRewards();
    renderQuests();
    toggleLanguage();
}

function toggleLanguage() {
    const dropdown = document.getElementById('langDropdown');
    dropdown.classList.toggle('active');
}

// ============ ระบบธีม ============
let isDarkMode = localStorage.getItem('theme') === 'light' ? false : true;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = document.getElementById('themeIcon');
    icon.textContent = isDarkMode ? '🌙' : '☀️';
    
    // อัปเดตกราฟ
    updateCharts();
}

// ============ ข้อมูลเกม ============
let gameData = {
    balance: 0,
    miningRate: 0.10,
    todayEarnings: 0,
    totalPower: 1.0,
    isMining: false,
    miners: [
        { id: 'starter', name: 'มือใหม่', owned: 1 }
    ],
    dailyReward: {
        day: 0,
        lastClaim: null
    },
    quests: []
};

const minerTypes = [
    { id: 'starter', name: 'มือใหม่', nameEn: 'Starter', icon: '⛏️', power: 1.0, rate: 0.10, price: 0 },
    { id: 'rtx3060', name: 'RTX 3060', nameEn: 'RTX 3060', icon: '🖥️', power: 5.0, rate: 0.50, price: 500 },
    { id: 'rtx3080', name: 'RTX 3080', nameEn: 'RTX 3080', icon: '💻', power: 15.0, rate: 1.50, price: 2000 },
    { id: 'rtx4090', name: 'RTX 4090', nameEn: 'RTX 4090', icon: '🎮', power: 30.0, rate: 3.00, price: 5000 },
    { id: 'asics19', name: 'ASIC S19', nameEn: 'ASIC S19', icon: '⚙️', power: 100.0, rate: 10.00, price: 20000 },
    { id: 'farm', name: 'Mining Farm', nameEn: 'Mining Farm', icon: '🏭', power: 500.0, rate: 50.00, price: 100000 }
];

const questTypes = [
    { id: 'start', nameTh: 'เริ่มต้นขุด', nameEn: 'Start Mining', desc: 'เริ่มขุดครั้งแรก', target: 1, reward: 50, progress: 0 },
    { id: 'mine5min', nameTh: 'ขุดติดต่อกัน 5 นาที', nameEn: 'Mine for 5 mins', desc: 'ขุดต่อเนื่อง', target: 300, reward: 150, progress: 0 },
    { id: 'earn1000', nameTh: 'รายได้ 1,000 บาท', nameEn: 'Earn ฿1,000', desc: 'ทำรายได้รวม', target: 1000, reward: 200, progress: 0 },
    { id: 'buyMiner', nameTh: 'ซื้อเครื่องขุด', nameEn: 'Buy a Miner', desc: 'ซื้ออย่างน้อย 1 เครื่อง', target: 1, reward: 100, progress: 0 },
    { id: 'power50', nameTh: 'พลังขุด 50 MH/s', nameEn: 'Reach 50 MH/s', desc: 'เพิ่มพลังขุด', target: 50, reward: 500, progress: 0 }
];

// โหลดข้อมูล
function loadData() {
    const saved = localStorage.getItem('miningGameData');
    if (saved) {
        const loaded = JSON.parse(saved);
        gameData = { ...gameData, ...loaded };
        if (!gameData.quests || gameData.quests.length === 0) {
            gameData.quests = JSON.parse(JSON.stringify(questTypes));
        }
    } else {
        gameData.quests = JSON.parse(JSON.stringify(questTypes));
    }
    updateDisplay();
}

// บันทึกข้อมูล
function saveData() {
    localStorage.setItem('miningGameData', JSON.stringify(gameData));
}

// ============ ระบบขุด ============
let miningInterval = null;

function toggleMining() {
    gameData.isMining = !gameData.isMining;
    
    const btn = document.getElementById('miningBtn');
    if (gameData.isMining) {
        btn.className = 'mining-btn stop';
        btn.querySelector('span').setAttribute('data-i18n', 'stopMining');
        btn.querySelector('span').textContent = translations[currentLang].stopMining;
        startMining();
        updateQuest('start', 1);
    } else {
        btn.className = 'mining-btn start pulse';
        btn.querySelector('span').setAttribute('data-i18n', 'startMining');
        btn.querySelector('span').textContent = translations[currentLang].startMining;
        stopMining();
    }
    
    saveData();
}

let miningTime = 0;

function startMining() {
    miningInterval = setInterval(() => {
        gameData.balance += gameData.miningRate;
        gameData.todayEarnings += gameData.miningRate;
        miningTime++;
        
        updateDisplay();
        updateQuest('mine5min', miningTime);
        updateQuest('earn1000', gameData.balance);
        
        if (miningTime % 10 === 0) {
            saveData();
        }
    }, 1000);
}

function stopMining() {
    if (miningInterval) {
        clearInterval(miningInterval);
        miningInterval = null;
        miningTime = 0;
    }
}

// ============ อัปเดตหน้าจอ ============
function updateDisplay() {
    document.getElementById('totalBalance').textContent = gameData.balance.toFixed(2);
    document.getElementById('miningRate').textContent = gameData.miningRate.toFixed(2);
    document.getElementById('todayEarnings').textContent = gameData.todayEarnings.toFixed(2);
    document.getElementById('totalPower').textContent = gameData.totalPower.toFixed(1);
    document.getElementById('minersCount').textContent = gameData.miners.reduce((sum, m) => sum + m.owned, 0);
    
    const rateIncrease = ((gameData.miningRate / 0.10 - 1) * 100).toFixed(0);
    document.getElementById('rateIncrease').textContent = rateIncrease;
    
    const todayProgress = Math.min(100, (gameData.todayEarnings / 1000) * 100).toFixed(0);
    document.getElementById('todayProgress').textContent = todayProgress + '% ' + translations[currentLang].ofGoal;
}

// ============ ร้านค้า ============
function renderShop() {
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = '';
    
    minerTypes.forEach(miner => {
        const owned = gameData.miners.find(m => m.id === miner.id)?.owned || 0;
        const canBuy = gameData.balance >= miner.price || miner.price === 0;
        
        const card = document.createElement('div');
        card.className = 'miner-card';
        card.innerHTML = `
            <div class="miner-icon">${miner.icon}</div>
            <div class="miner-name">${currentLang === 'th' ? miner.name : miner.nameEn}</div>
            <div class="miner-stats">
                ⚡ ${miner.power} MH/s<br>
                💰 ฿${miner.rate}/วินาที
            </div>
            <div class="miner-price">${miner.price === 0 ? translations[currentLang].owned : '฿' + miner.price.toLocaleString()}</div>
            ${owned > 0 ? `<div style="margin: 10px 0; opacity: 0.8;">${translations[currentLang].owned}: ${owned}</div>` : ''}
            <button class="buy-btn" onclick="buyMiner('${miner.id}')" ${!canBuy || miner.price === 0 ? 'disabled' : ''}>
                ${miner.price === 0 ? translations[currentLang].owned : (canBuy ? translations[currentLang].buy : translations[currentLang].notEnough)}
            </button>
        `;
        grid.appendChild(card);
    });
}

function buyMiner(id) {
    const miner = minerTypes.find(m => m.id === id);
    if (!miner || gameData.balance < miner.price) return;
    
    gameData.balance -= miner.price;
    gameData.totalPower += miner.power;
    gameData.miningRate += miner.rate;
    
    const existing = gameData.miners.find(m => m.id === id);
    if (existing) {
        existing.owned++;
    } else {
        gameData.miners.push({ id: id, name: miner.name, owned: 1 });
    }
    
    updateDisplay();
    renderShop();
    saveData();
    showNotification(`${translations[currentLang].congratulations} ซื้อ ${currentLang === 'th' ? miner.name : miner.nameEn} สำเร็จ! 🎉`);
    
    updateQuest('buyMiner', gameData.miners.reduce((sum, m) => sum + m.owned, 0) - 1);
    updateQuest('power50', gameData.totalPower);
}

// ============ รางวัลประจำวัน ============
const dailyRewards = [100, 200, 300, 500, 800, 1200, 2000];

function renderDailyRewards() {
    const container = document.getElementById('rewardDays');
    container.innerHTML = '';
    
    dailyRewards.forEach((amount, index) => {
        const day = document.createElement('div');
        day.className = 'reward-day';
        
        if (index < gameData.dailyReward.day) {
            day.classList.add('claimed');
        } else if (index === gameData.dailyReward.day) {
            day.classList.add('active');
        }
        
        day.innerHTML = `
            <div style="font-size: 1.5em; margin-bottom: 5px;">${index < gameData.dailyReward.day ? '✅' : '🎁'}</div>
            <div style="font-weight: bold;">${translations[currentLang].day} ${index + 1}</div>
            <div style="color: #4ade80; font-size: 1.2em; margin-top: 5px;">฿${amount}</div>
        `;
        
        container.appendChild(day);
    });
    
    checkDailyReset();
}

function claimDailyReward() {
    const today = new Date().toDateString();
    
    if (gameData.dailyReward.lastClaim === today) {
        showNotification(currentLang === 'th' ? 'คุณรับรางวัลวันนี้แล้ว!' : 'Already claimed today!');
        return;
    }
    
    const reward = dailyRewards[gameData.dailyReward.day];
    gameData.balance += reward;
    gameData.dailyReward.lastClaim = today;
    gameData.dailyReward.day = (gameData.dailyReward.day + 1) % 7;
    
    showRewardModal(`${translations[currentLang].congratulations} รับรางวัล ฿${reward}!`);
    updateDisplay();
    renderDailyRewards();
    saveData();
}

function checkDailyReset() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (gameData.dailyReward.lastClaim && 
        gameData.dailyReward.lastClaim !== today && 
        gameData.dailyReward.lastClaim !== yesterday) {
        gameData.dailyReward.day = 0;
        saveData();
    }
}

// ============ เควส ============
function renderQuests() {
    const container = document.getElementById('questsList');
    container.innerHTML = '';
    
    gameData.quests.forEach(quest => {
        const progress = Math.min(100, (quest.progress / quest.target) * 100);
        const completed = quest.progress >= quest.target;
        
        const item = document.createElement('div');
        item.className = 'quest-item';
        item.innerHTML = `
            <div class="quest-title">
                ${completed ? '✅' : '🎯'} ${currentLang === 'th' ? quest.nameTh : quest.nameEn}
            </div>
            <div style="opacity: 0.8; margin: 5px 0;">${quest.desc}</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%">${progress.toFixed(0)}%</div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <span>${quest.progress.toFixed(0)} / ${quest.target}</span>
                <span style="color: #4ade80; font-weight: bold;">รางวัล: ฿${quest.reward}</span>
            </div>
        `;
        
        container.appendChild(item);
    });
}

function updateQuest(questId, value) {
    const quest = gameData.quests.find(q => q.id === questId);
    if (!quest || quest.progress >= quest.target) return;
    
    const oldProgress = quest.progress;
    quest.progress = Math.min(quest.target, value);
    
    if (oldProgress < quest.target && quest.progress >= quest.target) {
        gameData.balance += quest.reward;
        showNotification(`${translations[currentLang].congratulations} เควสสำเร็จ! +฿${quest.reward} 🎉`);
        updateDisplay();
    }
    
    renderQuests();
    saveData();
}

// ============ กราฟ ============
let earningsChart, cumulativeChart;

function initCharts() {
    const ctx1 = document.getElementById('earningsChart').getContext('2d');
    const ctx2 = document.getElementById('cumulativeChart').getContext('2d');
    
    const textColor = isDarkMode ? 'white' : '#1f2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    earningsChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: currentLang === 'th' ? 'รายได้ (บาท)' : 'Earnings (THB)',
                data: Array(24).fill(0),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                x: { 
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            }
        }
    });
    
    cumulativeChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                label: currentLang === 'th' ? 'ยอดเงินสะสม (บาท)' : 'Total Balance (THB)',
                data: Array(20).fill(0),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                x: { 
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                }
            }
        }
    });
}

function updateCharts() {
    if (!earningsChart || !cumulativeChart) return;
    
    const textColor = isDarkMode ? 'white' : '#1f2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    [earningsChart, cumulativeChart].forEach(chart => {
        chart.options.plugins.legend.labels.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.options.scales.y.grid.color = gridColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.x.grid.color = gridColor;
        chart.update();
    });
}

// อัปเดตกราฟ
setInterval(() => {
    if (!earningsChart || !gameData.isMining) return;
    
    const hour = new Date().getHours();
    earningsChart.data.datasets[0].data[hour] = (earningsChart.data.datasets[0].data[hour] || 0) + gameData.miningRate;
    earningsChart.update();
    
    cumulativeChart.data.datasets[0].data.shift();
    cumulativeChart.data.datasets[0].data.push(gameData.balance);
    cumulativeChart.update();
}, 5000);

// ============ การแจ้งเตือน ============
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function showRewardModal(text) {
    document.getElementById('rewardText').textContent = text;
    document.getElementById('rewardModal').classList.add('active');
}

function closeRewardModal() {
    document.getElementById('rewardModal').classList.remove('active');
}

// ============ VIP Status ============
function updateVIPStatus() {
    const vipStatus = document.getElementById('vipStatus');
    const userVIP = localStorage.getItem('userVIP');
    
    if (userVIP) {
        const vipNames = {
            bronze: '👑 Bronze VIP',
            silver: '💎 Silver VIP',
            gold: '🌟 Gold VIP'
        };
        vipStatus.innerHTML = vipNames[userVIP];
    } else {
        vipStatus.querySelector('span').textContent = translations[currentLang].vipFree;
    }
}

// ============ Logout ============
function logout() {
    if (confirm(currentLang === 'th' ? 'คุณต้องการออกจากระบบใช่หรือไม่?' : 'Are you sure you want to logout?')) {
        // บันทึกข้อมูลก่อน logout
        saveData();
        
        // ลบ session
        localStorage.removeItem('userSession');
        localStorage.removeItem('token');
        
        // แสดง notification
        showNotification(currentLang === 'th' ? '👋 ออกจากระบบสำเร็จ!' : '👋 Logout successful!');
        
        // รอ 1 วินาทีแล้วไปหน้า login
        setTimeout(() => {
            window.location.href = 'login-register.html';
        }, 1000);
    }
}

// โหลดชื่อผู้ใช้
function loadUserInfo() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        try {
            const user = JSON.parse(userSession);
            document.getElementById('username').textContent = user.username || user.email || (currentLang === 'th' ? 'ผู้ใช้งาน' : 'User');
        } catch (e) {
            document.getElementById('username').textContent = currentLang === 'th' ? 'ผู้ใช้งาน' : 'User';
        }
    } else {
        document.getElementById('username').textContent = currentLang === 'th' ? 'ผู้ใช้งาน' : 'User';
    }
}

// ============ เริ่มต้น ============
window.addEventListener('load', () => {
    if (!isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('themeIcon').textContent = '☀️';
    }
    
    setLanguage(currentLang);
    loadUserInfo();
    loadData();
    renderShop();
    renderDailyRewards();
    renderQuests();
    updateVIPStatus();
    
    setTimeout(() => {
        initCharts();
    }, 100);
    
    setInterval(saveData, 10000);
});

// ปิด dropdown เมื่อคลิกข้างนอก
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        document.getElementById('langDropdown').classList.remove('active');
    }
});

console.log('⛏️ Crypto Mining Pro V2 Loaded!');
console.log('🌓 Theme System: Active');
console.log('🌍 Multi-language: Active');