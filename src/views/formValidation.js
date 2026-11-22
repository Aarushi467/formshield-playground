import { icons } from '../utils/icons.js';
import { copyToClipboard } from '../utils/copy.js';
import { showToast } from '../components/toast.js';
import { validateForm } from 'formshield-js';

export function renderFormValidation() {
  return `
    <div class="view-content tool-view">
      <!-- Tool View Header -->
      <div class="tool-view-header">
        <div class="tool-title-row">
          <div class="tool-icon-badge">${icons.form}</div>
          <div>
            <h1 class="tool-page-title">Form Validation Engine</h1>
            <p class="tool-page-desc">Declarative multi-field form validation with real-time schema execution via <code class="inline-code">validateForm</code></p>
          </div>
        </div>
        <div class="tool-meta-tags">
          <span class="tag-pill">Package Export: validateForm</span>
          <span class="tag-pill tag-pill-accent">Schema Driven</span>
        </div>
      </div>

      <!-- Schema Template Selector Bar -->
      <div class="card schema-selector-card">
        <div class="schema-selector-row">
          <div class="selector-info">
            <span class="selector-label">Select Demo Form Schema:</span>
            <span class="selector-desc">Choose a declarative validation schema template</span>
          </div>
          <div class="segmented-control" id="formSchemaSelector">
            <button class="segment-btn active" data-schema="signup">
              <span>User Registration</span>
            </button>
            <button class="segment-btn" data-schema="contact">
              <span>Business Inquiry</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Workbench Grid -->
      <div class="workbench-grid">
        <!-- Left Column: Interactive Form -->
        <div class="workbench-col">
          <div class="card card-interactive">
            <div class="card-header-bar">
              <span class="card-title" id="formTitle">User Registration Form</span>
              <div class="form-actions-quick">
                <button class="btn btn-sm btn-ghost" id="formFillValidBtn" title="Fill form with valid data">
                  ${icons.check}
                  <span>Fill Valid</span>
                </button>
                <button class="btn btn-sm btn-ghost" id="formFillInvalidBtn" title="Fill form with invalid data">
                  ${icons.alertTriangle}
                  <span>Fill Invalid</span>
                </button>
                <button class="btn btn-sm btn-ghost" id="formResetBtn" title="Reset all fields">
                  ${icons.x}
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <!-- Dynamic Form Container -->
            <form id="interactiveForm" class="interactive-form" novalidate>
              <div id="formFieldsContainer">
                <!-- Injected dynamically based on schema -->
              </div>

              <div class="form-submit-row">
                <button type="submit" class="btn btn-primary btn-lg" id="formSubmitBtn">
                  ${icons.shieldCheck}
                  <span>Validate &amp; Submit Form</span>
                </button>
                <label class="live-validate-toggle">
                  <input type="checkbox" id="formLiveValidateToggle" checked class="form-checkbox" />
                  <span class="checkbox-custom"></span>
                  <span class="toggle-text">Live validate as you type</span>
                </label>
              </div>
            </form>
          </div>

          <!-- Active Schema Code Block -->
          <div class="card card-code">
            <div class="card-header-bar">
              <div class="code-header-title">
                ${icons.terminal}
                <span>Active Validation Schema</span>
              </div>
              <button class="btn btn-sm btn-ghost" id="formCopySchemaBtn">
                ${icons.copy}
                <span>Copy Schema</span>
              </button>
            </div>
            <pre class="code-block" id="formSchemaCodeBlock"><code>...</code></pre>
          </div>
        </div>

        <!-- Right Column: Validation Status & Field Inspector -->
        <div class="workbench-col">
          <!-- Overall Form Status Banner -->
          <div class="status-banner" id="formOverallStatusBanner">
            <div class="status-banner-icon" id="formOverallStatusIcon"></div>
            <div class="status-banner-content">
              <div class="status-banner-heading" id="formOverallHeading">Validating Form...</div>
              <div class="status-banner-detail" id="formOverallDetail">...</div>
            </div>
            <div class="status-banner-badge" id="formOverallBadge"></div>
          </div>

          <!-- Field-by-Field Results Breakdown -->
          <div class="card">
            <div class="card-header-bar">
              <span class="card-title">Field Validation Details</span>
              <span class="card-subtitle-badge" id="formErrorCountBadge">0 Errors</span>
            </div>
            <div class="field-results-list" id="formFieldResultsList">
              <!-- Populated dynamically -->
            </div>
          </div>

          <!-- Raw Return JSON Inspector -->
          <div class="card">
            <div class="card-header-bar">
              <div class="json-header-title">
                <span class="pulse-dot"></span>
                <span>Actual Return Value (<code class="inline-code">validateForm()</code>)</span>
              </div>
              <span class="tag-pill tag-pill-accent">REAL OBJECT</span>
            </div>
            <pre class="json-display" id="formJsonDisplay"><code class="language-json">...</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initFormValidation(container) {
  const schemaSelector = container.querySelector('#formSchemaSelector');
  const formTitle = container.querySelector('#formTitle');
  const formFieldsContainer = container.querySelector('#formFieldsContainer');
  const formEl = container.querySelector('#interactiveForm');
  const liveValidateToggle = container.querySelector('#formLiveValidateToggle');

  const fillValidBtn = container.querySelector('#formFillValidBtn');
  const fillInvalidBtn = container.querySelector('#formFillInvalidBtn');
  const resetBtn = container.querySelector('#formResetBtn');

  const overallBanner = container.querySelector('#formOverallStatusBanner');
  const overallIcon = container.querySelector('#formOverallStatusIcon');
  const overallHeading = container.querySelector('#formOverallHeading');
  const overallDetail = container.querySelector('#formOverallDetail');
  const overallBadge = container.querySelector('#formOverallBadge');

  const errorCountBadge = container.querySelector('#formErrorCountBadge');
  const fieldResultsList = container.querySelector('#formFieldResultsList');
  const jsonDisplay = container.querySelector('#formJsonDisplay code');
  const schemaCodeBlock = container.querySelector('#formSchemaCodeBlock code');
  const copySchemaBtn = container.querySelector('#formCopySchemaBtn');

  let activeSchemaKey = 'signup';

  const schemaDefinitions = {
    signup: {
      title: 'User Registration Form',
      fields: [
        {
          id: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'e.g. Alex Henderson',
          ruleHelp: 'Required, min 3 characters, max 30 characters'
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'e.g. alex@company.com',
          ruleHelp: 'Required, type: "email" RFC syntax'
        },
        {
          id: 'password',
          label: 'Account Password',
          type: 'password',
          placeholder: 'e.g. Secret#Pass2026',
          ruleHelp: 'Required, minStrength: "strong"'
        },
        {
          id: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: 'Retype password',
          ruleHelp: 'Required, custom equality match'
        },
        {
          id: 'phone',
          label: 'Phone Number (Optional)',
          type: 'text',
          placeholder: 'e.g. (555) 234-5678',
          ruleHelp: 'Optional, type: "phone", country: "US"'
        },
        {
          id: 'terms',
          label: 'I accept the FormShield terms of service and developer agreement',
          type: 'checkbox',
          ruleHelp: 'Required custom agreement'
        }
      ],
      schema: {
        fullName: {
          required: true,
          type: 'string',
          minLength: 3,
          maxLength: 30,
          message: 'Full name is required and must be 3-30 characters'
        },
        email: {
          required: true,
          type: 'email',
          message: 'Please provide a valid email address'
        },
        password: {
          required: true,
          type: 'password',
          minStrength: 'strong'
        },
        confirmPassword: {
          required: true,
          type: 'string',
          custom: (val, data) => val === data.password || 'Passwords do not match'
        },
        phone: {
          required: false,
          type: 'phone',
          options: { country: 'US' }
        },
        terms: {
          required: true,
          custom: (val) => val === true || 'You must agree to the Terms of Service'
        }
      },
      validData: {
        fullName: 'Alex Henderson',
        email: 'alex.henderson@formshield.io',
        password: 'Vault#SecretPass2026!',
        confirmPassword: 'Vault#SecretPass2026!',
        phone: '(555) 234-5678',
        terms: true
      },
      invalidData: {
        fullName: 'Al',
        email: 'not-an-email',
        password: 'weak',
        confirmPassword: 'different-password',
        phone: '123-abc',
        terms: false
      },
      schemaCode: `const schema = {
  fullName: {
    required: true,
    type: 'string',
    minLength: 3,
    maxLength: 30,
    message: 'Full name is required and must be 3-30 characters'
  },
  email: {
    required: true,
    type: 'email',
    message: 'Please provide a valid email address'
  },
  password: {
    required: true,
    type: 'password',
    minStrength: 'strong' // Enforces score >= 61
  },
  confirmPassword: {
    required: true,
    type: 'string',
    custom: (val, data) => val === data.password || 'Passwords do not match'
  },
  phone: {
    required: false,
    type: 'phone',
    options: { country: 'US' }
  },
  terms: {
    required: true,
    custom: (val) => val === true || 'You must agree to the Terms of Service'
  }
};`
    },

    contact: {
      title: 'Business Inquiry Form',
      fields: [
        {
          id: 'companyName',
          label: 'Organization / Company Name',
          type: 'text',
          placeholder: 'e.g. Acme Corp',
          ruleHelp: 'Required, min 2 characters'
        },
        {
          id: 'workEmail',
          label: 'Business Work Email',
          type: 'email',
          placeholder: 'e.g. lead@acme.com',
          ruleHelp: 'Required, type: "email"'
        },
        {
          id: 'phone',
          label: 'Direct Phone (India format)',
          type: 'text',
          placeholder: 'e.g. +91 98765-43210',
          ruleHelp: 'Required, type: "phone", country: "IN"'
        },
        {
          id: 'message',
          label: 'Project Details & Inquiry',
          type: 'textarea',
          placeholder: 'Describe your application or technical requirements...',
          ruleHelp: 'Required, min 10 characters, max 300 characters'
        }
      ],
      schema: {
        companyName: {
          required: true,
          type: 'string',
          minLength: 2,
          message: 'Company name must be at least 2 characters'
        },
        workEmail: {
          required: true,
          type: 'email',
          message: 'Valid business email is required'
        },
        phone: {
          required: true,
          type: 'phone',
          options: { country: 'IN' },
          message: 'Valid Indian phone number is required'
        },
        message: {
          required: true,
          type: 'string',
          minLength: 10,
          maxLength: 300,
          message: 'Message must be between 10 and 300 characters'
        }
      },
      validData: {
        companyName: 'Acme Cloud Solutions',
        workEmail: 'partnerships@acme.com',
        phone: '+91 98765 43210',
        message: 'We are seeking an enterprise license for FormShield to validate user registration flows.'
      },
      invalidData: {
        companyName: '',
        workEmail: 'invalid-email',
        phone: '+1 555-1234',
        message: 'Hi'
      },
      schemaCode: `const schema = {
  companyName: {
    required: true,
    type: 'string',
    minLength: 2,
    message: 'Company name must be at least 2 characters'
  },
  workEmail: {
    required: true,
    type: 'email',
    message: 'Valid business email is required'
  },
  phone: {
    required: true,
    type: 'phone',
    options: { country: 'IN' },
    message: 'Valid Indian phone number is required'
  },
  message: {
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 300,
    message: 'Message must be between 10 and 300 characters'
  }
};`
    }
  };

  function renderFields() {
    const def = schemaDefinitions[activeSchemaKey];
    formTitle.textContent = def.title;
    schemaCodeBlock.textContent = def.schemaCode;

    formFieldsContainer.innerHTML = def.fields.map(f => {
      if (f.type === 'checkbox') {
        return `
          <div class="form-group field-group" data-field-id="${f.id}">
            <label class="checkbox-label">
              <input type="checkbox" id="field_${f.id}" class="form-checkbox" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-text font-medium">${f.label}</span>
            </label>
            <div class="field-error-msg" id="err_${f.id}"></div>
          </div>
        `;
      }

      if (f.type === 'textarea') {
        return `
          <div class="form-group field-group" data-field-id="${f.id}">
            <label class="form-label" for="field_${f.id}">
              <span>${f.label}</span>
              <span class="field-rule-hint">${f.ruleHelp}</span>
            </label>
            <textarea
              id="field_${f.id}"
              class="form-textarea"
              rows="3"
              placeholder="${f.placeholder}"
            ></textarea>
            <div class="field-error-msg" id="err_${f.id}"></div>
          </div>
        `;
      }

      return `
        <div class="form-group field-group" data-field-id="${f.id}">
          <label class="form-label" for="field_${f.id}">
            <span>${f.label}</span>
            <span class="field-rule-hint">${f.ruleHelp}</span>
          </label>
          <div class="input-icon-wrap">
            <input
              type="${f.type}"
              id="field_${f.id}"
              class="form-input"
              placeholder="${f.placeholder}"
              autocomplete="off"
            />
            <span class="input-end-status" id="icon_${f.id}"></span>
          </div>
          <div class="field-error-msg" id="err_${f.id}"></div>
        </div>
      `;
    }).join('');

    // Attach input listeners
    def.fields.forEach(f => {
      const input = formFieldsContainer.querySelector(`#field_${f.id}`);
      if (input) {
        input.addEventListener('input', () => {
          if (liveValidateToggle.checked) {
            runValidation();
          }
        });
        input.addEventListener('change', () => {
          if (liveValidateToggle.checked) {
            runValidation();
          }
        });
      }
    });

    // Populate with valid initial data for a great first impression
    populateForm(def.validData);
    runValidation();
  }

  function getFormData() {
    const def = schemaDefinitions[activeSchemaKey];
    const data = {};
    def.fields.forEach(f => {
      const el = formFieldsContainer.querySelector(`#field_${f.id}`);
      if (el) {
        if (f.type === 'checkbox') {
          data[f.id] = el.checked;
        } else {
          data[f.id] = el.value;
        }
      }
    });
    return data;
  }

  function populateForm(data) {
    const def = schemaDefinitions[activeSchemaKey];
    def.fields.forEach(f => {
      const el = formFieldsContainer.querySelector(`#field_${f.id}`);
      if (el && data[f.id] !== undefined) {
        if (f.type === 'checkbox') {
          el.checked = Boolean(data[f.id]);
        } else {
          el.value = data[f.id];
        }
      }
    });
  }

  function runValidation() {
    const def = schemaDefinitions[activeSchemaKey];
    const formData = getFormData();

    // 1. Invoke REAL package function
    const result = validateForm(formData, def.schema);

    // 2. Update Overall Status Banner
    if (result.isValid) {
      overallBanner.className = 'status-banner status-banner-valid';
      overallIcon.innerHTML = icons.shieldCheck;
      overallHeading.textContent = 'All Form Validations Passed';
      overallDetail.textContent = 'Zero schema validation errors detected. Ready for dispatch.';
      overallBadge.textContent = 'isValid: true';
      overallBadge.className = 'status-banner-badge badge-valid';
    } else {
      overallBanner.className = 'status-banner status-banner-invalid';
      overallIcon.innerHTML = icons.alertTriangle;
      overallHeading.textContent = `Validation Failed: ${result.errorCount} ${result.errorCount === 1 ? 'Error' : 'Errors'}`;
      overallDetail.textContent = 'Please correct the highlighted field errors below.';
      overallBadge.textContent = 'isValid: false';
      overallBadge.className = 'status-banner-badge badge-invalid';
    }

    errorCountBadge.textContent = `${result.errorCount} ${result.errorCount === 1 ? 'Error' : 'Errors'}`;
    errorCountBadge.className = result.isValid ? 'card-subtitle-badge' : 'card-subtitle-badge badge-danger';

    // 3. Update Individual Field Elements in the Form
    def.fields.forEach(f => {
      const fieldId = f.id;
      const groupEl = formFieldsContainer.querySelector(`[data-field-id="${fieldId}"]`);
      const errorMsgEl = formFieldsContainer.querySelector(`#err_${fieldId}`);
      const iconEl = formFieldsContainer.querySelector(`#icon_${fieldId}`);
      const inputEl = formFieldsContainer.querySelector(`#field_${fieldId}`);

      const fieldError = result.errors && result.errors[fieldId];

      if (fieldError) {
        if (groupEl) groupEl.classList.add('has-error');
        if (inputEl) inputEl.classList.add('input-invalid');
        if (errorMsgEl) errorMsgEl.textContent = fieldError;
        if (iconEl) iconEl.innerHTML = `<span class="icon-invalid">${icons.x}</span>`;
      } else {
        if (groupEl) groupEl.classList.remove('has-error');
        if (inputEl) inputEl.classList.remove('input-invalid');
        if (errorMsgEl) errorMsgEl.textContent = '';
        if (iconEl) iconEl.innerHTML = `<span class="icon-valid">${icons.check}</span>`;
      }
    });

    // 4. Update Field-by-Field Results Breakdown
    fieldResultsList.innerHTML = def.fields.map(f => {
      const fieldId = f.id;
      const fieldResult = result.results && result.results[fieldId];
      const hasError = result.errors && result.errors[fieldId];

      return `
        <div class="field-result-row ${hasError ? 'row-invalid' : 'row-valid'}">
          <div class="result-field-info">
            <span class="result-field-name">${f.label} (<code>${fieldId}</code>)</span>
            <span class="result-field-msg ${hasError ? 'text-danger' : 'text-success'}">
              ${hasError ? result.errors[fieldId] : 'Passed validation rules'}
            </span>
          </div>
          <div class="result-field-badge">
            ${hasError
              ? `<span class="badge-pill badge-danger">${icons.x} Invalid</span>`
              : `<span class="badge-pill badge-success">${icons.check} Valid</span>`
            }
          </div>
        </div>
      `;
    }).join('');

    // 5. Update Raw JSON
    jsonDisplay.textContent = JSON.stringify(result, null, 2);

    return result;
  }

  // Schema selector
  schemaSelector.querySelectorAll('.segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      schemaSelector.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSchemaKey = btn.getAttribute('data-schema');
      renderFields();
    });
  });

  // Action buttons
  fillValidBtn.addEventListener('click', () => {
    populateForm(schemaDefinitions[activeSchemaKey].validData);
    runValidation();
    showToast('Loaded valid test data', 'info');
  });

  fillInvalidBtn.addEventListener('click', () => {
    populateForm(schemaDefinitions[activeSchemaKey].invalidData);
    runValidation();
    showToast('Loaded invalid test data with intentional errors', 'warning');
  });

  resetBtn.addEventListener('click', () => {
    formEl.reset();
    runValidation();
    showToast('Form reset', 'info');
  });

  copySchemaBtn.addEventListener('click', () => {
    copyToClipboard(schemaCodeBlock.textContent, copySchemaBtn, 'Validation schema copied!');
  });

  // Form Submit Handler
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = runValidation();
    if (result.isValid) {
      showToast('Form successfully validated and submitted!', 'success', 4000);
    } else {
      showToast(`Form validation failed with ${result.errorCount} errors`, 'error', 4000);
    }
  });

  // Initial render
  renderFields();
}
