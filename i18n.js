(function () {
  var STORAGE_KEY = 'site-lang';

  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'es';
  }

  function apply(lang) {
    var dict = window.I18N && window.I18N[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key in dict) el.innerHTML = dict[key];
    });

    if (dict.__title) document.title = dict.__title;
    if (dict.__description) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', dict.__description);
    }

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(currentLang());
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.getAttribute('data-lang'));
      });
    });
  });
})();
