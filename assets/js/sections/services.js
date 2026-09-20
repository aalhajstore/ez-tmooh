(function(){
  const cards=APP_DATA.services.map((s,i)=>`<article id="service-${i+1}" class="service-card reveal"><span class="card-number">${String(i+1).padStart(2,'0')}</span><span class="icon-box">${s.icon}</span><h3>${s.title}</h3><p>${s.desc}</p><details><summary>عرض الخدمات</summary><ul>${s.items.map(x=>`<li>${x}</li>`).join('')}</ul></details></article>`).join('');
  document.getElementById('services-section').innerHTML=`<section id="services" class="section"><div class="container"><div class="section-heading reveal"><span class="eyebrow">خدماتنا</span><h2>خدمات متكاملة للمعلمين والمعلمات والإداريين</h2><p>من الملف البسيط إلى الخطة المتكاملة، نوفر خدمات تعليمية وإدارية قابلة للتخصيص.</p></div><div class="services-grid">${cards}</div></div></section>`;
})();
