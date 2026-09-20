(function(){
  const menu=document.querySelector('.menu-toggle'), links=document.querySelector('.nav-links');
  const themeButton=document.querySelector('.theme-toggle'), themeIcon=themeButton.querySelector('.theme-icon');
  function updateThemeButton(){const dark=document.documentElement.dataset.theme==='dark';themeIcon.innerHTML=dark?'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>':'<svg viewBox="0 0 24 24"><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z"/></svg>';themeButton.setAttribute('aria-label',dark?'تفعيل الوضع النهاري':'تفعيل الوضع الليلي');themeButton.setAttribute('aria-pressed',String(dark))}
  updateThemeButton();
  themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('azm-theme',next)}catch(_){}updateThemeButton()});
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));links.classList.toggle('open');document.body.classList.toggle('menu-open',!open)});
  links.addEventListener('click',e=>{if(e.target.matches('a')){links.classList.remove('open');menu.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}});
  document.querySelectorAll('.faq-item button').forEach(btn=>btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));btn.parentElement.classList.toggle('open',!open);btn.querySelector('span').textContent=open?'+':'−'}));
  const groups=['.services-grid','.nafes-grid','.benefits-grid','.steps','.faq-list'];
  groups.forEach(selector=>document.querySelector(selector)?.querySelectorAll(':scope > .reveal').forEach((item,index)=>item.style.setProperty('--reveal-delay',`${Math.min(index,5)*90}ms`)));
  const reveal=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');reveal.unobserve(x.target)}}),{threshold:.12,rootMargin:'0px 0px -35px'});document.querySelectorAll('.reveal').forEach(x=>reveal.observe(x));
  const progress=document.getElementById('scroll-progress'), topBtn=document.getElementById('back-to-top');
  function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`;topBtn.classList.toggle('show',scrollY>600)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  document.getElementById('floating-whatsapp').href=APP_CONFIG.whatsappOrder;
})();
