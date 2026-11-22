import { icons } from '../utils/icons.js';
import { copyToClipboard } from '../utils/copy.js';
import { checkPasswordStrength } from 'formshield-js';

export function renderPasswordStrength() {
  return `
    <div class="view-content tool-view">
      <!-- Tool View Header -->
      <div class="tool-view-header">
        <div class="tool-title-row">
          <div class="tool-icon-badge">${icons.key}</div>
          <div>
            <h1 class="tool-page-title">Password Strength Evaluator</h1>
            <p class="tool-page-desc">Comprehensive complexity heuristic scoring powered by <code class="inline-code">checkPasswordStrength</code></p>
          </div>
        </div>
        <div class="tool-meta-tags">
          <span class="tag-pill">Package Export: checkPasswordStrength</span>
          <span class="tag-pill tag-pill-accent">0-100 Scoring</span>
        </div>
      </div>

      <!-- Main Workbench Grid -->
      <div class="workbench-grid">
        <!-- Left Column: Input and Config -->
        <div class="workbench-col">
          <div class="card card-interactive">
            <div class="card-header-bar">
              <span class="card-title">Password Input &amp; Rules</span>
              <button class="btn btn-sm btn-ghost" id="pwdClearBtn" title="Clear password">
                ${icons.x}
                <span>Clear</span>
              </button>
            </div>

            <div class="form-group">
              <label class="form-label" for="pwdInput">
                <span>Password String:</span>
                <span class="char-counter" id="pwdCharCount">0 chars</span>
              </label>
              <div class="input-password-wrap">
                <input
                  type="password"
                  id="pwdInput"
                  class="form-input form-input-lg"
                  placeholder="Type a password to test..."
                  value="Vault#Guard2026!"
                  autocomplete="off"
                  spellcheck="false"
                />
                <button type="button" class="pwd-toggle-btn" id="pwdToggleVisibility" title="Toggle password visibility">
                  ${icons.eye}
                </button>
              </div>
            </div>

            <!-- Options: minLength -->
            <div class="options-box">
              <div class="options-header-row">
                <span class="options-title">Minimum Length Requirement:</span>
                <span class="badge-pill" id="pwdMinLengthDisplay">8 chars</span>
              </div>
              <div class="slider-control-row">
                <input type="range" id="pwdMinLengthSlider" min="4" max="24" value="8" class="form-slider" />
                <input type="number" id="pwdMinLengthInput" min="4" max="32" value="8" class="form-input-sm number-input" />
              </div>
              <span class="option-desc">Configures the <code class="inline-code">minLength</code> option passed into checkPasswordStrength</span>
            </div>

            <!-- Presets Section -->
            <div class="presets-section">
              <div class="presets-label">Test with Presets:</div>
              <div class="presets-grid">
                <button class="preset-btn preset-danger" data-pwd="password">
                  <span class="preset-dot invalid"></span>
                  <span>"password"</span>
                </button>
                <button class="preset-btn preset-danger" data-pwd="12345678">
                  <span class="preset-dot invalid"></span>
                  <span>Sequential numbers</span>
                </button>
                <button class="preset-btn preset-warning" data-pwd="qwerty99!">
                  <span class="preset-dot warning"></span>
                  <span>Predictable word</span>
                </button>
                <button class="preset-btn preset-warning" data-pwd="aaaaabbbbb1!">
                  <span class="preset-dot warning"></span>
                  <span>Repeated runs</span>
                </button>
                <button class="preset-btn preset-info" data-pwd="Summer2026!">
                  <span class="preset-dot info"></span>
                  <span>Typical user pass</span>
                </button>
                <button class="preset-btn preset-valid" data-pwd="Vault#Guard2026!">
                  <span class="preset-dot valid"></span>
                  <span>Strong password</span>
                </button>
                <button class="preset-btn preset-valid" data-pwd="correct-horse-battery-staple-99!">
                  <span class="preset-dot valid"></span>
                  <span>Passphrase (Very Strong)</span>
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
              <button class="btn btn-sm btn-ghost" id="pwdCopyCodeBtn">
                ${icons.copy}
                <span>Copy</span>
              </button>
            </div>
            <pre class="code-block" id="pwdCodeBlock"><code>...</code></pre>
          </div>
        </div>

        <!-- Right Column: Visual Meter & Analysis -->
        <div class="workbench-col">
          <!-- Strength Meter Card -->
          <div class="card card-meter" id="pwdMeterCard">
            <div class="meter-header">
              <div>
                <span class="meter-subtitle">HEURISTIC STRENGTH LEVEL</span>
                <div class="meter-level-name" id="pwdLevelName">Strong</div>
              </div>
              <div class="meter-score-bubble" id="pwdScoreBubble">
                <span class="score-number" id="pwdScoreNum">85</span>
                <span class="score-max">/ 100</span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="meter-progress-track">
              <div class="meter-progress-bar" id="pwdProgressBar" style="width: 85%;"></div>
            </div>

            <div class="meter-stats-row">
              <span class="meter-checks-passed" id="pwdChecksPassed">5 of 5 checks passed</span>
              <span class="meter-level-badge" id="pwdLevelBadge">strong</span>
            </div>
          </div>

          <!-- 5 Criteria Checklist -->
          <div class="card">
            <div class="card-header-bar">
              <span class="card-title">Complexity Criteria Checklist</span>
              <span class="card-subtitle-badge" id="pwdPassedRatioBadge">5 / 5 Passed</span>
            </div>
            <div class="checks-list">
              <div class="check-item" id="checkMinLength">
                <span class="check-status-icon"></span>
                <div class="check-info">
                  <span class="check-title">Minimum Length</span>
                  <span class="check-sub" id="checkMinLengthDesc">At least 8 characters</span>
                </div>
              </div>
              <div class="check-item" id="checkUppercase">
                <span class="check-status-icon"></span>
                <div class="check-info">
                  <span class="check-title">Uppercase Character</span>
                  <span class="check-sub">Contains A-Z</span>
                </div>
              </div>
              <div class="check-item" id="checkLowercase">
                <span class="check-status-icon"></span>
                <div class="check-info">
                  <span class="check-title">Lowercase Character</span>
                  <span class="check-sub">Contains a-z</span>
                </div>
              </div>
              <div class="check-item" id="checkNumber">
                <span class="check-status-icon"></span>
                <div class="check-info">
                  <span class="check-title">Numeric Digit</span>
                  <span class="check-sub">Contains 0-9</span>
                </div>
              </div>
              <div class="check-item" id="checkSpecialChar">
                <span class="check-status-icon"></span>
                <div class="check-info">
                  <span class="check-title">Special Symbol</span>
                  <span class="check-sub">Contains punctuation or symbol (e.g. !@#$%^&amp;*)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Suggestions & Feedback Card -->
          <div class="card">
            <div class="card-header-bar">
              <span class="card-title">Recommendations &amp; Heuristic Feedback</span>
              <span class="suggestions-count" id="pwdSuggestionsCount">0 Suggestions</span>
            </div>
            <div class="suggestions-box" id="pwdSuggestionsList">
              <!-- populated dynamically -->
            </div>
          </div>

          <!-- Raw Return JSON Inspector -->
          <div class="card">
            <div class="card-header-bar">
              <div class="json-header-title">
                <span class="pulse-dot"></span>
                <span>Actual Return Value (<code class="inline-code">checkPasswordStrength()</code>)</span>
              </div>
              <span class="tag-pill tag-pill-accent">REAL OBJECT</span>
            </div>
            <pre class="json-display" id="pwdJsonDisplay"><code class="language-json">...</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initPasswordStrength(container) {
  const pwdInput = container.querySelector('#pwdInput');
  const toggleVisibilityBtn = container.querySelector('#pwdToggleVisibility');
  const clearBtn = container.querySelector('#pwdClearBtn');
  const charCount = container.querySelector('#pwdCharCount');
  
  const minLengthSlider = container.querySelector('#pwdMinLengthSlider');
  const minLengthInput = container.querySelector('#pwdMinLengthInput');
  const minLengthDisplay = container.querySelector('#pwdMinLengthDisplay');

  const meterCard = container.querySelector('#pwdMeterCard');
  const levelName = container.querySelector('#pwdLevelName');
  const scoreNum = container.querySelector('#pwdScoreNum');
  const progressBar = container.querySelector('#pwdProgressBar');
  const checksPassedText = container.querySelector('#pwdChecksPassed');
  const levelBadge = container.querySelector('#pwdLevelBadge');
  const passedRatioBadge = container.querySelector('#pwdPassedRatioBadge');

  const checkElements = {
    hasMinLength: container.querySelector('#checkMinLength'),
    hasUppercase: container.querySelector('#checkUppercase'),
    hasLowercase: container.querySelector('#checkLowercase'),
    hasNumber: container.querySelector('#checkNumber'),
    hasSpecialChar: container.querySelector('#checkSpecialChar')
  };
  const minLengthDesc = container.querySelector('#checkMinLengthDesc');

  const suggestionsList = container.querySelector('#pwdSuggestionsList');
  const suggestionsCount = container.querySelector('#pwdSuggestionsCount');

  const jsonDisplay = container.querySelector('#pwdJsonDisplay code');
  const codeBlock = container.querySelector('#pwdCodeBlock code');
  const copyCodeBtn = container.querySelector('#pwdCopyCodeBtn');

  let isPasswordVisible = false;

  function update() {
    const rawVal = pwdInput.value;
    const minLen = parseInt(minLengthSlider.value, 10) || 8;

    charCount.textContent = `${rawVal.length} chars`;
    minLengthDisplay.textContent = `${minLen} chars`;
    minLengthDesc.textContent = `At least ${minLen} characters`;

    // 1. Invoke REAL package function
    const result = checkPasswordStrength(rawVal, { minLength: minLen });

    // 2. Update Meter & Score
    const score = result.score;
    const level = result.level; // 'very-weak' | 'weak' | 'fair' | 'strong' | 'very-strong'

    scoreNum.textContent = score;
    progressBar.style.width = `${score}%`;

    const levelDisplayMap = {
      'very-weak': 'Very Weak',
      'weak': 'Weak',
      'fair': 'Fair / Medium',
      'strong': 'Strong',
      'very-strong': 'Very Strong'
    };

    levelName.textContent = levelDisplayMap[level] || level;
    levelBadge.textContent = level;
    levelBadge.className = `meter-level-badge level-${level}`;

    meterCard.className = `card card-meter meter-level-${level}`;

    checksPassedText.textContent = `${result.passedCount} of 5 checks passed`;
    passedRatioBadge.textContent = `${result.passedCount} / 5 Passed`;

    // 3. Update Checklist
    Object.keys(checkElements).forEach(checkKey => {
      const el = checkElements[checkKey];
      const isPassed = Boolean(result.checks && result.checks[checkKey]);
      const iconSpan = el.querySelector('.check-status-icon');
      if (isPassed) {
        el.className = 'check-item check-passed';
        iconSpan.innerHTML = icons.check;
      } else {
        el.className = 'check-item check-failed';
        iconSpan.innerHTML = icons.x;
      }
    });

    // 4. Update Suggestions
    const suggestions = result.suggestions || [];
    suggestionsCount.textContent = `${suggestions.length} ${suggestions.length === 1 ? 'Notice' : 'Notices'}`;

    if (suggestions.length === 0) {
      suggestionsList.innerHTML = `
        <div class="suggestion-empty">
          <span class="empty-icon">${icons.shieldCheck}</span>
          <span>No warnings or suggestions — this password meets all complexity guidelines.</span>
        </div>
      `;
    } else {
      suggestionsList.innerHTML = suggestions.map(s => `
        <div class="suggestion-item">
          <span class="suggestion-icon">${icons.alertTriangle}</span>
          <span class="suggestion-text">${escapeHtml(s)}</span>
        </div>
      `).join('');
    }

    // 5. Update Raw JSON
    jsonDisplay.textContent = JSON.stringify(result, null, 2);

    // 6. Update Code snippet
    const codeSnippet = `import { checkPasswordStrength } from 'formshield-js';

const result = checkPasswordStrength('${escapeJsString(rawVal)}'${minLen !== 8 ? `, { minLength: ${minLen} }` : ''});

console.log(result.score);       // => ${result.score}
console.log(result.level);       // => "${result.level}"
console.log(result.passedCount); // => ${result.passedCount}
console.log(result.suggestions); // => ${JSON.stringify(result.suggestions)}`;
    codeBlock.textContent = codeSnippet;
  }

  // Event Listeners
  pwdInput.addEventListener('input', update);

  toggleVisibilityBtn.addEventListener('click', () => {
    isPasswordVisible = !isPasswordVisible;
    pwdInput.type = isPasswordVisible ? 'text' : 'password';
    toggleVisibilityBtn.innerHTML = isPasswordVisible ? icons.eyeOff : icons.eye;
    toggleVisibilityBtn.setAttribute('title', isPasswordVisible ? 'Hide password' : 'Show password');
  });

  clearBtn.addEventListener('click', () => {
    pwdInput.value = '';
    pwdInput.focus();
    update();
  });

  minLengthSlider.addEventListener('input', () => {
    minLengthInput.value = minLengthSlider.value;
    update();
  });

  minLengthInput.addEventListener('input', () => {
    let val = parseInt(minLengthInput.value, 10);
    if (isNaN(val) || val < 4) val = 4;
    if (val > 32) val = 32;
    minLengthSlider.value = val;
    update();
  });

  container.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pwdInput.value = btn.getAttribute('data-pwd');
      update();
    });
  });

  copyCodeBtn.addEventListener('click', () => {
    copyToClipboard(codeBlock.textContent, copyCodeBtn, 'Password code snippet copied!');
  });

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
