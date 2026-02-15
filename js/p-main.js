document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mHamburger');
  const menu = document.getElementById('mMenu');
  if (!btn || !menu) return;

  const isOpen = () => menu.classList.contains('is-open');

  const openMenu = () => {
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };

  btn.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // 點背景關閉（點到面板不關）
  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });
});








// ========================================✅ Triptych：使用 #jrModal（只留一套）小卡===============================
(function () {
  const modalWrap = document.getElementById('jrModal');
  const closeBtn  = document.getElementById('jrModalClose');
  if (!modalWrap || !closeBtn) return;

  const modalTitle = modalWrap.querySelector('.jr-modal-title');
  const modalImg   = modalWrap.querySelector('.jr-modal-img');
  const modalBody  = modalWrap.querySelector('.jr-modal-body');

  function openModal({ title = '', img = '', content = '' }) {
    modalTitle.textContent = title;

    if (img) {
      modalImg.src = img;
      modalImg.style.display = 'block';
    } else {
      modalImg.removeAttribute('src');
      modalImg.style.display = 'none';
    }

    // 內容：保留換行（每段變成一個 <p>）
    modalBody.innerHTML = '';
    String(content)
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(txt => {
        const p = document.createElement('p');
        p.textContent = txt;
        modalBody.appendChild(p);
      });

    modalWrap.classList.add('is-open');
    document.body.classList.add('jr-modal-open');
  }

  function closeModal() {
    modalWrap.classList.remove('is-open');
    document.body.classList.remove('jr-modal-open');
  }

  // 點箭頭按鈕開啟
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.jr-overlay-btn');
    if (!btn) return;

    openModal({
      title: btn.dataset.title || '',
      img: btn.dataset.img || '',
      content: btn.dataset.content || ''
    });
  });

  // 關閉：X
  closeBtn.addEventListener('click', closeModal);

  // 關閉：點背景
  modalWrap.addEventListener('click', (e) => {
    if (e.target === modalWrap) closeModal();
  });

  // 關閉：ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();



