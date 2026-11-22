import { icons } from '../utils/icons.js';

export const navItems = [
  { id: 'overview', label: 'Overview', icon: icons.overview, desc: 'Intro & Quick Start' },
  { id: 'email', label: 'Email Validator', icon: icons.mail, desc: 'validateEmail()' },
  { id: 'password', label: 'Password Strength', icon: icons.key, desc: 'checkPasswordStrength()' },
  { id: 'phone', label: 'Phone Validator', icon: icons.phone, desc: 'validatePhone()' },
  { id: 'sanitizer', label: 'Input Sanitizer', icon: icons.sanitize, desc: 'sanitizeInput()' },
  { id: 'form', label: 'Form Validation', icon: icons.form, desc: 'validateForm()' },
];

export function renderSidebar(activeId = 'overview') {
  return `
    <aside class="app-sidebar" id="appSidebar">
      <div class="sidebar-header">
        <div class="brand">
          <div class="brand-shield-glow"></div>
          <div class="brand-shield">
            ${icons.shield}
          </div>
          <div class="brand-text">
            <span class="brand-name">FormShield</span>
            <span class="brand-tag">PLAYGROUND</span>
          </div>
        </div>
        <button class="mobile-close-btn" id="mobileCloseBtn" aria-label="Close Navigation">
          ${icons.x}
        </button>
      </div>

      <div class="sidebar-version-badge">
        <span class="pulse-dot"></span>
        <span class="pkg-name">formshield-js</span>
        <span class="pkg-version">v1.0.0</span>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-title">NAVIGATION & TOOLS</div>
        <ul class="nav-list">
          ${navItems.map(item => `
            <li class="nav-item">
              <a href="#${item.id}" class="nav-link ${item.id === activeId ? 'active' : ''}" data-nav-id="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <div class="nav-text">
                  <span class="nav-label">${item.label}</span>
                  <span class="nav-desc">${item.desc}</span>
                </div>
                ${item.id === activeId ? '<span class="active-indicator"></span>' : ''}
              </a>
            </li>
          `).join('')}
        </ul>
      </nav>

      <div class="sidebar-footer">
        <div class="footer-badge">
          <span class="zero-dep-icon">${icons.zap}</span>
          <span>Zero runtime dependencies</span>
        </div>
        <div class="footer-links">
          <a href="https://www.npmjs.com/package/formshield-js" target="_blank" rel="noopener noreferrer" class="footer-link">
            ${icons.npm}
            <span>npm</span>
            ${icons.externalLink}
          </a>
          <a href="https://github.com/aarushisingh/formshield-js" target="_blank" rel="noopener noreferrer" class="footer-link">
            ${icons.github}
            <span>GitHub</span>
            ${icons.externalLink}
          </a>
        </div>
      </div>
    </aside>
    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>
  `;
}
