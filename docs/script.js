(function () {
  var el = document.getElementById('typed');
  if (!el) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lines = [
    { prompt: '$ ', text: 'whoami', kind: 'cmd' },
    { prompt: '', text: 'itznan', kind: 'out' },
    { prompt: '$ ', text: 'focus', kind: 'cmd' },
    { prompt: '', text: 'systems, native tools & ai workflows', kind: 'out' }
  ];

  function renderStatic() {
    var html = '';
    lines.forEach(function (l) {
      if (l.kind === 'cmd') html += '<span class="prompt">' + l.prompt + '</span>' + l.text + '\n';
      else html += '<span class="out">' + l.text + '</span>\n';
    });
    html += '<span class="prompt">$ </span><span class="cursor">&nbsp;</span>';
    el.innerHTML = html;
  }

  if (reduced) {
    renderStatic();
    return;
  }

  var lineIndex = 0, charIndex = 0;
  var built = '';

  function step() {
    if (lineIndex >= lines.length) {
      el.innerHTML = built + '<span class="prompt">$ </span><span class="cursor">&nbsp;</span>';
      return;
    }
    var l = lines[lineIndex];
    var full = l.prompt + l.text;
    charIndex++;
    var partial = full.slice(0, charIndex);
    var cls = l.kind === 'cmd' ? 'prompt' : 'out';
    var prefix = l.kind === 'cmd' && charIndex >= l.prompt.length
      ? '<span class="' + cls + '">' + l.prompt + '</span>' + partial.slice(l.prompt.length)
      : '<span class="' + cls + '">' + partial + '</span>';
    el.innerHTML = built + prefix + '<span class="cursor">&nbsp;</span>';

    if (charIndex >= full.length) {
      built += (l.kind === 'cmd'
        ? '<span class="' + cls + '">' + l.prompt + '</span>' + l.text.slice(0)
        : '<span class="' + cls + '">' + l.text + '</span>') + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 220);
    } else {
      setTimeout(step, 24 + Math.random() * 30);
    }
  }

  setTimeout(step, 400);
})();
