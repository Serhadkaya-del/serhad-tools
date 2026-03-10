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
