const fs = require('fs');
const path = require('path');

console.log('domain-config.txt okunuyor...');

try {
  const txtPath = path.join(__dirname, 'domain-config.txt');
  const txtContent = fs.readFileSync(txtPath, 'utf8');
  
  const lines = txtContent.split('\n').filter(line => line.trim() !== ''); // Boş satırları atla

  const kvArray = lines.map(line => {
    // Satırdaki ilk '|' karakterinin konumunu bul
    const separatorIndex = line.indexOf('|');
    
    // Eğer '|' bulunamazsa, bu satırı atla (veya bir hata olarak işaretle)
    if (separatorIndex === -1) {
      console.warn(`Uyarı: Bu satırda '|' ayraç bulunamadı, atlanıyor: "${line}"`);
      return null; // Bu satırı geç
    }
    
    // Key: İlk '|' karakterine kadar olan kısım
    const key = line.substring(0, separatorIndex).trim();
    
    // Value: İlk '|' karakterinden sonraki kısmın tamamı
    const value = line.substring(separatorIndex + 1).trim();
    
    return { key, value };
  }).filter(item => item !== null); // Geçersiz (null) satırları temizle

  const jsonPath = path.join(__dirname, 'kv-toplu-yukleme.json');
  fs.writeFileSync(jsonPath, JSON.stringify(kvArray, null, 2));
  
  console.log(`Başarılı! ${kvArray.length} adet kayıt 'kv-toplu-yukleme.json' dosyasına yazıldı.`);
  console.log("Artık 'wrangler kv:bulk put' komutunu kullanabilirsiniz.");

} catch (error) {
  console.error('Hata oluştu:', error.message);
}