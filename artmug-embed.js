/* Mo Mon - 아트머그 소개글용 연결 스크립트
 * 아트머그 소개글에 iframe과 함께 넣어 사용합니다.
 * - 페이지가 열린 뒤 iframe 높이를 내용에 맞게 늘립니다. ("내용 더 보기" 없이 전체 표시)
 * - 커스텀 메뉴(PC 오른쪽 / 모바일 하단)의 #momon-섹션 링크를 누르면 해당 섹션으로 이동합니다.
 * - 지금 보고 있는 섹션의 메뉴를 강조합니다.
 */
(function () {
  if (window.__momonEmbed) return;
  window.__momonEmbed = true;

  var OFFSET = 70; // 이동할 때 화면 위쪽에 남길 여백(px)
  var frame = null, childOrigin = '', contentHeight = 0, sections = {};
  var pageLoaded = document.readyState === 'complete', applied = false, ticking = false;

  function findFrame() {
    var list = document.querySelectorAll('iframe');
    for (var i = 0; i < list.length; i++) {
      if (/momon-site/.test(list[i].src) && /embed=artmug/.test(list[i].src)) return list[i];
    }
    return null;
  }

  function post(msg) {
    if (frame && frame.contentWindow) frame.contentWindow.postMessage(msg, childOrigin || '*');
  }

  function frameTop() {
    return frame.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
  }

  // 아트머그는 페이지가 열릴 때(load) 소개글 높이가 3000px 이상이면 접어 둡니다.
  // 그래서 load가 끝난 뒤에 높이를 적용합니다.
  function applyHeight() {
    if (!frame || !pageLoaded || !contentHeight) return;
    frame.style.height = contentHeight + 'px';
    frame.setAttribute('scrolling', 'no');
    frame.style.overflow = 'hidden';
    if (!applied) {
      applied = true;
      var box = frame.closest ? frame.closest('.detailinfo') : null;
      if (box && box.classList.contains('showstep1')) {
        box.classList.remove('showstep1');
        var more = document.querySelector('.btn_open');
        if (more) more.style.display = 'none';
      }
    }
    schedule();
  }

  function goTo(name) {
    if (name === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (!frame) return;
    var y = frameTop() + (sections[name] || 0) - OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  function highlight() {
    var links = document.querySelectorAll('a[href^="#momon-"]');
    if (!links.length || !frame) return;
    var base = frameTop(), mark = (window.pageYOffset || document.documentElement.scrollTop) + window.innerHeight * 0.4;
    var current = '';
    for (var k in sections) if (base + sections[k] <= mark) current = k;
    if (base > mark) current = '';
    for (var i = 0; i < links.length; i++) {
      var a = links[i], name = a.getAttribute('href').slice(7);
      if (name === 'top') continue;
      if (name === current) a.setAttribute('data-momon-active', '');
      else a.removeAttribute('data-momon-active');
    }
  }

  function report() {
    ticking = false;
    if (!frame) return;
    var r = frame.getBoundingClientRect();
    post({ channel: 'momon-embed', type: 'viewport', top: Math.max(0, -r.top), height: window.innerHeight });
    highlight();
  }

  function schedule() {
    if (!ticking) { ticking = true; requestAnimationFrame(report); }
  }

  // 메뉴 마우스 오버 / 현재 섹션 강조 스타일
  function addStyle() {
    if (document.getElementById('momon-menu-style')) return;
    var st = document.createElement('style');
    st.id = 'momon-menu-style';
    st.textContent =
      'a[href^="#momon-"]{transition:background .2s,color .2s,transform .2s!important;cursor:pointer}' +
      'a[href^="#momon-"]:not([href="#momon-top"]):not([data-momon-active]):hover{background:#eef0f7!important;color:#343849!important;transform:translateX(-2px)}' +
      'a[href="#momon-top"]:hover{color:#343849!important}' +
      'a[href^="#momon-"][data-momon-active]{background:#777f9f!important;color:#ffffff!important}';
    (document.head || document.documentElement).appendChild(st);
  }

  // PC 오른쪽 메뉴를 광고 배너 오른쪽으로 옮겨 광고를 가리지 않게 함
  var GAP = 16;
  function placeMenu() {
    var link = document.querySelector('#custom_code a[href^="#momon-"]') || document.querySelector('a[href="#momon-top"]');
    if (!link) return;
    var menu = link.parentElement;
    while (menu && menu !== document.body && getComputedStyle(menu).position !== 'fixed') menu = menu.parentElement;
    if (!menu || menu === document.body || menu.offsetWidth === 0) return;
    var ads = document.querySelectorAll('[class*="ad_banner"]'), ad = null;
    for (var i = 0; i < ads.length; i++) {
      var r = ads[i].getBoundingClientRect();
      if (r.width > 40 && r.height > 40 && r.left > window.innerWidth / 2) { if (!ad || r.right > ad.right) ad = r; }
    }
    if (!ad) return;
    var left = ad.right + GAP, max = window.innerWidth - menu.offsetWidth - 12;
    menu.style.left = Math.max(0, Math.min(left, max)) + 'px';
    menu.style.transform = 'translateY(-50%)';
  }

  function init() {
    addStyle();
    placeMenu();
    window.addEventListener('resize', placeMenu);
    window.addEventListener('load', function () { placeMenu(); setTimeout(placeMenu, 1000); });
    frame = findFrame();
    if (!frame) return;
    try { childOrigin = new URL(frame.src, location.href).origin; } catch (e) { childOrigin = '*'; }

    window.addEventListener('message', function (e) {
      if (!frame || e.source !== frame.contentWindow) return;
      if (childOrigin !== '*' && e.origin !== childOrigin) return;
      var d = e.data;
      if (!d || d.channel !== 'momon-embed') return;
      if (d.type === 'size') {
        var h = Math.ceil(Number(d.height));
        if (h > 0 && h < 100000) contentHeight = h;
        if (d.sections && typeof d.sections === 'object') sections = d.sections;
        applyHeight();
      }
    });

    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#momon-"]') : null;
      if (!a) return;
      e.preventDefault();
      goTo(a.getAttribute('href').slice(7));
    });

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    frame.addEventListener('load', function () { post({ channel: 'momon-embed', type: 'hello' }); schedule(); });
    post({ channel: 'momon-embed', type: 'hello' });
  }

  window.addEventListener('load', function () {
    // 아트머그의 높이 검사가 먼저 끝나도록 한 박자 늦게 적용
    setTimeout(function () { pageLoaded = true; applyHeight(); }, 50);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
