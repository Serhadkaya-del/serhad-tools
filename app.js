// --- Vibe Coding ---
function vcToggle(baslik) {
    baslik.closest('.vc-not').classList.toggle('acik');
}

function vcAra() {
    const aranan = document.getElementById('vcAraInput').value.toLowerCase().trim();
    const notlar = document.querySelectorAll('#vcNotlar .vc-not');
    const bos = document.getElementById('vcBosmesaj');
    const sayac = document.getElementById('vcSayac');
    let gorunen = 0;

    notlar.forEach(not => {
        const metin = not.textContent.toLowerCase();
        const eslesti = metin.includes(aranan);

        if (!aranan) {
            not.style.display = '';
            not.classList.remove('acik');
            gorunen++;
        } else if (eslesti) {
            not.style.display = '';
            not.classList.add('acik');
            gorunen++;
        } else {
            not.style.display = 'none';
            not.classList.remove('acik');
        }
    });

    bos.style.display = gorunen === 0 ? 'block' : 'none';
    sayac.textContent = aranan ? gorunen + ' not bulundu' : notlar.length + ' not';
}

window.addEventListener('load', function() {
    const sayac = document.getElementById('vcSayac');
    if (sayac) {
        const notlar = document.querySelectorAll('#vcNotlar .vc-not');
        sayac.textContent = notlar.length + ' not';
    }
});

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
        document.getElementById('gecmis').textContent = islem + ' =';
        document.getElementById('ekran').textContent = sonuc;
        islem = String(sonuc);
    } catch (e) {
        document.getElementById('ekran').textContent = 'Hata';
        islem = '';
    }
}

// --- Dev Sozluk ---
const sozlukVerisi = [
    // TEMEL
    {terim:'API', okunus:'ey-pi-ay', anlam:'Application Programming Interface. Uygulamalarin birbirleriyle konusmasi icin kullanilan arayuz. Mesela hava durumu API\'si sana hava bilgisini verir.', ornek:'fetch("https://api.weather.com/istanbul") — hava durumu API\'sine istek atar', kat:'temel'},
    {terim:'Bug', okunus:'bag', anlam:'Yazilimdaki hata. Kodun beklenmedik sekilde calismasi.', ornek:'"Login butonuna tiklaninca sayfa cokuyor" — bu bir bug', kat:'temel'},
    {terim:'Debug', okunus:'di-bag', anlam:'Bug\'i bulmak ve duzeltmek. Kodun neden hatali calistigini arastirmak.', ornek:'console.log() ile degiskenleri yazdirip hatanin kaynagini bulmak = debug', kat:'temel'},
    {terim:'Framework', okunus:'freym-vork', anlam:'Hazir yapi/iskelet. Uygulama gelistirmek icin temel yapitaslari sunar. Sifirdan yazma, hazir altyapiyi kullan.', ornek:'React Native bir framework — mobil uygulama yapmak icin hazir yapilar sunar', kat:'temel'},
    {terim:'Library (Kutuphane)', okunus:'laybri', anlam:'Belirli bir isi yapan hazir kod paketi. Framework\'ten farki: sen onu cagirirsin, framework seni cagirir.', ornek:'Axios bir library — sadece HTTP istekleri yapmaya yarar', kat:'temel'},
    {terim:'IDE', okunus:'ay-di-i', anlam:'Integrated Development Environment. Kod yazma, debug, test gibi her seyi yapabildigin program.', ornek:'VS Code, Android Studio, Xcode hepsi birer IDE', kat:'temel'},
    {terim:'Variable (Degisken)', okunus:'veriyıbıl', anlam:'Veri saklayan kutu. Icerigini degistirebilirsin.', ornek:'let sayi = 5; // sayi adinda bir degisken, icinde 5 var', kat:'temel'},
    {terim:'Function (Fonksiyon)', okunus:'fanksiyon', anlam:'Belirli bir isi yapan kod blogu. Bir kere yaz, istedigin kadar cagir.', ornek:'function topla(a, b) { return a + b; } // iki sayi toplar', kat:'temel'},
    {terim:'String', okunus:'string', anlam:'Metin/yazi verisi. Tirnak icine yazilir.', ornek:'"Merhaba Serhad" bir string\'dir', kat:'temel'},
    {terim:'Array (Dizi)', okunus:'erey', anlam:'Birden fazla veriyi sirayla tutan liste.', ornek:'let renkler = ["kirmizi", "mavi", "yesil"]; // 3 elemanli dizi', kat:'temel'},
    {terim:'Object (Nesne)', okunus:'objekt', anlam:'Anahtar-deger ciflerinden olusan veri yapisi.', ornek:'let kullanici = { ad: "Serhad", yas: 30 };', kat:'temel'},
    {terim:'Boolean', okunus:'buliın', anlam:'Sadece true (dogru) veya false (yanlis) olan veri tipi.', ornek:'let girisYapildi = true;', kat:'temel'},
    {terim:'Loop (Dongu)', okunus:'luup', anlam:'Bir kod blogunu tekrar tekrar calistirmak.', ornek:'for (let i = 0; i < 10; i++) { ... } // 10 kere calisir', kat:'temel'},
    {terim:'Conditional (Kosul)', okunus:'kondisyınıl', anlam:'Bir sart dogru ise bir sey yap, degilse baska sey yap.', ornek:'if (yas >= 18) { "girebilir" } else { "giremez" }', kat:'temel'},
    {terim:'Syntax', okunus:'sintaks', anlam:'Programlama dilinin yazim kurallari. Yanlis yazarsan "syntax error" alisin.', ornek:'Noktali virgul unutmak, parantez kapatmamak = syntax error', kat:'temel'},
    {terim:'Runtime', okunus:'rantaym', anlam:'Kodun calistigi an/ortam. Runtime error = kod calisirken olan hata.', ornek:'Var olmayan bir dosyayi okumaya calismak runtime error verir', kat:'temel'},
    {terim:'Compile', okunus:'kompayl', anlam:'Yazdigin kodu makinenin anladigi dile cevirmek.', ornek:'Java kodunu javac ile compile edersin, .class dosyasi olusur', kat:'temel'},
    {terim:'Console', okunus:'konsol', anlam:'Komut yazdigin ve ciktilari gordugun metin ekrani. Terminal de denir.', ornek:'console.log("merhaba") yazinca konsolda "merhaba" gorursun', kat:'temel'},
    {terim:'Parameter / Argument', okunus:'parametre / arguman', anlam:'Fonksiyona disaridan verilen deger. Parametre = tanimda, arguman = cagirirken.', ornek:'function selamla(ad) {...} // ad parametre. selamla("Serhad") // "Serhad" arguman', kat:'temel'},
    {terim:'Return', okunus:'ritorn', anlam:'Fonksiyonun sonuc dondermesi.', ornek:'function topla(a,b) { return a + b; } // toplami geri dondurur', kat:'temel'},
    {terim:'Null / Undefined', okunus:'nal / andifaynd', anlam:'null = bilerek bos birakilan. undefined = hic deger atanmamis.', ornek:'let x; // undefined. let y = null; // bilerek bos', kat:'temel'},
    {terim:'Callback', okunus:'kolbek', anlam:'Baska bir fonksiyona parametre olarak verilen fonksiyon. "Isini bitirince bunu cagir" mantigi.', ornek:'setTimeout(function() { alert("3 sn gecti") }, 3000);', kat:'temel'},
    {terim:'Async / Await', okunus:'eysink / eveyt', anlam:'Asenkron islemleri beklemek icin kullanilir. API cagrisi gibi zaman alan islerde kullanilir.', ornek:'const veri = await fetch(url); // cevap gelene kadar bekle', kat:'temel'},
    {terim:'JSON', okunus:'ceyson', anlam:'JavaScript Object Notation. Veri tasima formati. API\'ler genelde JSON dondurur.', ornek:'{"ad": "Serhad", "yas": 30} — bu bir JSON', kat:'temel'},
    {terim:'Scope', okunus:'skop', anlam:'Bir degiskenin erisilebilir oldugu alan. Local scope = sadece fonksiyon icinde, global = her yerde.', ornek:'Fonksiyon icinde tanimlanan let disaridan erisilemez', kat:'temel'},

    // GIT
    {terim:'Repository (Repo)', okunus:'ripozitori', anlam:'Projenin tum dosyalarini ve degisiklik gecmisini tutan depo.', ornek:'git init — yeni bir repo olusturur', kat:'git'},
    {terim:'Commit', okunus:'komit', anlam:'Degisiklikleri kayit altina almak. Bir "kayit noktasi" olusturur.', ornek:'git commit -m "login ekrani eklendi"', kat:'git'},
    {terim:'Push', okunus:'pus', anlam:'Local commit\'leri uzak sunucuya (GitHub) gondermek.', ornek:'git push origin main — degisiklikleri GitHub\'a gonderir', kat:'git'},
    {terim:'Pull', okunus:'pul', anlam:'Uzak sunucudan (GitHub) en son degisiklikleri cekip kendi bilgisayarina almak.', ornek:'git pull — takim arkadasinin push\'ladigi kodlari alirsin', kat:'git'},
    {terim:'Clone', okunus:'klon', anlam:'Uzak bir repoyu kendi bilgisayarina kopyalamak.', ornek:'git clone https://github.com/user/proje.git', kat:'git'},
    {terim:'Branch (Dal)', okunus:'branc', anlam:'Ana koddan bagimsiz calisma kopya. Yeni ozellik gelistirirken ana kodu bozmamak icin.', ornek:'git checkout -b yeni-ozellik — yeni dal olustur ve gec', kat:'git'},
    {terim:'Merge', okunus:'morc', anlam:'Iki branch\'i birlestirmek. Ozellik dalini ana koda eklemek.', ornek:'git merge yeni-ozellik — yeni-ozellik dalini ana koda ekler', kat:'git'},
    {terim:'Conflict', okunus:'konflikt', anlam:'Iki kisi ayni satiri degistirdiginde olusan catisma. Manuel cozulur.', ornek:'<<<< HEAD ... ==== ... >>>> branch-adi seklinde gosterilir', kat:'git'},
    {terim:'Stage / Staging', okunus:'steyc', anlam:'Commit\'e dahil edilecek degisiklikleri hazirlamak. "Sahneye almak" gibi.', ornek:'git add dosya.js — dosyayi stage\'e alir', kat:'git'},
    {terim:'Diff', okunus:'dif', anlam:'Iki versiyon arasindaki farki gostermek. Neyin degistigini gormek.', ornek:'VS Code\'da dosyaya tiklarsan kirmizi/yesil fark gorursun = diff', kat:'git'},
    {terim:'Pull Request (PR)', okunus:'pul rikuest', anlam:'Kodunu incelemesi icin takima gonderdigin istek. "Su degisiklikleri ana koda ekleyelim mi?" demek.', ornek:'GitHub\'da "New Pull Request" butonuyla olusturulur', kat:'git'},
    {terim:'Fork', okunus:'fork', anlam:'Baskasinin reposunu kendi hesabina kopyalamak. Ozgurce degisiklik yapabilirsin.', ornek:'Acik kaynak projeye katki icin once fork edersin', kat:'git'},
    {terim:'.gitignore', okunus:'git-ignor', anlam:'Git\'in takip etmemesini istedigin dosyalari belirttigin dosya.', ornek:'node_modules/ ve .env dosyalari genelde .gitignore\'a eklenir', kat:'git'},
    {terim:'Stash', okunus:'stas', anlam:'Yarim kalan degisiklikleri gecici olarak sakla, sonra geri getir.', ornek:'git stash — degisiklikleri sakla. git stash pop — geri getir', kat:'git'},

    // WEB
    {terim:'HTML', okunus:'eyctiemell', anlam:'HyperText Markup Language. Web sayfasinin iskeleti/yapisi. Basliklar, paragraflar, butonlar...', ornek:'<h1>Merhaba</h1> <p>Bu bir paragraf</p>', kat:'web'},
    {terim:'CSS', okunus:'si-es-es', anlam:'Cascading Style Sheets. Web sayfasinin gorunumunu belirler. Renkler, boyutlar, yerlesim...', ornek:'body { background: black; color: white; }', kat:'web'},
    {terim:'JavaScript (JS)', okunus:'cava-skript', anlam:'Web sayfasina hareket/etkilesim katan programlama dili. Butona tiklaninca bir sey yap gibi.', ornek:'document.getElementById("btn").onclick = function() { alert("hey!") }', kat:'web'},
    {terim:'DOM', okunus:'dom', anlam:'Document Object Model. HTML\'in JavaScript ile erisilebildigi ag yapisi.', ornek:'document.getElementById("baslik") — HTML\'deki basligi JS ile yakalar', kat:'web'},
    {terim:'Frontend', okunus:'frontEnd', anlam:'Kullanicinin gordugu ve etkilestigi taraf. HTML, CSS, JS...', ornek:'Bir butonun rengi, sayfanin tasarimi = frontend', kat:'web'},
    {terim:'Backend', okunus:'bekEnd', anlam:'Kullanicinin gormedigi sunucu tarafi. Veritabani, islemler, guvenlik...', ornek:'Kullanici giris yapinca sifre kontrolu backend\'de olur', kat:'web'},
    {terim:'Fullstack', okunus:'fulstEk', anlam:'Hem frontend hem backend yapabilen gelistirici veya uygulama.', ornek:'Hem React hem Node.js bilen kisi = fullstack developer', kat:'web'},
    {terim:'Responsive', okunus:'risponsiv', anlam:'Farkli ekran boyutlarina uyum saglayan tasarim. Telefon, tablet, bilgisayar...', ornek:'@media (max-width: 768px) { ... } — telefon icin ozel stil', kat:'web'},
    {terim:'HTTP / HTTPS', okunus:'eyctitipi', anlam:'Web\'de veri iletisim protokolu. HTTPS = sifreli/guvenli versiyonu.', ornek:'https://google.com — HTTPS ile guvenli baglanti', kat:'web'},
    {terim:'URL', okunus:'yuarel', anlam:'Uniform Resource Locator. Web adresi.', ornek:'https://serhadkaya-del.github.io/serhad-tools/ bir URL', kat:'web'},
    {terim:'Cookie', okunus:'kuki', anlam:'Tarayicida saklanan kucuk veri parcasi. Oturum bilgisi, tercihler icin kullanilir.', ornek:'Siteye giris yapinca cookie kaydedilir, tekrar giriste hatirlar', kat:'web'},
    {terim:'LocalStorage', okunus:'lokıl-storac', anlam:'Tarayicida kalici veri saklama. Cookie\'den buyuk, sunucuya gitmez.', ornek:'localStorage.setItem("tema", "karanlik") — tema tercihini saklar', kat:'web'},
    {terim:'npm', okunus:'en-pi-em', anlam:'Node Package Manager. JavaScript paketlerini (kutuphaneleri) yuklemek icin.', ornek:'npm install axios — axios kutuphanesini projeye ekler', kat:'web'},
    {terim:'Deploy', okunus:'diploy', anlam:'Uygulamayi canli sunucuya yayinlamak. "Siteyi yayina almak."', ornek:'GitHub Pages ile deploy ettik = siteyi internete actik', kat:'web'},
    {terim:'Server', okunus:'sorvır', anlam:'Istek alan ve cevap donduren bilgisayar/program.', ornek:'GitHub\'un sunuculari senin siteni kullanicilara sunar', kat:'web'},
    {terim:'DNS', okunus:'di-en-es', anlam:'Domain Name System. Alan adini IP adresine cevirir.', ornek:'google.com yazinca DNS bunu 142.250.x.x IP\'sine cevirir', kat:'web'},

    // MOBIL
    {terim:'React Native', okunus:'riekt neytiv', anlam:'JavaScript ile iOS ve Android uygulama yapma framework\'u. Bir kod yaz, iki platformda calis.', ornek:'iptvAPP projesi React Native ile yapildi', kat:'mobil'},
    {terim:'Component (Bilesen)', okunus:'kompınınt', anlam:'Kullanici arayuzunun yeniden kullanilabilir parcasi. Buton, kart, liste gibi.', ornek:'<LoginScreen /> — giris ekrani bir component', kat:'mobil'},
    {terim:'State', okunus:'steyt', anlam:'Component\'in degisebilen verisi. State degisince ekran otomatik guncellenir.', ornek:'const [sayac, setSayac] = useState(0); // sayac state\'i', kat:'mobil'},
    {terim:'Props', okunus:'props', anlam:'Component\'e disaridan verilen degerler. Sadece okunabilir.', ornek:'<Buton renk="kirmizi" /> — renk bir prop', kat:'mobil'},
    {terim:'Navigation', okunus:'nevigeysin', anlam:'Ekranlar arasi gecis sistemi. Stack, Tab, Drawer turleri var.', ornek:'Ana sayfa → Detay sayfasina gecis = navigation', kat:'mobil'},
    {terim:'Emulator / Simulator', okunus:'emyuleytır', anlam:'Bilgisayarda sanal telefon calistirmak. Android = emulator, iOS = simulator.', ornek:'Android Studio\'daki sanal telefon bir emulator', kat:'mobil'},
    {terim:'Build', okunus:'bild', anlam:'Kodu derleyip cihazda calisabilir hale getirmek. APK (Android) veya IPA (iOS).', ornek:'npx react-native run-android — Android build\'i baslatir', kat:'mobil'},
    {terim:'Bundle', okunus:'bandıl', anlam:'Tum JavaScript kodunu tek bir dosyada birlestirmek.', ornek:'Metro bundler React Native\'de JS kodunu paketler', kat:'mobil'},
    {terim:'Hot Reload', okunus:'hat rilod', anlam:'Kod degisikligini aninda ekranda gormek, uygulama kapanmadan.', ornek:'JS dosyasini kaydedince emulator\'de aninda guncellenir', kat:'mobil'},
    {terim:'APK', okunus:'ey-pi-key', anlam:'Android Application Package. Android uygulamasinin kurulum dosyasi.', ornek:'APK dosyasini telefona atip kurabilirsin', kat:'mobil'},
    {terim:'CocoaPods', okunus:'kokopods', anlam:'iOS icin paket yoneticisi. iOS kutuphanelerini projeye ekler.', ornek:'pod install — iOS bagimliliklerini kurar', kat:'mobil'},
    {terim:'Gradle', okunus:'greydıl', anlam:'Android icin build araci. Derleme, paketleme islerini yapar.', ornek:'android/build.gradle dosyasinda Android ayarlari bulunur', kat:'mobil'},

    // GENEL
    {terim:'Open Source (Acik Kaynak)', okunus:'opın sors', anlam:'Kaynak kodu herkesin gorebilecegi, kullanabilecegi yazilim.', ornek:'React, Linux, VS Code hepsi acik kaynak', kat:'genel'},
    {terim:'Stack', okunus:'stek', anlam:'Bir projedeki teknoloji kombinasyonu.', ornek:'MERN Stack = MongoDB + Express + React + Node.js', kat:'genel'},
    {terim:'Dependency (Bagimlilik)', okunus:'dipendınsi', anlam:'Projenin ihtiyac duydugu dis paket/kutuphane.', ornek:'package.json\'daki "dependencies" listesi = projenin bagimliliklari', kat:'genel'},
    {terim:'Environment (Ortam)', okunus:'envayırmınt', anlam:'Kodun calistigi yer. Development (gelistirme), staging (test), production (canli).', ornek:'.env dosyasinda API anahtarlari gibi ortam degiskenleri tutulur', kat:'genel'},
    {terim:'Terminal / CLI', okunus:'terminal / si-el-ay', anlam:'Komut satiri arayuzu. Yaziyla komut vererek bilgisayari yonetmek.', ornek:'Terminal\'de "npm start" yazarak uygulamayi baslatirsin', kat:'genel'},
    {terim:'SDK', okunus:'es-di-key', anlam:'Software Development Kit. Belirli platform icin gelistirme araclari paketi.', ornek:'Android SDK — Android uygulamasi gelistirmek icin gerekli araclar', kat:'genel'},
    {terim:'Refactor', okunus:'rifektır', anlam:'Kodu davranisini degistirmeden daha temiz/anlasilir hale getirmek.', ornek:'Ayni isi yapan 3 fonksiyonu tek bir genel fonksiyonda birlestirmek', kat:'genel'},
    {terim:'Legacy Code', okunus:'legısi kod', anlam:'Eski, genelde kimsenin dokunmak istemedigi kod.', ornek:'"Bu legacy kod, dokunma bozulur" — yaygin developer sohbeti', kat:'genel'},
    {terim:'Production', okunus:'prodaksiyon', anlam:'Canli ortam. Gercek kullanicilarin kullandigi versiyon.', ornek:'"Production\'a deploy ettik" = siteyi yayina aldik', kat:'genel'},
    {terim:'Localhost', okunus:'lokılhost', anlam:'Kendi bilgisayarinda calisan yerel sunucu. Test icin kullanilir.', ornek:'http://localhost:3000 — kendi bilgisayarinda calisan site', kat:'genel'},
    {terim:'Token', okunus:'tokın', anlam:'Kimlik dogrulama icin kullanilan ozel anahtar/sifre.', ornek:'GitHub token\'i ile git push yapabilirsin', kat:'genel'},
    {terim:'Endpoint', okunus:'endpoint', anlam:'API\'nin belirli bir adresindeki erisim noktasi.', ornek:'/api/users — kullanici listesini donduren endpoint', kat:'genel'},
    {terim:'Cache', okunus:'kes', anlam:'Sik kullanilan verileri hizli erismek icin gecici olarak saklamak.', ornek:'Tarayici CSS dosyasini cache\'ler, her seferinde indirmez', kat:'genel'},
    {terim:'Latency', okunus:'leytınsi', anlam:'Gecikme suresi. Istek gonderip cevap alma arasindaki sure.', ornek:'Sunucu uzaktaysa latency yuksek olur, sayfa gec acilar', kat:'genel'},
    {terim:'Middleware', okunus:'midılver', anlam:'Istek ile cevap arasinda calisan ara katman.', ornek:'Kullanici giris yapti mi kontrolu bir middleware ile yapilir', kat:'genel'},
    {terim:'Boilerplate', okunus:'boylerpleyt', anlam:'Her projede tekrarlanan temel/baslangic kodu.', ornek:'npx react-native init MyApp — boilerplate olusturur', kat:'genel'},
    {terim:'Snippet', okunus:'snippet', anlam:'Kucuk, yeniden kullanilabilir kod parcasi.', ornek:'VS Code\'da "rfce" yazinca React component snippet\'i olusur', kat:'genel'},
    {terim:'Linter', okunus:'lintır', anlam:'Kodu tarayip hata ve kotu pratikleri bulan arac.', ornek:'ESLint — "bu degisken tanimlanmis ama kullanilmamis" der', kat:'genel'},
    {terim:'TypeScript', okunus:'tayp-skript', anlam:'JavaScript\'e tip guvenligi ekleyen dil. Hatalari yazarken yakalar.', ornek:'let ad: string = "Serhad"; // ad sadece string olabilir', kat:'genel'},
    {terim:'Vibe Coding', okunus:'vayb koding', anlam:'AI ile birlikte, sezgisel sekilde kod yazmak. Detaylara takilmadan akista kalmak.', ornek:'Claude\'a "bana bi takvim yap" demek = vibe coding', kat:'genel'},
];

let aktifSozlukKat = 'hepsi';

function sozlukFiltre() {
    const aranan = document.getElementById('sozlukAra').value.toLowerCase();
    const liste = document.getElementById('sozlukListe');
    const sayac = document.getElementById('sozlukSayac');

    let sonuclar = sozlukVerisi;
    if (aktifSozlukKat !== 'hepsi') {
        sonuclar = sonuclar.filter(s => s.kat === aktifSozlukKat);
    }
    if (aranan) {
        sonuclar = sonuclar.filter(s =>
            s.terim.toLowerCase().includes(aranan) ||
            s.anlam.toLowerCase().includes(aranan)
        );
    }

    sayac.textContent = sonuclar.length + ' terim bulundu';

    liste.innerHTML = sonuclar.map(s => `
        <div class="sozluk-item" onclick="this.classList.toggle('acik')">
            <div class="terim-baslik">
                <span class="terim">${s.terim}</span>
                <span class="kategori-badge">${s.kat}</span>
            </div>
            <div class="okunus">${s.okunus}</div>
            <div class="anlam">${s.anlam}</div>
            <div class="ornek">${s.ornek}</div>
        </div>
    `).join('');
}

function sozlukKat(kat) {
    aktifSozlukKat = kat;
    document.querySelectorAll('.soz-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    sozlukFiltre();
}

// --- Hesap Tab Degistirme ---
function hesapTabDegistir(id) {
    document.querySelectorAll('.hesap-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.hesap-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
    if (id === 'cevirici') cevKategori('uzunluk');
}

// --- Bilimsel Hesap Makinesi ---
let bilimselIslem = '';

function bilimselYaz(deger) {
    bilimselIslem += deger;
    const gosterim = bilimselIslem
        .replace(/Math\.sin\(/g, 'sin(')
        .replace(/Math\.cos\(/g, 'cos(')
        .replace(/Math\.tan\(/g, 'tan(')
        .replace(/Math\.log10\(/g, 'log(')
        .replace(/Math\.log\(/g, 'ln(')
        .replace(/Math\.sqrt\(/g, '√(')
        .replace(/Math\.abs\(/g, '|')
        .replace(/Math\.PI/g, 'π')
        .replace(/Math\.E/g, 'e')
        .replace(/\*\*/g, '^');
    document.getElementById('bilimselEkran').textContent = gosterim || '0';
}

function bilimselTemizle() {
    bilimselIslem = '';
    document.getElementById('bilimselEkran').textContent = '0';
    document.getElementById('bilimselGecmis').textContent = '';
}

function bilimselHesapla() {
    try {
        const sonuc = eval(bilimselIslem);
        const gosterim = bilimselIslem
            .replace(/Math\.sin\(/g, 'sin(')
            .replace(/Math\.cos\(/g, 'cos(')
            .replace(/Math\.tan\(/g, 'tan(')
            .replace(/Math\.log10\(/g, 'log(')
            .replace(/Math\.log\(/g, 'ln(')
            .replace(/Math\.sqrt\(/g, '√(')
            .replace(/Math\.abs\(/g, '|')
            .replace(/Math\.PI/g, 'π')
            .replace(/Math\.E/g, 'e')
            .replace(/\*\*/g, '^');
        document.getElementById('bilimselGecmis').textContent = gosterim + ' =';
        document.getElementById('bilimselEkran').textContent = Number(sonuc.toFixed(10));
        bilimselIslem = String(sonuc);
    } catch (e) {
        document.getElementById('bilimselEkran').textContent = 'Hata';
        bilimselIslem = '';
    }
}

// --- Cevirici ---
const birimler = {
    uzunluk: {
        birimler: ['mm', 'cm', 'm', 'km', 'inc (inch)', 'ft (feet)', 'yard', 'mil (mile)'],
        anahtarlar: ['mm', 'cm', 'm', 'km', 'inch', 'ft', 'yard', 'mile'],
        metreye: [0.001, 0.01, 1, 1000, 0.0254, 0.3048, 0.9144, 1609.344]
    },
    agirlik: {
        birimler: ['mg', 'g', 'kg', 'ton', 'ons (oz)', 'pound (lb)'],
        anahtarlar: ['mg', 'g', 'kg', 'ton', 'oz', 'lb'],
        grama: [0.001, 1, 1000, 1000000, 28.3495, 453.592]
    },
    sicaklik: {
        birimler: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'],
        anahtarlar: ['C', 'F', 'K'],
        ozel: true
    },
    hiz: {
        birimler: ['m/s', 'km/h', 'mil/h (mph)', 'knot'],
        anahtarlar: ['ms', 'kmh', 'mph', 'knot'],
        msye: [1, 0.277778, 0.44704, 0.514444]
    },
    alan: {
        birimler: ['mm²', 'cm²', 'm²', 'km²', 'hektar', 'donum', 'acre'],
        anahtarlar: ['mm2', 'cm2', 'm2', 'km2', 'hektar', 'donum', 'acre'],
        m2ye: [0.000001, 0.0001, 1, 1000000, 10000, 1000, 4046.86]
    },
    hacim: {
        birimler: ['mL', 'L', 'm³', 'galon (US)', 'bardak'],
        anahtarlar: ['mL', 'L', 'm3', 'galon', 'bardak'],
        litreye: [0.001, 1, 1000, 3.78541, 0.2366]
    },
    zaman: {
        birimler: ['saniye', 'dakika', 'saat', 'gun', 'hafta', 'ay', 'yil'],
        anahtarlar: ['sn', 'dk', 'saat', 'gun', 'hafta', 'ay', 'yil'],
        saniyeye: [1, 60, 3600, 86400, 604800, 2592000, 31536000]
    },
    veri: {
        birimler: ['Bit', 'Byte', 'KB', 'MB', 'GB', 'TB', 'PB'],
        anahtarlar: ['bit', 'byte', 'KB', 'MB', 'GB', 'TB', 'PB'],
        byteA: [0.125, 1, 1024, 1048576, 1073741824, 1099511627776, 1125899906842624]
    }
};

let aktifKategori = 'uzunluk';

function cevKategori(kat) {
    aktifKategori = kat;
    document.querySelectorAll('.cev-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    const b1 = document.getElementById('cevBirim1');
    const b2 = document.getElementById('cevBirim2');
    b1.innerHTML = '';
    b2.innerHTML = '';

    birimler[kat].birimler.forEach((b, i) => {
        b1.innerHTML += `<option value="${i}">${b}</option>`;
        b2.innerHTML += `<option value="${i}">${b}</option>`;
    });

    if (birimler[kat].birimler.length > 1) b2.selectedIndex = 1;
    document.getElementById('cevGirdi').value = '';
    document.getElementById('cevSonuc').value = '';
    document.getElementById('cevHizli').innerHTML = '';
}

function cevir() {
    const deger = parseFloat(document.getElementById('cevGirdi').value);
    if (isNaN(deger)) {
        document.getElementById('cevSonuc').value = '';
        document.getElementById('cevHizli').innerHTML = '';
        return;
    }

    const i1 = parseInt(document.getElementById('cevBirim1').value);
    const i2 = parseInt(document.getElementById('cevBirim2').value);
    const kat = birimler[aktifKategori];
    let sonuc;

    if (aktifKategori === 'sicaklik') {
        sonuc = sicaklikCevir(deger, i1, i2);
    } else {
        const carpanlar = kat.metreye || kat.grama || kat.msye || kat.m2ye || kat.litreye || kat.saniyeye || kat.byteA;
        sonuc = deger * carpanlar[i1] / carpanlar[i2];
    }

    document.getElementById('cevSonuc').value = Number(sonuc.toFixed(8));

    // Hizli cevrim tablosu
    const hizli = document.getElementById('cevHizli');
    hizli.innerHTML = '';
    kat.birimler.forEach((b, i) => {
        if (i === i1) return;
        let s;
        if (aktifKategori === 'sicaklik') {
            s = sicaklikCevir(deger, i1, i);
        } else {
            const carpanlar = kat.metreye || kat.grama || kat.msye || kat.m2ye || kat.litreye || kat.saniyeye || kat.byteA;
            s = deger * carpanlar[i1] / carpanlar[i];
        }
        hizli.innerHTML += `<div class="cev-hizli-item"><span>${b}</span><span>${Number(s.toFixed(6))}</span></div>`;
    });
}

function sicaklikCevir(deger, kimden, kime) {
    // Oncekelvin'e cevir
    let kelvin;
    if (kimden === 0) kelvin = deger + 273.15;        // C -> K
    else if (kimden === 1) kelvin = (deger - 32) * 5/9 + 273.15; // F -> K
    else kelvin = deger;                                // K

    // Kelvin'den hedefe
    if (kime === 0) return kelvin - 273.15;            // K -> C
    if (kime === 1) return (kelvin - 273.15) * 9/5 + 32; // K -> F
    return kelvin;                                      // K
}

// --- Notlar ---
window.addEventListener('load', function() {
    sozlukFiltre();
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
