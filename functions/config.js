// functions/config.js

export async function onRequest(context) {
  try {
    // 1. Gelen isteğin URL'sinden 'domain' parametresini al
    // (Örn: /config?domain=site1.com)
    const { searchParams } = new URL(context.request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      // Eğer ?domain=... parametresi gelmezse hata ver
      return new Response('Hata: Domain parametresi eksik.', { status: 400 });
    }

    // 2. KV Deposuna Bağlan ve veriyi çek
    // ÖNEMLİ: context.env.SITE_CONFIGS bağlaması bir sonraki adımda yapılacak.
    if (!context.env.SITE_CONFIGS) {
         return new Response('Hata: KV Namespace baglantisi yapilmamis.', { status: 500 });
    }
     
    const configString = await context.env.SITE_CONFIGS.get(domain);

    if (configString === null) {
      // Eğer o domain KV'de bulunamazsa (veya www'li haliyle aratın)
      // Belki www'siz halidir?
      const wwwDomain = `www.${domain}`;
      const configStringWww = await context.env.SITE_CONFIGS.get(wwwDomain);

      if(configStringWww === null) {
        // İki türlü de bulunamadıysa 404 ver
        return new Response('Hata: Konfigurasyon bulunamadi.', { status: 404 });
      }
      // www'li bulunduysa onu döndür
      return new Response(configStringWww, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // 3. Veri bulundu! Sadece o domaine ait veriyi tarayıcıya yolla
    return new Response(configString, {
      headers: { 'Content-Type': 'text/plain' },
    });

  } catch (err) {
    return new Response('Sunucu hatasi: ' + err.message, { status: 500 });
  }
}