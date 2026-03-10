// --- Tab Değiştirme ---
function tabDegistir(id) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

// --- Yapılacaklar ---
function ekle() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span onclick="this.parentElement.classList.toggle('done')">${text}</span>
        <button class="sil-btn" onclick="this.parentElement.remove()">Sil</button>
    `;
    document.getElementById('liste').appendChild(li);
    input.value = '';
    input.focus();
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') ekle();
});

// --- Hesap Makinesi ---
let islem = '';

function yaz(deger) {
    if (islem === '0' || islem === '') {
        islem = deger;
    } else {
        islem += deger;
    }
    document.getElementById('ekran').textContent = islem;
}

function temizle() {
    islem = '';
    document.getElementById('ekran').textContent = '0';
}

function sil() {
    islem = islem.slice(0, -1);
    document.getElementById('ekran').textContent = islem || '0';
}

function hesapla() {
    try {
        const sonuc = eval(islem);
        document.getElementById('ekran').textContent = sonuc;
        islem = String(sonuc);
    } catch (e) {
        document.getElementById('ekran').textContent = 'Hata';
        islem = '';
    }
}

// --- Notlar ---
window.addEventListener('load', function() {
    const kayitliNot = localStorage.getItem('serhad-notlar');
    if (kayitliNot) {
        document.getElementById('notAlani').value = kayitliNot;
    }
});

function notKaydet() {
    const not = document.getElementById('notAlani').value;
    localStorage.setItem('serhad-notlar', not);
    alert('Not kaydedildi!');
}

function notTemizle() {
    document.getElementById('notAlani').value = '';
    localStorage.removeItem('serhad-notlar');
}

// --- Takvim ---
let takvimYil = new Date().getFullYear();
let takvimAy = new Date().getMonth();

const ayIsimleri = ['Ocak','Subat','Mart','Nisan','Mayis','Haziran','Temmuz','Agustos','Eylul','Ekim','Kasim','Aralik'];

// Resmi tatiller (sabit)
const resmiTatiller = {
    '1-1': {ad: 'Yilbasi', tip: 'tatil', ikon: '🎆'},
    '4-23': {ad: 'Ulusal Egemenlik ve Cocuk Bayrami', tip: 'tatil', ikon: '🇹🇷'},
    '5-1': {ad: 'Emek ve Dayanisma Gunu', tip: 'tatil', ikon: '✊'},
    '5-19': {ad: 'Ataturku Anma, Genclik ve Spor Bayrami', tip: 'tatil', ikon: '🇹🇷'},
    '7-15': {ad: '15 Temmuz Demokrasi ve Milli Birlik Gunu', tip: 'tatil', ikon: '🇹🇷'},
    '8-30': {ad: 'Zafer Bayrami', tip: 'tatil', ikon: '🇹🇷'},
    '10-29': {ad: 'Cumhuriyet Bayrami', tip: 'tatil', ikon: '🇹🇷'},
};

// Onemli gunler ve anma gunleri
const onemliGunler = {
    '1-5': {ad: 'Adnan Menderes\'in Dogum Gunu', tip: 'onemli', ikon: '📌'},
    '1-13': {ad: 'Basin Onur Gunu', tip: 'onemli', ikon: '📰'},
    '2-14': {ad: 'Sevgililer Gunu', tip: 'onemli', ikon: '❤️'},
    '3-8': {ad: 'Dunya Kadinlar Gunu', tip: 'onemli', ikon: '👩'},
    '3-14': {ad: 'Tip Bayrami', tip: 'onemli', ikon: '🩺'},
    '3-18': {ad: 'Canakkale Zaferi', tip: 'onemli', ikon: '⚔️'},
    '3-21': {ad: 'Nevruz / Dunya Ormancilik Gunu', tip: 'onemli', ikon: '🌳'},
    '3-22': {ad: 'Dunya Su Gunu', tip: 'onemli', ikon: '💧'},
    '4-7': {ad: 'Dunya Saglik Gunu', tip: 'onemli', ikon: '🏥'},
    '4-22': {ad: 'Dunya Dunya Gunu', tip: 'onemli', ikon: '🌍'},
    '5-5': {ad: 'Ataturku Anma ve Genclik Haftasi Baslangici', tip: 'onemli', ikon: '📌'},
    '6-5': {ad: 'Dunya Cevre Gunu', tip: 'onemli', ikon: '🌿'},
    '6-21': {ad: 'Babalar Gunu (2026)', tip: 'onemli', ikon: '👨'},
    '8-26': {ad: 'Buyuk Taarruzun Yildonumu', tip: 'onemli', ikon: '⚔️'},
    '9-1': {ad: 'Dunya Baris Gunu', tip: 'onemli', ikon: '🕊️'},
    '9-9': {ad: 'Izmirin Kurtulusu', tip: 'onemli', ikon: '🇹🇷'},
    '10-4': {ad: 'Dunya Hayvanlar Gunu', tip: 'onemli', ikon: '🐾'},
    '10-13': {ad: 'Ankaranin Baskent Olusunun Yildonumu', tip: 'onemli', ikon: '🏛️'},
    '10-24': {ad: 'Birlesmis Milletler Gunu', tip: 'onemli', ikon: '🌐'},
    '11-10': {ad: 'Ataturku Anma Gunu', tip: 'onemli', ikon: '🖤'},
    '11-24': {ad: 'Ogretmenler Gunu', tip: 'onemli', ikon: '📚'},
    '12-10': {ad: 'Dunya Insan Haklari Gunu', tip: 'onemli', ikon: '✋'},
};

// Doga olaylari 2026
const dogaOlaylari = {
    '1-4': {ad: 'Quadrantid Meteor Yagmuru (Zirve)', tip: 'doga', ikon: '☄️'},
    '1-13': {ad: 'Dolunay (Kurt Ayi)', tip: 'doga', ikon: '🌕'},
    '1-29': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '2-1': {ad: 'Cin Yeni Yili (At Yili)', tip: 'onemli', ikon: '🐴'},
    '2-12': {ad: 'Dolunay (Kar Ayi)', tip: 'doga', ikon: '🌕'},
    '2-27': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '3-14': {ad: 'Dolunay', tip: 'doga', ikon: '🌕'},
    '3-20': {ad: 'Ilkbahar Ekinoksu (Gece = Gunduz)', tip: 'doga', ikon: '🌸'},
    '3-29': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '4-13': {ad: 'Dolunay (Pembe Ay)', tip: 'doga', ikon: '🌕'},
    '4-22': {ad: 'Lyrid Meteor Yagmuru (Zirve)', tip: 'doga', ikon: '☄️'},
    '4-27': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '5-12': {ad: 'Dolunay (Cicek Ayi)', tip: 'doga', ikon: '🌕'},
    '5-27': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '6-10': {ad: 'Dolunay (Cilek Ayi)', tip: 'doga', ikon: '🌕'},
    '6-21': {ad: 'Yaz Gun Donumu (En Uzun Gun)', tip: 'doga', ikon: '☀️'},
    '6-25': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '7-10': {ad: 'Dolunay (Geyik Ayi)', tip: 'doga', ikon: '🌕'},
    '7-25': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '7-28': {ad: 'Delta Aquarid Meteor Yagmuru', tip: 'doga', ikon: '☄️'},
    '8-8': {ad: 'Dolunay (Mersin Ayi)', tip: 'doga', ikon: '🌕'},
    '8-12': {ad: 'Perseid Meteor Yagmuru (Zirve)', tip: 'doga', ikon: '☄️'},
    '8-23': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '9-7': {ad: 'Dolunay (Misir Ayi)', tip: 'doga', ikon: '🌕'},
    '9-21': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '9-22': {ad: 'Sonbahar Ekinoksu (Gece = Gunduz)', tip: 'doga', ikon: '🍂'},
    '10-6': {ad: 'Dolunay (Avcinin Ayi)', tip: 'doga', ikon: '🌕'},
    '10-21': {ad: 'Orionid Meteor Yagmuru (Zirve)', tip: 'doga', ikon: '☄️'},
    '10-21-2': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '11-5': {ad: 'Dolunay (Kunduz Ayi)', tip: 'doga', ikon: '🌕'},
    '11-17': {ad: 'Leonid Meteor Yagmuru (Zirve)', tip: 'doga', ikon: '☄️'},
    '11-20': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '12-4': {ad: 'Dolunay (Soguk Ay)', tip: 'doga', ikon: '🌕'},
    '12-14': {ad: 'Geminid Meteor Yagmuru (Zirve)', tip: 'doga', ikon: '☄️'},
    '12-19': {ad: 'Yeni Ay', tip: 'doga', ikon: '🌑'},
    '12-21': {ad: 'Kis Gun Donumu (En Kisa Gun)', tip: 'doga', ikon: '❄️'},
};

// Dini gunler 2026 (tahmini hicri takvim)
const diniGunler = {
    '2-17': {ad: 'Regaib Kandili', tip: 'dini', ikon: '🕌'},
    '3-9': {ad: 'Mirac Kandili', tip: 'dini', ikon: '🕌'},
    '3-26': {ad: 'Berat Kandili', tip: 'dini', ikon: '🕌'},
    '4-10': {ad: 'Ramazan Baslangici', tip: 'dini', ikon: '🌙'},
    '4-25': {ad: 'Kadir Gecesi', tip: 'dini', ikon: '🕌'},
    '5-10': {ad: 'Ramazan Bayrami (1. Gun)', tip: 'tatil', ikon: '🌙'},
    '5-11': {ad: 'Ramazan Bayrami (2. Gun)', tip: 'tatil', ikon: '🌙'},
    '5-12-2': {ad: 'Ramazan Bayrami (3. Gun)', tip: 'tatil', ikon: '🌙'},
    '7-17': {ad: 'Kurban Bayrami (1. Gun)', tip: 'tatil', ikon: '🐑'},
    '7-18': {ad: 'Kurban Bayrami (2. Gun)', tip: 'tatil', ikon: '🐑'},
    '7-19': {ad: 'Kurban Bayrami (3. Gun)', tip: 'tatil', ikon: '🐑'},
    '7-20': {ad: 'Kurban Bayrami (4. Gun)', tip: 'tatil', ikon: '🐑'},
    '8-7': {ad: 'Hicri Yilbasi', tip: 'dini', ikon: '🕌'},
    '10-16': {ad: 'Mevlid Kandili', tip: 'dini', ikon: '🕌'},
};

function gunEtkinlikleri(ay, gun) {
    const key = `${ay + 1}-${gun}`;
    const etkinlikler = [];

    if (resmiTatiller[key]) etkinlikler.push(resmiTatiller[key]);
    if (onemliGunler[key]) etkinlikler.push(onemliGunler[key]);
    if (dogaOlaylari[key]) etkinlikler.push(dogaOlaylari[key]);
    if (diniGunler[key]) etkinlikler.push(diniGunler[key]);

    return etkinlikler;
}

function takvimCiz() {
    const grid = document.getElementById('takvimGrid');
    const baslik = document.getElementById('takvimBaslik');
    grid.innerHTML = '';
    document.getElementById('gunDetay').innerHTML = '';

    baslik.textContent = `${ayIsimleri[takvimAy]} ${takvimYil}`;

    const ilkGun = new Date(takvimYil, takvimAy, 1).getDay();
    const gunSayisi = new Date(takvimYil, takvimAy + 1, 0).getDate();
    const bugun = new Date();

    // Pazartesi = 0 olacak sekilde ayarla (JS'de Pazar=0)
    const baslangic = ilkGun === 0 ? 6 : ilkGun - 1;

    for (let i = 0; i < baslangic; i++) {
        const bos = document.createElement('div');
        bos.className = 'takvim-gun bos';
        grid.appendChild(bos);
    }

    for (let gun = 1; gun <= gunSayisi; gun++) {
        const div = document.createElement('div');
        div.className = 'takvim-gun';
        div.textContent = gun;

        const etkinlikler = gunEtkinlikleri(takvimAy, gun);

        if (bugun.getDate() === gun && bugun.getMonth() === takvimAy && bugun.getFullYear() === takvimYil) {
            div.classList.add('bugun');
        }

        if (etkinlikler.length > 0) {
            const noktaDiv = document.createElement('div');
            noktaDiv.className = 'nokta';
            const tipler = [...new Set(etkinlikler.map(e => e.tip))];
            tipler.forEach(tip => {
                const nokta = document.createElement('i');
                nokta.className = tip === 'tatil' ? 'dot tatil' : tip === 'onemli' ? 'dot onemli' : tip === 'doga' ? 'dot doga' : 'dot dini';
                noktaDiv.appendChild(nokta);
            });
            div.appendChild(noktaDiv);

            // En yuksek oncelikli tipi class olarak ekle
            if (tipler.includes('tatil')) div.classList.add('tatil');
            else if (tipler.includes('dini')) div.classList.add('dini');
            else if (tipler.includes('onemli')) div.classList.add('onemli');
            else if (tipler.includes('doga')) div.classList.add('doga');
        }

        div.onclick = () => gunDetayGoster(gun, etkinlikler);
        grid.appendChild(div);
    }
}

function gunDetayGoster(gun, etkinlikler) {
    const detay = document.getElementById('gunDetay');
    if (etkinlikler.length === 0) {
        detay.innerHTML = `<div class="etkinlik"><span class="eikon">📅</span> ${gun} ${ayIsimleri[takvimAy]} — Etkinlik yok</div>`;
        return;
    }
    detay.innerHTML = etkinlikler.map(e =>
        `<div class="etkinlik"><span class="eikon">${e.ikon}</span> ${e.ad}</div>`
    ).join('');
}

function ayDegistir(yön) {
    takvimAy += yön;
    if (takvimAy < 0) { takvimAy = 11; takvimYil--; }
    if (takvimAy > 11) { takvimAy = 0; takvimYil++; }
    takvimCiz();
}

// Sayfa yuklendiginde takvimi ciz
window.addEventListener('load', function() {
    if (document.getElementById('takvimGrid')) takvimCiz();
});
