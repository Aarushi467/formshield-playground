import { showToast } from '../components/toast.js';

/**
 * Copies text to the clipboard and triggers visual feedback.
 * @param {string} text - Text to copy
 * @param {HTMLElement} [buttonElement] - Optional button element to temporarily change state
 * @param {string} [customMessage] - Optional toast message
 */
export async function copyToClipboard(text, buttonElement = null, customMessage = 'Copied to clipboard!') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-secure contexts or older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }

    if (buttonElement) {
      const originalHTML = buttonElement.innerHTML;
      buttonElement.classList.add('copied');
      buttonElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        <span>Copied!</span>
      `;
      setTimeout(() => {
        buttonElement.classList.remove('copied');
        buttonElement.innerHTML = originalHTML;
      }, 1800);
    }

    showToast(customMessage, 'success');
  } catch (err) {
    console.error('Failed to copy: ', err);
    showToast('Failed to copy to clipboard', 'error');
  }
}
