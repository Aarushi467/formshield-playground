import { icons } from '../utils/icons.js';

export function renderHeader(activeViewTitle = 'Overview') {
  return `
    <header class="app-header">
      <div class="header-left">
        <button class="mobile-toggle-btn" id="mobileToggleBtn" aria-label="Toggle navigation">
          ${icons.menu}
        </button>
        <div class="header-breadcrumb">
          <span class="crumb-root">FormShield</span>
          <span class="crumb-separator">/</span>
          <span class="crumb-current" id="headerTitle">${activeViewTitle}</span>
        </div>
      </div>

      <div class="header-right">
        <div class="header-install-pill">
          <span class="install-prompt">$</span>
          <code class="install-cmd">npm i formshield-js</code>
          <button class="header-copy-btn" id="headerCopyInstall" title="Copy installation command" aria-label="Copy install command">
            ${icons.copy}
          </button>
        </div>

        <div class="header-divider"></div>

        <div class="header-links">
          <a href="https://www.npmjs.com/package/formshield-js" target="_blank" rel="noopener noreferrer" class="header-btn" title="View on npm">
            ${icons.npm}
            <span class="btn-text">npm</span>
          </a>
          <a href="https://github.com/aarushisingh/formshield-js" target="_blank" rel="noopener noreferrer" class="header-btn" title="View source on GitHub">
            ${icons.github}
            <span class="btn-text">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  `;
}
