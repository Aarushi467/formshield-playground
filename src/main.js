import './style.css';
import { renderSidebar, navItems } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { copyToClipboard } from './utils/copy.js';

import { renderOverview, initOverview } from './views/overview.js';
import { renderEmailValidator, initEmailValidator } from './views/emailValidator.js';
import { renderPasswordStrength, initPasswordStrength } from './views/passwordStrength.js';
import { renderPhoneValidator, initPhoneValidator } from './views/phoneValidator.js';
import { renderInputSanitizer, initInputSanitizer } from './views/inputSanitizer.js';
import { renderFormValidation, initFormValidation } from './views/formValidation.js';

const routes = {
  overview: {
    title: 'Overview & Quick Start',
    render: renderOverview,
    init: (container) => initOverview(container, navigateTo)
  },
  email: {
    title: 'Email Validator',
    render: renderEmailValidator,
    init: initEmailValidator
  },
  password: {
    title: 'Password Strength',
    render: renderPasswordStrength,
    init: initPasswordStrength
  },
  phone: {
    title: 'Phone Validator',
    render: renderPhoneValidator,
    init: initPhoneValidator
  },
  sanitizer: {
    title: 'Input Sanitizer',
    render: renderInputSanitizer,
    init: initInputSanitizer
  },
  form: {
    title: 'Form Validation Engine',
    render: renderFormValidation,
    init: initFormValidation
  }
};

let currentRoute = 'overview';

function getRouteFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  return routes[hash] ? hash : 'overview';
}

function navigateTo(routeId) {
  if (routes[routeId]) {
    window.location.hash = routeId;
  }
}

function renderApp() {
  const appEl = document.querySelector('#app');
  appEl.innerHTML = `
    <div class="app-layout">
      ${renderSidebar(currentRoute)}
      <div class="app-main-wrap">
        ${renderHeader(routes[currentRoute].title)}
        <main class="app-main-content" id="mainContent">
          ${routes[currentRoute].render()}
        </main>
      </div>
    </div>
  `;

  attachGlobalListeners();
  routes[currentRoute].init(document.querySelector('#mainContent'));
}

function updateViewOnly() {
  const mainContent = document.querySelector('#mainContent');
  const headerTitle = document.querySelector('#headerTitle');

  if (mainContent && routes[currentRoute]) {
    document.title = `FormShield Playground — ${routes[currentRoute].title}`;
    if (headerTitle) {
      headerTitle.textContent = routes[currentRoute].title;
    }

    // Update active nav link styling
    document.querySelectorAll('.nav-link').forEach(link => {
      const navId = link.getAttribute('data-nav-id');
      if (navId === currentRoute) {
        link.classList.add('active');
        if (!link.querySelector('.active-indicator')) {
          link.insertAdjacentHTML('beforeend', '<span class="active-indicator"></span>');
        }
      } else {
        link.classList.remove('active');
        const ind = link.querySelector('.active-indicator');
        if (ind) ind.remove();
      }
    });

    // Render new view markup
    mainContent.innerHTML = routes[currentRoute].render();
    routes[currentRoute].init(mainContent);

    // Scroll to top of main content
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function attachGlobalListeners() {
  const sidebar = document.querySelector('#appSidebar');
  const backdrop = document.querySelector('#sidebarBackdrop');
  const mobileToggle = document.querySelector('#mobileToggleBtn');
  const mobileClose = document.querySelector('#mobileCloseBtn');
  const headerCopyBtn = document.querySelector('#headerCopyInstall');

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('visible');
    document.body.classList.add('no-scroll');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('visible');
    document.body.classList.remove('no-scroll');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openSidebar);
  if (mobileClose) mobileClose.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // Close sidebar on navigation click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 960) {
        closeSidebar();
      }
    });
  });

  // Header quick install copy
  if (headerCopyBtn) {
    headerCopyBtn.addEventListener('click', () => {
      copyToClipboard('npm i formshield-js', headerCopyBtn, 'Install command copied!');
    });
  }

  // Keyboard navigation shortcuts
  window.addEventListener('keydown', (e) => {
    // Only if not focused on an input or textarea
    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key >= '1' && e.key <= '6') {
      const keys = ['overview', 'email', 'password', 'phone', 'sanitizer', 'form'];
      const targetRoute = keys[parseInt(e.key, 10) - 1];
      if (targetRoute) {
        navigateTo(targetRoute);
      }
    } else if (e.key === 'Escape') {
      closeSidebar();
    }
  });
}

// Hash change router
window.addEventListener('hashchange', () => {
  const newRoute = getRouteFromHash();
  if (newRoute !== currentRoute) {
    currentRoute = newRoute;
    updateViewOnly();
  }
});

// App Initialization
currentRoute = getRouteFromHash();
document.title = `FormShield Playground — ${routes[currentRoute].title}`;
renderApp();
