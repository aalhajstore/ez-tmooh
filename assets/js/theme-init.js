(function () {
  try {
    const savedTheme = localStorage.getItem('azm-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = savedTheme || (systemDark ? 'dark' : 'light');
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
  }
})();
