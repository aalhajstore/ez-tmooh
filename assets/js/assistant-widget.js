(function () {
  if (document.getElementById('chat-launcher')) return;
  const suggestionsHtml = APP_DATA.faqs.map(([question], index) =>
    `<button class="chat-suggestion" type="button" data-faq-index="${index}">${question}</button>`
  ).join('');

  document.body.insertAdjacentHTML('beforeend', `
    <button id="chat-launcher" class="chat-launcher" type="button" aria-label="فتح مساعد الأسئلة" aria-expanded="false" aria-controls="chat-panel">
      <span class="launcher-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 5.5h14a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5h-7l-4.5 3v-3H5A2.5 2.5 0 0 1 2.5 15V8A2.5 2.5 0 0 1 5 5.5Z"/><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"/></svg></span>
      <span class="launcher-label">اسأل مساعد عزنا</span>
      <span class="launcher-badge" aria-hidden="true">1</span>
    </button>
    <aside id="chat-panel" class="chat-panel" aria-label="مساعد الأسئلة الشائعة" aria-hidden="true">
      <div class="chat-head">
        <span class="chat-avatar" aria-hidden="true">ع</span>
        <div><strong>مساعد عزنا</strong><small><i></i> متاح الآن</small></div>
        <button id="clear-chat" type="button" aria-label="مسح المحادثة">↻</button>
        <button id="close-chat" type="button" aria-label="إغلاق المحادثة">×</button>
      </div>
      <div id="chat-log" class="chat-log" role="log" aria-live="polite" aria-relevant="additions">
        <div class="chat-message bot"><span>مرحبًا بك 👋 اسألني عن خدماتنا، نافس، التحليل، الخطط أو طريقة الطلب.</span></div>
      </div>
      <div id="chat-suggestions" class="chat-suggestions" aria-label="أسئلة مقترحة">${suggestionsHtml}</div>
      <form id="chat-form" class="chat-form">
        <label class="sr-only" for="chat-input">اكتب سؤالك</label>
        <input id="chat-input" type="text" maxlength="180" autocomplete="off" placeholder="اكتب سؤالك هنا...">
        <button type="submit" aria-label="إرسال السؤال">إرسال</button>
      </form>
    </aside>`);

  const launcher = document.getElementById('chat-launcher');
  const panel = document.getElementById('chat-panel');
  const closeButton = document.getElementById('close-chat');
  const clearButton = document.getElementById('clear-chat');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const log = document.getElementById('chat-log');
  const suggestions = document.getElementById('chat-suggestions');
  let replyTimer;

  const keywordGroups = [
    ['تخصيص', 'بيانات', 'مدرسة'], ['نافس'],
    ['تحليل', 'نتائج', 'مهارات', 'اتقان', 'إتقان'],
    ['علاجية', 'اثرائية', 'إثرائية', 'خطة'],
    ['طلب', 'اطلب', 'تواصل', 'واتساب'], ['دفع', 'الدفع', 'متى']
  ];

  function setOpen(open) {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    launcher.querySelector('.launcher-badge').hidden = true;
  }

  function addMessage(text, sender) {
    const message = document.createElement('div');
    const bubble = document.createElement('span');
    message.className = `chat-message ${sender}`;
    bubble.textContent = text;
    message.appendChild(bubble);
    log.appendChild(message);
    log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
    return message;
  }

  function addTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-message bot chat-typing';
    typing.setAttribute('aria-label', 'المساعد يكتب الآن');
    typing.innerHTML = '<span><i></i><i></i><i></i></span>';
    log.appendChild(typing);
    log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
    return typing;
  }

  function findAnswer(question) {
    const normalized = question.trim().toLowerCase();
    let bestIndex = -1, bestScore = 0;
    keywordGroups.forEach((keywords, index) => {
      const score = keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; bestIndex = index; }
    });
    return bestIndex >= 0 ? APP_DATA.faqs[bestIndex][1] : 'لم أجد إجابة دقيقة ضمن الأسئلة الشائعة. يمكنك اختيار أحد الأسئلة المقترحة أو التواصل معنا عبر واتساب.';
  }

  function reply(question, fixedIndex) {
    if (!question.trim() || replyTimer) return;
    addMessage(question, 'user');
    input.value = '';
    const typing = addTyping();
    const answer = Number.isInteger(fixedIndex) ? APP_DATA.faqs[fixedIndex][1] : findAnswer(question);
    const delay = Math.min(1800, 700 + answer.length * 9);
    replyTimer = window.setTimeout(() => {
      typing.remove();
      addMessage(answer, 'bot');
      replyTimer = null;
      if (window.matchMedia('(min-width: 769px)').matches) input.focus();
    }, delay);
  }

  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  closeButton.addEventListener('click', () => { setOpen(false); launcher.focus(); });
  form.addEventListener('submit', event => { event.preventDefault(); reply(input.value); });
  suggestions.addEventListener('click', event => {
    const button = event.target.closest('[data-faq-index]');
    if (!button) return;
    const index = Number(button.dataset.faqIndex);
    reply(APP_DATA.faqs[index][0], index);
  });
  clearButton.addEventListener('click', () => {
    window.clearTimeout(replyTimer); replyTimer = null;
    log.replaceChildren();
    addMessage('تم بدء محادثة جديدة. كيف يمكنني مساعدتك؟', 'bot');
    if (window.matchMedia('(min-width: 769px)').matches) input.focus();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && panel.classList.contains('open')) setOpen(false); });
})();
