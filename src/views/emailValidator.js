import { icons } from '../utils/icons.js';
import { copyToClipboard } from '../utils/copy.js';
import { validateEmail } from 'formshield-js';

export function renderEmailValidator() {
  return `
    <div class="view-content tool-view">
      <!-- Tool View Header -->
      <div class="tool-view-header">
        <div class="tool-title-row">
          <div class="tool-icon-badge">${icons.mail}</div>
          <div>
            <h1 class="tool-page-title">Email Validator</h1>
            <p class="tool-page-desc">Syntactic RFC format verification powered by the real <code class="inline-code">validateEmail</code> export</p>
          </div>
        </div>
        <div class="tool-meta-tags">
          <span class="tag-pill">Package Export: validateEmail</span>
          <span class="tag-pill tag-pill-accent">ESM Native</span>
        </div>
      </div>

      <!-- Main Interactive Workbench Grid -->
      <div class="workbench-grid">
        <!-- Left Column: Interactive Inputs & Controls -->
        <div class="workbench-col">
          <div class="card card-interactive">
            <div class="card-header-bar">
              <span class="card-title">Input &amp; Configuration</span>
              <button class="btn btn-sm btn-ghost" id="emailClearBtn" title="Clear input">
                ${icons.x}
                <span>Clear</span>
              </button>
            </div>

            <div class="form-group">
              <label class="form-label" for="emailInput">
                <span>Email Address:</span>
                <span class="char-counter" id="emailCharCount">0 chars</span>
              </label>
              <div class="input-icon-wrap">
                <input
                  type="text"
                  id="emailInput"
                  class="form-input form-input-lg"
                  placeholder="e.g. user@example.com"
                  value="developer@formshield.dev"
                  autocomplete="off"
                  spellcheck="false"
                />
                <span class="input-end-status" id="emailInputStatusIcon"></span>
              </div>
            </div>

            <!-- Options Panel -->
            <div class="options-box">
              <div class="options-title">Configurable Options:</div>
              <label class="checkbox-label">
                <input type="checkbox" id="emailAllowEmpty" class="form-checkbox" />
                <span class="checkbox-custom"></span>
                <div class="checkbox-text">
                  <span class="option-name">allowEmpty</span>
                  <span class="option-desc">Treat empty string as valid instead of generating error (default: false)</span>
                </div>
              </label>
            </div>

            <!-- Presets Section -->
            <div class="presets-section">
              <div class="presets-label">Test with Presets:</div>
              <div class="presets-grid">
                <button class="preset-btn preset-valid" data-email="alex.dev@formshield.io">
                  <span class="preset-dot valid"></span>
                  <span>Standard Valid</span>
                </button>
                <button class="preset-btn preset-valid" data-email="sarah+updates@sub.company.org">
                  <span class="preset-dot valid"></span>
                  <span>Plus Addressing</span>
                </button>
                <button class="preset-btn preset-invalid" data-email="plainaddress">
                  <span class="preset-dot invalid"></span>
                  <span>Missing @</span>
                </button>
                <button class="preset-btn preset-invalid" data-email="user@@domain.com">
                  <span class="preset-dot invalid"></span>
                  <span>Multiple @</span>
                </button>
                <button class="preset-btn preset-invalid" data-email="john..doe@test.com">
                  <span class="preset-dot invalid"></span>
                  <span>Consecutive Dots</span>
                </button>
                <button class="preset-btn preset-invalid" data-email=".leadingdot@test.com">
                  <span class="preset-dot invalid"></span>
                  <span>Leading Dot</span>
                </button>
                <button class="preset-btn preset-invalid" data-email="user@domain">
                  <span class="preset-dot invalid"></span>
                  <span>Missing TLD</span>
                </button>
                <button class="preset-btn preset-invalid" data-email="user@.invaliddomain.com">
                  <span class="preset-dot invalid"></span>
                  <span>Domain Leading Dot</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Code Snippet Box -->
          <div class="card card-code">
            <div class="card-header-bar">
              <div class="code-header-title">
                ${icons.terminal}
                <span>JavaScript Code Snippet</span>
              </div>
              <button class="btn btn-sm btn-ghost" id="emailCopyCodeBtn">
                ${icons.copy}
                <span>Copy</span>
              </button>
            </div>
            <pre class="code-block" id="emailCodeBlock"><code>...</code></pre>
          </div>
        </div>

        <!-- Right Column: Live Validation Results -->
        <div class="workbench-col">
          <!-- Live Status Banner -->
          <div class="status-banner" id="emailStatusBanner">
            <div class="status-banner-icon" id="emailStatusIcon"></div>
            <div class="status-banner-content">
              <div class="status-banner-heading" id="emailStatusHeading">Validating...</div>
              <div class="status-banner-detail" id="emailStatusDetail">...</div>
            </div>
            <div class="status-banner-badge" id="emailStatusBadge"></div>
          </div>

          <!-- Structural Breakdown Card -->
          <div class="card">
            <div class="card-header-bar">
              <span class="card-title">Structural Parsing Breakdown</span>
              <span class="card-subtitle-badge">RFC 5322 Heuristics</span>
            </div>
            <div class="breakdown-grid">
              <div class="breakdown-item">
                <span class="breakdown-label">Username (Local Part)</span>
                <span class="breakdown-value" id="emailLocalPart">-</span>
                <span class="breakdown-note" id="emailLocalNote">Max 64 characters</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Domain Name</span>
                <span class="breakdown-value" id="emailDomainPart">-</span>
                <span class="breakdown-note" id="emailDomainNote">Requires valid extension</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Top-Level Domain (TLD)</span>
                <span class="breakdown-value" id="emailTldPart">-</span>
                <span class="breakdown-note">≥ 2 alphabetic characters</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Total Character Length</span>
                <span class="breakdown-value" id="emailTotalLength">0</span>
                <span class="breakdown-note">Max 254 characters</span>
              </div>
            </div>
          </div>

          <!-- Raw Return JSON Inspector -->
          <div class="card">
            <div class="card-header-bar">
              <div class="json-header-title">
                <span class="pulse-dot"></span>
                <span>Actual Return Value (<code class="inline-code">validateEmail()</code>)</span>
              </div>
              <span class="tag-pill tag-pill-accent">REAL OBJECT</span>
            </div>
            <pre class="json-display" id="emailJsonDisplay"><code class="language-json">...</code></pre>
          </div>

          <!-- Scope and Technical Notes -->
          <div class="info-callout">
            <div class="callout-icon">${icons.info}</div>
            <div class="callout-text">
              <strong>Scope &amp; Architecture:</strong>
              <code>validateEmail()</code> evaluates syntactical structure and standards adherence.
              Per package specification, it does not query live DNS MX records or verify if an external mailbox exists.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initEmailValidator(container) {
  const emailInput = container.querySelector('#emailInput');
  const allowEmptyCheckbox = container.querySelector('#emailAllowEmpty');
  const clearBtn = container.querySelector('#emailClearBtn');
  const charCount = container.querySelector('#emailCharCount');
  const inputStatusIcon = container.querySelector('#emailInputStatusIcon');

  const statusBanner = container.querySelector('#emailStatusBanner');
  const statusIcon = container.querySelector('#emailStatusIcon');
  const statusHeading = container.querySelector('#emailStatusHeading');
  const statusDetail = container.querySelector('#emailStatusDetail');
  const statusBadge = container.querySelector('#emailStatusBadge');

  const localPartEl = container.querySelector('#emailLocalPart');
  const localNoteEl = container.querySelector('#emailLocalNote');
  const domainPartEl = container.querySelector('#emailDomainPart');
  const domainNoteEl = container.querySelector('#emailDomainNote');
  const tldPartEl = container.querySelector('#emailTldPart');
  const totalLengthEl = container.querySelector('#emailTotalLength');

  const jsonDisplay = container.querySelector('#emailJsonDisplay code');
  const codeBlock = container.querySelector('#emailCodeBlock code');
  const copyCodeBtn = container.querySelector('#emailCopyCodeBtn');

  function update() {
    const rawVal = emailInput.value;
    const allowEmpty = allowEmptyCheckbox.checked;

    charCount.textContent = `${rawVal.length} chars`;

    // 1. Call REAL package export
    const result = validateEmail(rawVal, { allowEmpty });

    // 2. Update Live Status Banner
    if (result.isValid) {
      statusBanner.className = 'status-banner status-banner-valid';
      statusIcon.innerHTML = icons.check;
      statusHeading.textContent = 'Valid Email Address';
      statusDetail.textContent = rawVal.trim().length === 0 && allowEmpty
        ? 'Email is empty, but allowed under allowEmpty: true option'
        : 'Meets RFC syntax and domain structural requirements';
      statusBadge.textContent = 'isValid: true';
      statusBadge.className = 'status-banner-badge badge-valid';
      inputStatusIcon.innerHTML = `<span class="icon-valid">${icons.check}</span>`;
    } else {
      statusBanner.className = 'status-banner status-banner-invalid';
      statusIcon.innerHTML = icons.x;
      statusHeading.textContent = 'Invalid Email Address';
      statusDetail.textContent = result.error || 'Failed syntax validation';
      statusBadge.textContent = 'isValid: false';
      statusBadge.className = 'status-banner-badge badge-invalid';
      inputStatusIcon.innerHTML = `<span class="icon-invalid">${icons.x}</span>`;
    }

    // 3. Structural Breakdown
    const trimmed = rawVal.trim();
    totalLengthEl.textContent = `${trimmed.length} / 254`;

    const atParts = trimmed.split('@');
    if (atParts.length === 2) {
      const [local, domain] = atParts;
      localPartEl.textContent = local || '(empty)';
      localNoteEl.textContent = `${local.length} chars (limit: 64)`;

      domainPartEl.textContent = domain || '(empty)';
      const domainLabels = domain.split('.');
      if (domainLabels.length > 1) {
        const tld = domainLabels[domainLabels.length - 1];
        tldPartEl.textContent = `.${tld}`;
        domainNoteEl.textContent = `${domainLabels.length} labels detected`;
      } else {
        tldPartEl.textContent = '(none)';
        domainNoteEl.textContent = 'Missing extension';
      }
    } else if (atParts.length > 2) {
      localPartEl.textContent = atParts[0];
      localNoteEl.textContent = 'Multiple @ detected';
      domainPartEl.textContent = atParts.slice(1).join('@');
      domainNoteEl.textContent = 'Malformed domain segment';
      tldPartEl.textContent = '-';
    } else {
      localPartEl.textContent = trimmed || '(none)';
      localNoteEl.textContent = 'No @ separator';
      domainPartEl.textContent = '(none)';
      domainNoteEl.textContent = '-';
      tldPartEl.textContent = '(none)';
    }

    // 4. Update JSON Display
    jsonDisplay.textContent = JSON.stringify(result, null, 2);

    // 5. Update Code Block
    const codeSnippet = `import { validateEmail } from 'formshield-js';

const result = validateEmail('${escapeJsString(rawVal)}'${allowEmpty ? ', { allowEmpty: true }' : ''});

console.log(result);
// => ${JSON.stringify(result)}`;
    codeBlock.textContent = codeSnippet;
  }

  // Event Listeners
  emailInput.addEventListener('input', update);
  allowEmptyCheckbox.addEventListener('change', update);

  clearBtn.addEventListener('click', () => {
    emailInput.value = '';
    emailInput.focus();
    update();
  });

  container.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email');
      emailInput.value = email;
      update();
    });
  });

  copyCodeBtn.addEventListener('click', () => {
    copyToClipboard(codeBlock.textContent, copyCodeBtn, 'Email code snippet copied!');
  });

  // Initial update
  update();
}

function escapeJsString(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
