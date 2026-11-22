import { icons } from '../utils/icons.js';
import { copyToClipboard } from '../utils/copy.js';
import {
  validateEmail,
  checkPasswordStrength,
  validatePhone,
  sanitizeInput,
  validateForm
} from 'formshield-js';

export function renderOverview() {
  return `
    <div class="view-content overview-view">
      <!-- Hero Section -->
      <section class="overview-hero">
        <div class="hero-bg-glow"></div>
        <div class="hero-badge-wrap">
          <span class="hero-badge">
            <span class="badge-sparkle">${icons.sparkles}</span>
            <span>formshield-js@1.0.0</span>
            <span class="badge-divider">•</span>
            <span class="badge-highlight">Zero Dependencies</span>
          </span>
        </div>

        <h1 class="hero-title">
          Modern Form Validation &amp; Sanitization
        </h1>

        <p class="hero-subtitle">
          Lightweight, predictable, and defense-in-depth JavaScript toolkit for modern browsers and Node.js.
          Interact directly with the real installed <code class="inline-code">formshield-js</code> package below.
        </p>

        <div class="hero-install-box">
          <div class="install-code-group">
            <span class="install-prompt-symbol">$</span>
            <span class="install-text">npm install formshield-js</span>
          </div>
          <button class="btn btn-primary" id="overviewCopyInstallBtn">
            ${icons.copy}
            <span>Copy Command</span>
          </button>
        </div>

        <div class="hero-metrics-grid">
          <div class="metric-card">
            <div class="metric-num">0</div>
            <div class="metric-label">Runtime Dependencies</div>
            <div class="metric-desc">Pure JavaScript with zero transitive supply chain vulnerabilities</div>
          </div>
          <div class="metric-card">
            <div class="metric-num">5</div>
            <div class="metric-label">Specialized Modules</div>
            <div class="metric-desc">Email, password strength, phone, HTML sanitizer &amp; schema validator</div>
          </div>
          <div class="metric-card">
            <div class="metric-num">&lt; 3 KB</div>
            <div class="metric-label">Lightweight ESM</div>
            <div class="metric-desc">Tree-shakeable ES modules ready for Vite, Next.js, and Node.js</div>
          </div>
          <div class="metric-card">
            <div class="metric-num">100%</div>
            <div class="metric-label">Defensive Handling</div>
            <div class="metric-desc">Graceful fallback on null, undefined, or malformed data types</div>
          </div>
        </div>
      </section>

      <!-- Interactive Tools Directory -->
      <section class="overview-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Interactive Tool Suite</h2>
            <p class="section-subtitle">Select any module to inspect live behavior, tweak parameters, and view code examples</p>
          </div>
        </div>

        <div class="tools-grid">
          <div class="tool-card" data-goto="email">
            <div class="tool-card-header">
              <div class="tool-icon-wrap">${icons.mail}</div>
              <span class="tool-tag">RFC &amp; Syntax</span>
            </div>
            <h3 class="tool-title">Email Validator</h3>
            <p class="tool-desc">Syntactic structural verification checking local part length, consecutive dots, domain extensions, and RFC rules.</p>
            <div class="tool-signature">
              <code>validateEmail(email, options)</code>
            </div>
            <div class="tool-card-footer">
              <button class="btn btn-ghost" data-goto="email">
                <span>Open Validator</span>
                ${icons.arrowRight}
              </button>
            </div>
          </div>

          <div class="tool-card" data-goto="password">
            <div class="tool-card-header">
              <div class="tool-icon-wrap">${icons.key}</div>
              <span class="tool-tag">Heuristic Scorer</span>
            </div>
            <h3 class="tool-title">Password Strength</h3>
            <p class="tool-desc">Evaluates character classes, length thresholds, consecutive repeating runs, and common password pattern penalties.</p>
            <div class="tool-signature">
              <code>checkPasswordStrength(pwd, opts)</code>
            </div>
            <div class="tool-card-footer">
              <button class="btn btn-ghost" data-goto="password">
                <span>Open Evaluator</span>
                ${icons.arrowRight}
              </button>
            </div>
          </div>

          <div class="tool-card" data-goto="phone">
            <div class="tool-card-header">
              <div class="tool-icon-wrap">${icons.phone}</div>
              <span class="tool-tag">IN • US • E.164</span>
            </div>
            <h3 class="tool-title">Phone Validator</h3>
            <p class="tool-desc">Regional validation for Indian mobile numbers (starts with 6–9), US NANP format, and International E.164 standard.</p>
            <div class="tool-signature">
              <code>validatePhone(phone, options)</code>
            </div>
            <div class="tool-card-footer">
              <button class="btn btn-ghost" data-goto="phone">
                <span>Open Validator</span>
                ${icons.arrowRight}
              </button>
            </div>
          </div>

          <div class="tool-card" data-goto="sanitizer">
            <div class="tool-card-header">
              <div class="tool-icon-wrap">${icons.sanitize}</div>
              <span class="tool-tag">XSS Defense</span>
            </div>
            <h3 class="tool-title">Input Sanitizer</h3>
            <p class="tool-desc">Converts dangerous HTML control characters (&amp;, &lt;, &gt;, &quot;, &#39;, &#x2F;) into safe HTML entity equivalents.</p>
            <div class="tool-signature">
              <code>sanitizeInput(rawString)</code>
            </div>
            <div class="tool-card-footer">
              <button class="btn btn-ghost" data-goto="sanitizer">
                <span>Open Sanitizer</span>
                ${icons.arrowRight}
              </button>
            </div>
          </div>

          <div class="tool-card tool-card-featured" data-goto="form">
            <div class="tool-card-header">
              <div class="tool-icon-wrap">${icons.form}</div>
              <span class="tool-tag">Declarative Schema</span>
            </div>
            <h3 class="tool-title">Form Validation Engine</h3>
            <p class="tool-desc">Validates entire multi-field form objects against declarative rules with required checks, password minimum levels, and custom validators.</p>
            <div class="tool-signature">
              <code>validateForm(formData, schema)</code>
            </div>
            <div class="tool-card-footer">
              <button class="btn btn-ghost" data-goto="form">
                <span>Launch Form Demo</span>
                ${icons.arrowRight}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Interactive Scratchpad Section -->
      <section class="overview-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Instant Live Scratchpad</h2>
            <p class="section-subtitle">Direct execution of real functions imported from <code>formshield-js</code></p>
          </div>
        </div>

        <div class="scratchpad-card">
          <div class="scratchpad-controls">
            <label class="control-label">Select Function:</label>
            <div class="segmented-control" id="scratchpadFnSelector">
              <button class="segment-btn active" data-fn="email">validateEmail</button>
              <button class="segment-btn" data-fn="password">checkPasswordStrength</button>
              <button class="segment-btn" data-fn="phone">validatePhone</button>
              <button class="segment-btn" data-fn="sanitize">sanitizeInput</button>
            </div>
          </div>

          <div class="scratchpad-body">
            <div class="scratchpad-input-col">
              <label class="input-label" id="scratchpadInputLabel" for="scratchpadInput">Input Value:</label>
              <div class="input-wrapper">
                <input type="text" id="scratchpadInput" class="form-input" value="developer@formshield.dev" placeholder="Enter input value..." />
              </div>
              <div class="scratchpad-hints" id="scratchpadHints">
                <span class="hint-title">Quick presets:</span>
                <button class="preset-chip" data-val="developer@formshield.dev">Valid Email</button>
                <button class="preset-chip" data-val="invalid-email-address">Invalid Email</button>
                <button class="preset-chip" data-val="user..dots@test.com">Consecutive Dots</button>
              </div>
            </div>

            <div class="scratchpad-output-col">
              <div class="output-header">
                <span class="output-title">Live Execution Output:</span>
                <span class="real-badge">REAL PACKAGE OUTPUT</span>
              </div>
              <pre class="json-display" id="scratchpadOutput"><code class="language-json">...</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Package & Integration Specs -->
      <section class="overview-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Package Information &amp; Setup</h2>
            <p class="section-subtitle">Detailed metadata and quick import references</p>
          </div>
        </div>

        <div class="package-info-grid">
          <div class="info-details-card">
            <h3 class="card-title">Package Metadata</h3>
            <ul class="meta-list">
              <li class="meta-item">
                <span class="meta-label">Package Name</span>
                <span class="meta-value"><code>formshield-js</code></span>
              </li>
              <li class="meta-item">
                <span class="meta-label">Installed Version</span>
                <span class="meta-value badge-pill">1.0.0</span>
              </li>
              <li class="meta-item">
                <span class="meta-label">Runtime Dependencies</span>
                <span class="meta-value"><span class="badge-success">0 (Zero)</span></span>
              </li>
              <li class="meta-item">
                <span class="meta-label">Module Format</span>
                <span class="meta-value">ECMAScript Modules (ESM)</span>
              </li>
              <li class="meta-item">
                <span class="meta-label">Author</span>
                <span class="meta-value">Aarushi Singh</span>
              </li>
              <li class="meta-item">
                <span class="meta-label">License</span>
                <span class="meta-value">MIT</span>
              </li>
              <li class="meta-item">
                <span class="meta-label">Engine Requirement</span>
                <span class="meta-value">Node.js &gt;= 18.0.0 / Modern Browsers</span>
              </li>
            </ul>

            <div class="external-cta-group">
              <a href="https://www.npmjs.com/package/formshield-js" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                ${icons.npm}
                <span>View on npm Registry</span>
                ${icons.externalLink}
              </a>
              <a href="https://github.com/aarushisingh/formshield-js" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                ${icons.github}
                <span>View GitHub Repository</span>
                ${icons.externalLink}
              </a>
            </div>
          </div>

          <div class="code-integration-card">
            <div class="card-header-bar">
              <span class="card-title">Quick Import Usage</span>
              <button class="btn btn-sm btn-ghost" id="overviewCopyUsageBtn">
                ${icons.copy}
                <span>Copy</span>
              </button>
            </div>
            <pre class="code-block"><code>// 1. Install via npm
npm install formshield-js

// 2. Import named functions
import {
  validateEmail,
  checkPasswordStrength,
  validatePhone,
  sanitizeInput,
  validateForm
} from 'formshield-js';

// Or import default FormShield namespace
import FormShield from 'formshield-js';</code></pre>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function initOverview(container, navigateTo) {
  // Copy buttons
  const copyInstallBtn = container.querySelector('#overviewCopyInstallBtn');
  if (copyInstallBtn) {
    copyInstallBtn.addEventListener('click', () => {
      copyToClipboard('npm install formshield-js', copyInstallBtn, 'Installation command copied!');
    });
  }

  const copyUsageBtn = container.querySelector('#overviewCopyUsageBtn');
  if (copyUsageBtn) {
    copyUsageBtn.addEventListener('click', () => {
      const usageSnippet = `import {
  validateEmail,
  checkPasswordStrength,
  validatePhone,
  sanitizeInput,
  validateForm
} from 'formshield-js';`;
      copyToClipboard(usageSnippet, copyUsageBtn, 'Import snippet copied!');
    });
  }

  // Tool card click handlers
  container.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-goto');
      if (target && navigateTo) {
        navigateTo(target);
      }
    });
  });

  // Scratchpad logic
  initScratchpad(container);
}

function initScratchpad(container) {
  let activeFn = 'email';
  const selector = container.querySelector('#scratchpadFnSelector');
  const inputEl = container.querySelector('#scratchpadInput');
  const outputEl = container.querySelector('#scratchpadOutput code');
  const labelEl = container.querySelector('#scratchpadInputLabel');
  const hintsContainer = container.querySelector('#scratchpadHints');

  const configs = {
    email: {
      label: 'Email Address:',
      defaultVal: 'developer@formshield.dev',
      presets: [
        { label: 'Valid Email', val: 'developer@formshield.dev' },
        { label: 'Missing @', val: 'invalid-email-address.com' },
        { label: 'Consecutive Dots', val: 'user..name@domain.com' },
        { label: 'Subdomain Email', val: 'contact@sub.company.org' }
      ],
      run: (val) => validateEmail(val)
    },
    password: {
      label: 'Password String:',
      defaultVal: 'Shield#Pass2026',
      presets: [
        { label: 'Strong Pass', val: 'Shield#Pass2026' },
        { label: 'Common Weak', val: 'password123' },
        { label: 'Repeating Chars', val: 'aaaaabbbbb!' },
        { label: 'Very Strong', val: 'correct-horse-battery-staple-99#' }
      ],
      run: (val) => checkPasswordStrength(val)
    },
    phone: {
      label: 'Phone Number:',
      defaultVal: '+91 98765 43210',
      presets: [
        { label: 'India (+91)', val: '+91 98765 43210' },
        { label: 'US Phone', val: '(555) 234-5678' },
        { label: 'E.164 Int’l', val: '+447911123456' },
        { label: 'Invalid Format', val: '123-abc-789' }
      ],
      run: (val) => validatePhone(val)
    },
    sanitize: {
      label: 'Unsafe HTML String:',
      defaultVal: '<script>alert("XSS")</script>',
      presets: [
        { label: 'Script Injection', val: '<script>alert("XSS")</script>' },
        { label: 'Image Onerror', val: '<img src="x" onerror="evil()">' },
        { label: 'Special Chars', val: 'Tom & Jerry "Movie" / 5\'8"' },
        { label: 'Safe Text', val: 'Just standard clean user input' }
      ],
      run: (val) => sanitizeInput(val)
    }
  };

  function updateScratchpadUI() {
    const cfg = configs[activeFn];
    labelEl.textContent = cfg.label;
    inputEl.value = cfg.defaultVal;
    
    // Update presets
    hintsContainer.innerHTML = `
      <span class="hint-title">Quick presets:</span>
      ${cfg.presets.map(p => `
        <button class="preset-chip" data-val="${escapeHtml(p.val)}">${p.label}</button>
      `).join('')}
    `;

    hintsContainer.querySelectorAll('.preset-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        inputEl.value = btn.getAttribute('data-val');
        runExecution();
      });
    });

    runExecution();
  }

  function runExecution() {
    const cfg = configs[activeFn];
    const val = inputEl.value;
    try {
      const res = cfg.run(val);
      outputEl.textContent = JSON.stringify(res, null, 2);
    } catch (err) {
      outputEl.textContent = `Error: ${err.message}`;
    }
  }

  selector.querySelectorAll('.segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selector.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFn = btn.getAttribute('data-fn');
      updateScratchpadUI();
    });
  });

  inputEl.addEventListener('input', runExecution);

  updateScratchpadUI();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
