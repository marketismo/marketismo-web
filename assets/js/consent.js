(function () {
  var KEY = 'mk-consent';
  var banner = document.getElementById('mk-consent');
  var reopen = document.getElementById('mk-consent-reopen');

  function apply(state) {
    var v = state === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      'ad_storage': v,
      'ad_user_data': v,
      'ad_personalization': v,
      'analytics_storage': v
    });
    window.dataLayer.push({ event: 'mk_consent_update', mk_consent_state: v });
  }

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var stored = read();
  if (stored === 'granted' || stored === 'denied') { apply(stored); }
  else { banner.hidden = false; }

  banner.addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-consent]');
    if (!btn) return;
    var state = btn.getAttribute('data-consent');
    save(state);
    apply(state);
    banner.hidden = true;
    if (reopen) reopen.focus();
  });

  if (reopen) {
    reopen.addEventListener('click', function () {
      banner.hidden = false;
      var first = banner.querySelector('[data-consent]');
      if (first) first.focus();
    });
  }
})();
