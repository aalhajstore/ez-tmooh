(function(){
  const links=[['الرئيسية','home'],['خدماتنا','services'],['نافس','nafes'],['التحليل والخطط','process'],['نماذج الأعمال','portfolio'],['لماذا نحن؟','why-us'],['تواصل معنا','contact']];
  const nav=links.map(([label,id])=>`<a href="#${id}">${label}</a>`).join('');
  document.getElementById('site-header').innerHTML=`<nav class="navbar container" aria-label="التنقل الرئيسي">
    <a class="brand" href="#home" aria-label="عزنا بطموحنا - الرئيسية"><span class="brand-mark">ع</span><span><b>عزنا بطموحنا</b><small>خدمات المعلمين والمعلمات</small></span></a>
    <button class="theme-toggle" type="button" aria-label="تفعيل الوضع الليلي" title="تغيير مظهر الموقع"><span class="theme-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z"/></svg></span></button>
    <button class="menu-toggle" type="button" aria-label="فتح القائمة" aria-expanded="false"><span></span><span></span><span></span></button>
    <div class="nav-links">${nav}</div>
    <a class="button button-sm nav-cta" href="${APP_CONFIG.whatsappOrder}" target="_blank" rel="noopener">اطلب عبر واتساب</a>
  </nav>`;
})();
