
(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- THEME ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var iconSun = 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8z';
  var iconMoon = 'M20 14.5A8.5 8.5 0 119.5 4 7 7 0 0020 14.5z';
  var iconEl = document.getElementById('themeIcon');

  function paintIcon(){
    var isDark = root.classList.contains('dark');
    iconEl.innerHTML = '<path d="' + (isDark ? iconMoon : iconSun) + '"/>';
  }

  function applyTheme(){
    root.classList.toggle('dark');
    paintIcon();
    try{ localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light'); }catch(e){}
  }

  var savedTheme = null;
  try{ savedTheme = localStorage.getItem('theme'); }catch(e){}
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  paintIcon();

  toggle.addEventListener('click', function(e){
    if (reduceMotion || !document.startViewTransition) { applyTheme(); return; }
    var x = e.clientX, y = e.clientY;
    var endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var transition = document.startViewTransition(function(){ applyTheme(); });
    transition.ready.then(function(){
      document.documentElement.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + endRadius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 650, easing: 'cubic-bezier(.22,.9,.3,1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });

  /* ---------- NAV show/hide + blur ---------- */
  var nav = document.getElementById('nav');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    if (y > lastY && y > 200) nav.classList.add('hide');
    else nav.classList.remove('hide');
    lastY = y;
  }, { passive: true });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry, i){
        if (entry.isIntersecting) {
          setTimeout(function(){ entry.target.classList.add('in'); }, i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Rotating hero words ---------- */
  var words = ['REST APIs', 'Django & Flask apps', 'Third-party integrations', 'Automation scripts'];
  var cycleEl = document.getElementById('cycleWords');
  words.forEach(function(w, i){
    var span = document.createElement('span');
    span.textContent = w;
    if (i === 0) span.classList.add('active');
    cycleEl.appendChild(span);
  });
  if (!reduceMotion) {
    var idx = 0;
    setInterval(function(){
      var spans = cycleEl.querySelectorAll('span');
      spans[idx].classList.remove('active');
      spans[idx].classList.add('leaving');
      var next = (idx + 1) % spans.length;
      spans[next].classList.add('active');
      setTimeout(function(){ spans[idx].classList.remove('leaving'); }, 500);
      idx = next;
    }, 2600);
  }

  /* ---------- Terminal typing effect ---------- */
  var termHTML =
    '<span class="kw">def</span> <span class="fn">sync_orders</span>(source, target):\n' +
    '    payload = source.<span class="fn">fetch</span>(<span class="str">"/orders?status=new"</span>)\n' +
    '    <span class="kw">for</span> order <span class="kw">in</span> payload[<span class="str">"data"</span>]:\n' +
    '        target.<span class="fn">post</span>(<span class="str">"/orders"</span>, json=order)\n' +
    '    <span class="kw">return</span> len(payload[<span class="str">"data"</span>])';
  var termEl = document.getElementById('terminalBody');
  if (reduceMotion) {
    termEl.innerHTML = termHTML;
  } else {
    var plain = termHTML.replace(/<[^>]+>/g, function(tag){ return '\u0001' + tag + '\u0001'; });
    var i2 = 0, out = '', typing = null;
    function typeStep(){
      if (i2 >= plain.length) { termEl.innerHTML += '<span class="caret"></span>'; return; }
      var chunk = '';
      while (i2 < plain.length) {
        var ch = plain[i2];
        if (ch === '\u0001') {
          var end = plain.indexOf('\u0001', i2 + 1);
          chunk += plain.slice(i2, end + 1);
          i2 = end + 1;
        } else { chunk += ch; i2++; break; }
      }
      out += chunk.replace(/\u0001/g, '');
      var rendered = out;
      termEl.innerHTML = rendered;
      typing = setTimeout(typeStep, 14 + Math.random() * 18);
    }
    var startObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { typeStep(); startObserver.disconnect(); }
      });
    }, { threshold: 0.4 });
    startObserver.observe(document.querySelector('.terminal'));
  }

  /* ---------- Project card tilt + glow ---------- */
  document.querySelectorAll('.project-card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      var mx = e.clientX - r.left, my = e.clientY - r.top;
      card.style.setProperty('--mx', mx + 'px');
      card.style.setProperty('--my', my + 'px');
      if (reduceMotion) return;
      var rx = ((my / r.height) - 0.5) * -6;
      var ry = ((mx / r.width) - 0.5) * 6;
      card.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-2px)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ---------- Magnetic buttons ---------- */
  if (!reduceMotion) {
    document.querySelectorAll('.btn').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (mx * 0.25) + 'px,' + (my * 0.35) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = 'translate(0,0)'; });
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var submitBtn = document.getElementById('formSubmit');
    var noteEl = document.getElementById('formNote');
    var defaultNote = noteEl.textContent;

    function fieldOf(input){ return input.closest('.field'); }

    function validate(){
      var ok = true;
      var nameInput = document.getElementById('cf-name');
      var emailInput = document.getElementById('cf-email');
      var msgInput = document.getElementById('cf-message');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      [ [nameInput, nameInput.value.trim().length > 0],
        [emailInput, emailPattern.test(emailInput.value.trim())],
        [msgInput, msgInput.value.trim().length > 3]
      ].forEach(function(pair){
        var el = pair[0], valid = pair[1];
        var wrap = fieldOf(el);
        wrap.classList.remove('invalid');
        if (!valid) {
          ok = false;
          void wrap.offsetWidth; // restart shake animation
          wrap.classList.add('invalid');
        }
      });
      return ok;
    }

    // Clear the error state as soon as someone starts fixing a field.
    form.querySelectorAll('input, textarea').forEach(function(el){
      el.addEventListener('input', function(){ fieldOf(el).classList.remove('invalid'); });
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (submitBtn.classList.contains('loading') || submitBtn.classList.contains('success')) return;
      if (!validate()) return;

      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();

      submitBtn.classList.add('loading');
      noteEl.textContent = 'Getting your message ready…';

      // ---- Default: hand off to the visitor's email client. ----
      // To send silently instead (no mail app popup), replace this block with
      // a fetch() call to a form backend, e.g. Formspree:
      //   fetch('https://formspree.io/f/YOUR_ID', { method:'POST', headers:{'Accept':'application/json'}, body: new FormData(form) })
      setTimeout(function(){
        var subject = encodeURIComponent('Portfolio inquiry from ' + name);
        var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
        window.location.href = 'mailto:hello@jordan.dev?subject=' + subject + '&body=' + body;

        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        noteEl.textContent = 'Your email app should be open now — just hit send.';

        setTimeout(function(){
          submitBtn.classList.remove('success');
          noteEl.textContent = defaultNote;
          form.reset();
        }, 3800);
      }, 700);
    });
  }

  /* ---------- Network canvas (signature hero animation) ---------- */
  var canvas = document.getElementById('network-canvas');
  var ctx = canvas.getContext('2d');
  var hero = document.querySelector('.hero');
  var W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);
  var nodes = [];
  var packets = [];
  var mouse = { x: null, y: null };
  var NODE_COUNT;

  function resize(){
    W = hero.offsetWidth; H = hero.offsetHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    NODE_COUNT = Math.max(18, Math.min(46, Math.floor((W * H) / 26000)));
    buildNodes();
  }

  function buildNodes(){
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.4 + Math.random() * 1.6
      });
    }
  }

  hero.addEventListener('mousemove', function(e){
    var r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', function(){ mouse.x = null; mouse.y = null; });

  var linkColor, nodeColor;
  function readColors(){
    var s = getComputedStyle(root);
    linkColor = s.getPropertyValue('--canvas-link').trim();
    nodeColor = s.getPropertyValue('--canvas-node').trim();
  }
  readColors();
  var themeObserver = new MutationObserver(readColors);
  themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

  var LINK_DIST = 140;

  function maybeSpawnPacket(){
    if (Math.random() > 0.02) return;
    var candidates = [];
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        if (Math.hypot(dx, dy) < LINK_DIST) candidates.push([i, j]);
      }
    }
    if (!candidates.length) return;
    var pick = candidates[Math.floor(Math.random() * candidates.length)];
    packets.push({ a: pick[0], b: pick[1], t: 0, speed: 0.012 + Math.random() * 0.01 });
  }

  function step(){
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (mouse.x !== null) {
        var dx = n.x - mouse.x, dy = n.y - mouse.y;
        var d = Math.hypot(dx, dy);
        if (d < 120 && d > 0.1) {
          var f = (120 - d) / 120 * 0.02;
          n.vx += (dx / d) * f; n.vy += (dy / d) * f;
        }
      }
      n.vx *= 0.99; n.vy *= 0.99;
      var sp = Math.hypot(n.vx, n.vy);
      if (sp > 0.6) { n.vx = (n.vx / sp) * 0.6; n.vy = (n.vy / sp) * 0.6; }
      if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
    }

    for (var i2 = 0; i2 < nodes.length; i2++) {
      for (var j = i2 + 1; j < nodes.length; j++) {
        var a = nodes[i2], b = nodes[j];
        var dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = 'rgba(' + linkColor + ',' + (1 - dist / LINK_DIST) * 0.35 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }

    for (var k = 0; k < nodes.length; k++) {
      var nd = nodes[k];
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + nodeColor + ',0.55)';
      ctx.fill();
    }

    if (!reduceMotion) {
      maybeSpawnPacket();
      packets = packets.filter(function(p){ return p.t <= 1; });
      packets.forEach(function(p){
        var a = nodes[p.a], b = nodes[p.b];
        if (!a || !b) { p.t = 2; return; }
        p.t += p.speed;
        var px = a.x + (b.x - a.x) * p.t;
        var py = a.y + (b.y - a.y) * p.t;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + linkColor + ',0.9)';
        ctx.shadowColor = 'rgba(' + linkColor + ',0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(step);

})();
