// ============ ระบบภาษา ============
const translations = {
    th: {
        title: '🎰 Lucky Wheel & Leaderboard',
        subtitle: 'หมุนวงล้อรับรางวัล แข่งขันอันดับผู้เล่น',
        theme: 'Dark Mode',
        free: 'ผู้ใช้ฟรี',
        luckyWheel: 'Lucky Wheel',
        leaderboard: 'Leaderboard',
        vipSystem: 'ระบบ VIP',
        spin: '🎰 หมุนเลย!',
        spinsLeft: 'จำนวนครั้งที่เหลือวันนี้:',
        resetTime: 'รีเซ็ตเวลา 00:00 น.',
        topPlayers: '🏆 Top 10 ผู้เล่นอันดับต้น',
        vipDescription: 'อัพเกรดเป็น VIP รับสิทธิพิเศษมากมาย!',
        tierBronze: 'Bronze',
        tierSilver: 'Silver',
        tierGold: 'Gold',
        benefit1: 'หมุนวงล้อ 10 ครั้ง/วัน',
        benefit2: 'โบนัสขุด +20%',
        benefit3: 'ถอนเงินไว 2 เท่า',
        benefit4: 'หมุนวงล้อไม่จำกัด',
        benefit5: 'โบนัสขุด +50%',
        benefit6: 'ถอนเงินทันที',
        benefit7: 'รางวัลพิเศษทุกวัน',
        benefit8: 'โบนัสขุด +100%',
        benefit9: 'รางวัลพิเศษทุกวัน x2',
        benefit10: 'Support 24/7',
        benefit11: 'โบนัสแนะนำเพื่อน +50%',
        upgrade: 'อัพเกรด',
        congratulations: 'ยินดีด้วย!',
        ok: 'รับรางวัล'
    },
    en: {
        title: '🎰 Lucky Wheel & Leaderboard',
        subtitle: 'Spin to Win! Compete with Top Players',
        theme: 'Light Mode',
        free: 'Free User',
        luckyWheel: 'Lucky Wheel',
        leaderboard: 'Leaderboard',
        vipSystem: 'VIP System',
        spin: '🎰 Spin Now!',
        spinsLeft: 'Spins Remaining Today:',
        resetTime: 'Reset at 00:00',
        topPlayers: '🏆 Top 10 Players',
        vipDescription: 'Upgrade to VIP for Exclusive Benefits!',
        tierBronze: 'Bronze',
        tierSilver: 'Silver',
        tierGold: 'Gold',
        benefit1: '10 Spins/Day',
        benefit2: 'Mining Bonus +20%',
        benefit3: 'Withdraw 2x Faster',
        benefit4: 'Unlimited Spins',
        benefit5: 'Mining Bonus +50%',
        benefit6: 'Instant Withdraw',
        benefit7: 'Daily Special Rewards',
        benefit8: 'Mining Bonus +100%',
        benefit9: 'Daily Rewards x2',
        benefit10: 'Support 24/7',
        benefit11: 'Referral Bonus +50%',
        upgrade: 'Upgrade',
        congratulations: 'Congratulations!',
        ok: 'Claim Prize'
    }
};

let currentLang = localStorage.getItem('language') || 'th';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.getElementById('currentLang').textContent = lang === 'th' ? 'ไทย' : 'English';
    
    // อัปเดตข้อความทั้งหมด
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
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
}

// โหลดธีมเมื่อเริ่มต้น
window.addEventListener('load', () => {
    if (!isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('themeIcon').textContent = '☀️';
    }
    setLanguage(currentLang);
    renderWheel();
    renderLeaderboard();
});

// ============ Lucky Wheel ============
const prizes = [
    { label: '฿10', value: 10, color: '#ef4444' },
    { label: '฿50', value: 50, color: '#f59e0b' },
    { label: '฿100', value: 100, color: '#10b981' },
    { label: '฿200', value: 200, color: '#3b82f6' },
    { label: '฿500', value: 500, color: '#8b5cf6' },
    { label: '฿1000', value: 1000, color: '#ec4899' },
    { label: '🎁', value: 0, color: '#6366f1' },
    { label: '฿20', value: 20, color: '#14b8a6' }
];

let spinsRemaining = parseInt(localStorage.getItem('spinsRemaining')) || 3;
let isSpinning = false;

function renderWheel() {
    const wheel = document.getElementById('wheel');
    const segmentAngle = 360 / prizes.length;
    
    prizes.forEach((prize, index) => {
        const segment = document.createElement('div');
        segment.className = 'wheel-segment';
        segment.style.transform = `rotate(${index * segmentAngle}deg)`;
        segment.style.background = prize.color;
        segment.innerHTML = `<span style="transform: rotate(${segmentAngle/2}deg) translateX(60%)">${prize.label}</span>`;
        wheel.appendChild(segment);
    });
    
    updateSpinsDisplay();
}

function updateSpinsDisplay() {
    document.getElementById('spinsRemaining').textContent = spinsRemaining;
    const spinBtn = document.getElementById('spinBtn');
    
    if (spinsRemaining <= 0) {
        spinBtn.disabled = true;
        spinBtn.style.opacity = '0.5';
    } else {
        spinBtn.disabled = false;
        spinBtn.style.opacity = '1';
    }
}

function spinWheel() {
    if (isSpinning || spinsRemaining <= 0) return;
    
    isSpinning = true;
    spinsRemaining--;
    localStorage.setItem('spinsRemaining', spinsRemaining);
    updateSpinsDisplay();
    
    // แสดง Loading
    showLoading();
    
    // สุ่มรางวัล
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];
    
    // คำนวณมุมหมุน
    const segmentAngle = 360 / prizes.length;
    const targetAngle = (randomIndex * segmentAngle) + (segmentAngle / 2);
    const spinRotations = 5; // หมุน 5 รอบ
    const finalRotation = (360 * spinRotations) + (360 - targetAngle);
    
    const wheel = document.getElementById('wheel');
    wheel.style.transform = `rotate(${finalRotation}deg)`;
    
    setTimeout(() => {
        hideLoading();
        isSpinning = false;
        showPrize(prize);
        
        // บันทึกรางวัล
        if (prize.value > 0) {
            const gameData = JSON.parse(localStorage.getItem('miningGameData')) || {};
            gameData.balance = (gameData.balance || 0) + prize.value;
            localStorage.setItem('miningGameData', JSON.stringify(gameData));
        }
    }, 4000);
}

function showPrize(prize) {
    const prizeText = prize.value > 0 
        ? `${currentLang === 'th' ? 'คุณได้รับ' : 'You won'} ฿${prize.value}!`
        : `${currentLang === 'th' ? 'คุณได้รับ' : 'You won'} 🎁 ${currentLang === 'th' ? 'ของรางวัลพิเศษ' : 'Special Gift'}!`;
    
    document.getElementById('prizeText').textContent = prizeText;
    document.getElementById('prizeModal').classList.add('active');
}

function closeModal() {
    document.getElementById('prizeModal').classList.remove('active');
}

// รีเซ็ตจำนวนครั้งหมุนทุกวัน
function checkDailyReset() {
    const lastReset = localStorage.getItem('lastWheelReset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
        spinsRemaining = 3; // หรือตามระดับ VIP
        localStorage.setItem('spinsRemaining', spinsRemaining);
        localStorage.setItem('lastWheelReset', today);
        updateSpinsDisplay();
    }
}

setInterval(checkDailyReset, 60000); // ตรวจสอบทุกนาที
checkDailyReset();

// ============ Leaderboard ============
let leaderboardData = [
    { rank: 1, username: 'CryptoKing', earnings: 1250890, power: 5678, vip: 'gold' },
    { rank: 2, username: 'MiningPro', earnings: 980450, power: 4321, vip: 'silver' },
    { rank: 3, username: 'DiamondMiner', earnings: 875320, power: 3890, vip: 'gold' },
    { rank: 4, username: 'GoldRush99', earnings: 654210, power: 2456, vip: 'silver' },
    { rank: 5, username: 'BitcoinBoss', earnings: 543890, power: 2134, vip: 'bronze' },
    { rank: 6, username: 'EtherMaster', earnings: 432100, power: 1876, vip: 'bronze' },
    { rank: 7, username: 'MegaMiner', earnings: 387650, power: 1654, vip: null },
    { rank: 8, username: 'CoinCollector', earnings: 298450, power: 1432, vip: null },
    { rank: 9, username: 'HashHunter', earnings: 234560, power: 1098, vip: null },
    { rank: 10, username: 'BlockChainer', earnings: 187340, power: 876, vip: null }
];

function renderLeaderboard() {
    const container = document.getElementById('leaderboardList');
    container.innerHTML = '';
    
    leaderboardData.forEach(player => {
        const item = document.createElement('div');
        item.className = 'rank-item';
        
        const rankClass = player.rank === 1 ? 'rank-1' : 
                         player.rank === 2 ? 'rank-2' : 
                         player.rank === 3 ? 'rank-3' : 'rank-other';
        
        const vipBadge = player.vip ? 
            `<span style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 3px 10px; border-radius: 10px; font-size: 0.8em; margin-left: 10px;">👑 ${player.vip.toUpperCase()}</span>` : '';
        
        item.innerHTML = `
            <div class="rank-number ${rankClass}">
                ${player.rank <= 3 ? ['🥇', '🥈', '🥉'][player.rank - 1] : '#' + player.rank}
            </div>
            <div class="rank-info">
                <div class="rank-name">${player.username}${vipBadge}</div>
                <div class="rank-stats">⚡ ${player.power} MH/s | 📅 ${currentLang === 'th' ? 'ใช้งาน' : 'Active'} 24/7</div>
            </div>
            <div class="rank-earnings">฿${player.earnings.toLocaleString()}</div>
        `;
        
        container.appendChild(item);
    });
}

// ============ VIP System ============
let userVIP = localStorage.getItem('userVIP') || null;

function updateVIPStatus() {
    const vipStatus = document.getElementById('vipStatus');
    
    if (userVIP) {
        const vipNames = {
            bronze: '👑 Bronze VIP',
            silver: '💎 Silver VIP',
            gold: '🌟 Gold VIP'
        };
        vipStatus.innerHTML = vipNames[userVIP];
    } else {
        vipStatus.innerHTML = `${currentLang === 'th' ? '👤 ผู้ใช้ฟรี' : '👤 Free User'}`;
    }
}

function upgradeTo(tier) {
    const prices = {
        bronze: 99,
        silver: 299,
        gold: 999
    };
    
    const confirmed = confirm(`${currentLang === 'th' ? 'ต้องการอัพเกรดเป็น' : 'Upgrade to'} ${tier.toUpperCase()} VIP ${currentLang === 'th' ? 'ในราคา' : 'for'} ฿${prices[tier]} ${currentLang === 'th' ? 'ใช่หรือไม่?' : '?'}`);
    
    if (confirmed) {
        showLoading();
        
        setTimeout(() => {
            userVIP = tier;
            localStorage.setItem('userVIP', tier);
            
            // อัปเดตจำนวนครั้งหมุนตาม VIP
            if (tier === 'bronze') spinsRemaining = 10;
            else if (tier === 'silver' || tier === 'gold') spinsRemaining = 999;
            
            localStorage.setItem('spinsRemaining', spinsRemaining);
            updateSpinsDisplay();
            updateVIPStatus();
            hideLoading();
            
            alert(`${currentLang === 'th' ? 'ยินดีด้วย! คุณเป็น' : 'Congratulations! You are now'} ${tier.toUpperCase()} VIP ${currentLang === 'th' ? 'แล้ว!' : '!'} 🎉`);
        }, 1500);
    }
}

updateVIPStatus();

// ============ Tab System ============
function switchTab(tab) {
    // อัพเดท Tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.closest('.tab').classList.add('active');
    
    // อัพเดท Sections
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    
    if (tab === 'wheel') {
        document.getElementById('wheelSection').classList.add('active');
    } else if (tab === 'leaderboard') {
        document.getElementById('leaderboardSection').classList.add('active');
        renderLeaderboard();
    } else if (tab === 'vip') {
        document.getElementById('vipSection').classList.add('active');
    }
}

// ============ Loading ============
function showLoading() {
    document.getElementById('loading').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading').classList.remove('active');
}

// ============ ซิงค์ข้อมูลกับเกมหลัก ============
function syncWithMainGame() {
    const gameData = JSON.parse(localStorage.getItem('miningGameData')) || {};
    
    // อัพเดต Leaderboard ด้วยข้อมูลผู้เล่น
    if (gameData.username && gameData.balance) {
        const userIndex = leaderboardData.findIndex(p => p.username === gameData.username);
        
        if (userIndex === -1 && gameData.balance > leaderboardData[9].earnings) {
            leaderboardData.pop();
            leaderboardData.push({
                rank: 10,
                username: gameData.username,
                earnings: gameData.balance,
                power: gameData.totalPower || 1,
                vip: userVIP
            });
            
            // เรียงใหม่
            leaderboardData.sort((a, b) => b.earnings - a.earnings);
            leaderboardData.forEach((p, i) => p.rank = i + 1);
            
            renderLeaderboard();
        }
    }
}

setInterval(syncWithMainGame, 5000);
syncWithMainGame();

// ปิด dropdown เมื่อคลิกข้างนอก
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        document.getElementById('langDropdown').classList.remove('active');
    }
});

console.log('🎰 Lucky Wheel System Loaded!');
console.log('🏆 Leaderboard System Loaded!');
console.log('👑 VIP System Loaded!');
console.log('🌍 Multi-language Support Loaded!');
console.log('🌓 Theme System Loaded!');
