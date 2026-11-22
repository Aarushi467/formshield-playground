import { icons } from '../utils/icons.js';
import { copyToClipboard } from '../utils/copy.js';
import { validatePhone } from 'formshield-js';

export function renderPhoneValidator() {
  return `
    <div class="view-content tool-view">
      <!-- Tool View Header -->
      <div class="tool-view-header">
        <div class="tool-title-row">
          <div class="tool-icon-badge">${icons.phone}</div>
          <div>
            <h1 class="tool-page-title">Phone Number Validator</h1>
            <p class="tool-page-desc">Regional &amp; international format verification with E.164 normalization via <code class="inline-code">validatePhone</code></p>
          </div>
        </div>
        <div class="tool-meta-tags">
          <span class="tag-pill">Package Export: validatePhone</span>
          <span class="tag-pill tag-pill-accent">E.164 Normalization</span>
        </div>
      </div>

      <!-- Main Workbench Grid -->
      <div class="workbench-grid">
        <!-- Left Column: Input and Config -->
        <div class="workbench-col">
          <div class="card card-interactive">
            <div class="card-header-bar">
              <span class="card-title">Phone Input &amp; Target Region</span>
              <button class="btn btn-sm btn-ghost" id="phoneClearBtn" title="Clear input">
                ${icons.x}
                <span>Clear</span>
              </button>
            </div>

            <!-- Target Region Picker -->
            <div class="form-group">
              <label class="form-label">Select Country Format:</label>
              <div class="segmented-control" id="phoneCountryPicker">
                <button class="segment-btn active" data-country="IN">
                  <span class="region-flag">🇮🇳</span>
                  <span>IN (India)</span>
                </button>
                <button class="segment-btn" data-country="US">
                  <span class="region-flag">🇺🇸</span>
                  <span>US (North America)</span>
                </button>
                <button class="segment-btn" data-country="E164">
                  <span class="region-flag">🌐</span>
                  <span>E.164 (Global)</span>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="phoneInput">
                <span>Phone Number:</span>
                <span class="char-counter" id="phoneCharCount">0 chars</span>
              </label>
              <div class="input-icon-wrap">
                <input
                  type="text"
                  id="phoneInput"
                  class="form-input form-input-lg"
                  placeholder="Enter phone number..."
                  value="+91 98765-43210"
                  autocomplete="off"
                  spellcheck="false"
                />
                <span class="input-end-status" id="phoneInputStatusIcon"></span>
              </div>
            </div>

            <!-- Options Panel -->
            <div class="options-box">
              <div class="options-title">Configurable Options:</div>
              <label class="checkbox-label">
                <input type="checkbox" id="phoneStrictToggle" class="form-checkbox" />
                <span class="checkbox-custom"></span>
                <div class="checkbox-text">
                  <span class="option-name">strict</span>
                  <span class="option-desc">Strict mode: rejects formatting delimiters (spaces, dashes, parens). Only allows digits and optional leading +.</span>
                </div>
              </label>
            </div>

            <!-- Presets Section -->
            <div class="presets-section">
              <div class="presets-label">Regional Presets:</div>
              <div class="presets-grid" id="phonePresetsGrid">
                <!-- Populated dynamically based on selected country -->
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
              <button class="btn btn-sm btn-ghost" id="phoneCopyCodeBtn">
                ${icons.copy}
                <span>Copy</span>
              </button>
            </div>
            <pre class="code-block" id="phoneCodeBlock"><code>...</code></pre>
          </div>
        </div>

        <!-- Right Column: Results & Normalization -->
        <div class="workbench-col">
          <!-- Status Banner -->
          <div class="status-banner" id="phoneStatusBanner">
            <div class="status-banner-icon" id="phoneStatusIcon"></div>
            <div class="status-banner-content">
              <div class="status-banner-heading" id="phoneStatusHeading">Validating...</div>
              <div class="status-banner-detail" id="phoneStatusDetail">...</div>
            </div>
            <div class="status-banner-badge" id="phoneStatusBadge"></div>
          </div>

          <!-- Cleaned / Normalized E.164 Output Card -->
          <div class="card card-highlight">
            <div class="card-header-bar">
              <span class="card-title">Normalized E.164 Representation</span>
              <button class="btn btn-sm btn-secondary" id="phoneCopyCleanedBtn" title="Copy normalized phone">
                ${icons.copy}
                <span>Copy Normalized</span>
              </button>
            </div>
            <div class="cleaned-display-box">
              <span class="cleaned-label">cleaned:</span>
              <code class="cleaned-value" id="phoneCleanedValue">+919876543210</code>
            </div>
            <p class="cleaned-help" id="phoneCleanedHelp">
              Standardized canonical telephone string formatted for database storage and SMS API gateways.
            </p>
          </div>

          <!-- Region Specifications Guide -->
          <div class="card">
            <div class="card-header-bar">
              <span class="card-title">Active Region Rules</span>
              <span class="card-subtitle-badge" id="phoneActiveRegionBadge">Region: IN</span>
            </div>
            <div class="region-rules-content" id="phoneRegionRulesContent">
              <!-- Populated dynamically -->
            </div>
          </div>

          <!-- Raw Return JSON Inspector -->
          <div class="card">
            <div class="card-header-bar">
              <div class="json-header-title">
                <span class="pulse-dot"></span>
                <span>Actual Return Value (<code class="inline-code">validatePhone()</code>)</span>
              </div>
              <span class="tag-pill tag-pill-accent">REAL OBJECT</span>
            </div>
            <pre class="json-display" id="phoneJsonDisplay"><code class="language-json">...</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initPhoneValidator(container) {
  const phoneInput = container.querySelector('#phoneInput');
  const countryPicker = container.querySelector('#phoneCountryPicker');
  const strictToggle = container.querySelector('#phoneStrictToggle');
  const clearBtn = container.querySelector('#phoneClearBtn');
  const charCount = container.querySelector('#phoneCharCount');
  const inputStatusIcon = container.querySelector('#phoneInputStatusIcon');

  const statusBanner = container.querySelector('#phoneStatusBanner');
  const statusIcon = container.querySelector('#phoneStatusIcon');
  const statusHeading = container.querySelector('#phoneStatusHeading');
  const statusDetail = container.querySelector('#phoneStatusDetail');
  const statusBadge = container.querySelector('#phoneStatusBadge');

  const cleanedValue = container.querySelector('#phoneCleanedValue');
  const cleanedHelp = container.querySelector('#phoneCleanedHelp');
  const copyCleanedBtn = container.querySelector('#phoneCopyCleanedBtn');

  const activeRegionBadge = container.querySelector('#phoneActiveRegionBadge');
  const regionRulesContent = container.querySelector('#phoneRegionRulesContent');
  const presetsGrid = container.querySelector('#phonePresetsGrid');

  const jsonDisplay = container.querySelector('#phoneJsonDisplay code');
  const codeBlock = container.querySelector('#phoneCodeBlock code');
  const copyCodeBtn = container.querySelector('#phoneCopyCodeBtn');

  let activeCountry = 'IN';

  const regionConfigs = {
    IN: {
      name: 'India (+91)',
      flag: '🇮🇳',
      defaultVal: '+91 98765-43210',
      rules: [
        'Must contain 10 national digits (excluding leading 0 or 91/+91 prefix).',
        'First digit of the 10-digit mobile number must be between 6 and 9 (inclusive).',
        'Accepts prefixes: None (10 digits), 0 (11 digits), 91 or +91 (12 digits).',
        'Normalizes canonical output to E.164 format (+91XXXXXXXXXX).'
      ],
      presets: [
        { label: '+91 98765-43210', val: '+91 98765-43210', type: 'valid' },
        { label: '09876543210', val: '09876543210', type: 'valid' },
        { label: '9876543210 (10 digits)', val: '9876543210', type: 'valid' },
        { label: '+91 55555 12345 (Invalid prefix)', val: '+91 55555 12345', type: 'invalid' },
        { label: '+91 98765 (Incomplete)', val: '+91 98765', type: 'invalid' }
      ]
    },
    US: {
      name: 'North America / US (+1)',
      flag: '🇺🇸',
      defaultVal: '(555) 234-5678',
      rules: [
        '10-digit North American Numbering Plan (NANP) structure.',
        'Area code (first 3 digits) must start with digits 2–9.',
        'Exchange code (middle 3 digits) must start with digits 2–9.',
        'Optional +1 or 1 country prefix accepted. Normalizes to +1XXXXXXXXXX.'
      ],
      presets: [
        { label: '(555) 234-5678', val: '(555) 234-5678', type: 'valid' },
        { label: '+1 202-555-0143', val: '+1 202-555-0143', type: 'valid' },
        { label: '2025550143 (Plain)', val: '2025550143', type: 'valid' },
        { label: '(123) 456-7890 (Area code starts with 1)', val: '(123) 456-7890', type: 'invalid' },
        { label: '555-1234 (7 digits)', val: '555-1234', type: 'invalid' }
      ]
    },
    E164: {
      name: 'International E.164',
      flag: '🌐',
      defaultVal: '+44 7911 123456',
      rules: [
        'International telecommunication format recommended by ITU-T.',
        'Must begin with a leading + symbol followed by country calling code.',
        'Total digit count must be between 7 and 15 digits.',
        'Normalizes canonical output with spaces and symbols stripped.'
      ],
      presets: [
        { label: '+44 7911 123456 (UK)', val: '+44 7911 123456', type: 'valid' },
        { label: '+81 3 1234 5678 (Japan)', val: '+81 3 1234 5678', type: 'valid' },
        { label: '+33 1 23 45 67 89 (France)', val: '+33 1 23 45 67 89', type: 'valid' },
        { label: '447911123456 (Missing +)', val: '447911123456', type: 'invalid' },
        { label: '+12345 (Too short)', val: '+12345', type: 'invalid' }
      ]
    }
  };

  function updateRegionUI() {
    const cfg = regionConfigs[activeCountry];
    activeRegionBadge.textContent = `Region: ${activeCountry}`;

    regionRulesContent.innerHTML = `
      <ul class="rules-list">
        ${cfg.rules.map(r => `<li>${r}</li>`).join('')}
      </ul>
    `;

    presetsGrid.innerHTML = cfg.presets.map(p => `
      <button class="preset-btn ${p.type === 'valid' ? 'preset-valid' : 'preset-invalid'}" data-phone="${escapeHtml(p.val)}">
        <span class="preset-dot ${p.type}"></span>
        <span>${escapeHtml(p.label)}</span>
      </button>
    `).join('');

    presetsGrid.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        phoneInput.value = btn.getAttribute('data-phone');
        update();
      });
    });
  }

  function update() {
    const rawVal = phoneInput.value;
    const strict = strictToggle.checked;

    charCount.textContent = `${rawVal.length} chars`;

    // 1. Invoke REAL package function
    const result = validatePhone(rawVal, {
      country: activeCountry,
      strict
    });

    // 2. Update Status Banner
    if (result.isValid) {
      statusBanner.className = 'status-banner status-banner-valid';
      statusIcon.innerHTML = icons.check;
      statusHeading.textContent = `Valid Phone Number (${result.country})`;
      statusDetail.textContent = `Correctly matches ${activeCountry} regional format and length rules`;
      statusBadge.textContent = 'isValid: true';
      statusBadge.className = 'status-banner-badge badge-valid';
      inputStatusIcon.innerHTML = `<span class="icon-valid">${icons.check}</span>`;

      cleanedValue.textContent = result.cleaned || '(none)';
      cleanedValue.className = 'cleaned-value cleaned-active';
      cleanedHelp.textContent = `Canonical E.164 output normalized to ${result.cleaned}`;
      copyCleanedBtn.disabled = false;
    } else {
      statusBanner.className = 'status-banner status-banner-invalid';
      statusIcon.innerHTML = icons.x;
      statusHeading.textContent = `Invalid Phone Number (${result.country})`;
      statusDetail.textContent = result.error || 'Failed regional structure check';
      statusBadge.textContent = 'isValid: false';
      statusBadge.className = 'status-banner-badge badge-invalid';
      inputStatusIcon.innerHTML = `<span class="icon-invalid">${icons.x}</span>`;

      cleanedValue.textContent = '(invalid)';
      cleanedValue.className = 'cleaned-value cleaned-disabled';
      cleanedHelp.textContent = 'Cleaned E.164 string is only generated when input validation succeeds.';
      copyCleanedBtn.disabled = true;
    }

    // 3. Update Raw JSON
    jsonDisplay.textContent = JSON.stringify(result, null, 2);

    // 4. Update Code Snippet
    const codeSnippet = `import { validatePhone } from 'formshield-js';

const result = validatePhone('${escapeJsString(rawVal)}', {
  country: '${activeCountry}'${strict ? ',\n  strict: true' : ''}
});

console.log(result.isValid); // => ${result.isValid}
console.log(result.cleaned); // => "${result.cleaned}"
console.log(result.error);   // => ${result.error ? `"${result.error}"` : 'null'}`;
    codeBlock.textContent = codeSnippet;
  }

  // Event Listeners
  phoneInput.addEventListener('input', update);
  strictToggle.addEventListener('change', update);

  countryPicker.querySelectorAll('.segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      countryPicker.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCountry = btn.getAttribute('data-country');
      updateRegionUI();
      phoneInput.value = regionConfigs[activeCountry].defaultVal;
      update();
    });
  });

  clearBtn.addEventListener('click', () => {
    phoneInput.value = '';
    phoneInput.focus();
    update();
  });

  copyCleanedBtn.addEventListener('click', () => {
    if (cleanedValue.textContent && cleanedValue.textContent !== '(invalid)') {
      copyToClipboard(cleanedValue.textContent, copyCleanedBtn, 'Normalized phone copied!');
    }
  });

  copyCodeBtn.addEventListener('click', () => {
    copyToClipboard(codeBlock.textContent, copyCodeBtn, 'Phone code snippet copied!');
  });

  updateRegionUI();
  update();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJsString(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
