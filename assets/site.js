const menu = document.querySelector('.menu');
const navigation = document.querySelector('#site-nav');
const compact = matchMedia('(max-width: 920px)');

function showNavigation(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.hidden = !open && compact.matches;
}

function updateNavigation() {
  if (!compact.matches && document.activeElement === menu) {
    navigation.hidden = false;
    navigation.querySelector('a[aria-current]')?.focus();
  }
  menu.hidden = !compact.matches;
  if (compact.matches && navigation.contains(document.activeElement)) {
    menu.focus();
  }
  showNavigation(false);
}

menu.addEventListener('click', () => showNavigation(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    showNavigation(false);
    menu.focus();
  }
});
compact.addEventListener('change', updateNavigation);
updateNavigation();
