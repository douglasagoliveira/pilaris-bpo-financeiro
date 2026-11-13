/**
 * Forms marked with `data-local-form` have no backend yet: on a valid submit the form is
 * replaced by the confirmation block that follows it (`data-local-form-success`).
 * A `data-local-form-reset` control inside the confirmation brings the empty form back.
 *
 * To connect a real destination later (e-mail service, CRM, API), send `new FormData(form)`
 * inside the submit handler below and only show the confirmation when the request succeeds.
 */
document.querySelectorAll<HTMLFormElement>('form[data-local-form]').forEach((form) => {
  const success = form.nextElementSibling;
  if (!(success instanceof HTMLElement) || !success.hasAttribute('data-local-form-success')) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.hidden = true;
    success.hidden = false;
    // Announce the confirmation to assistive technology and keep the keyboard position
    success.setAttribute('tabindex', '-1');
    success.style.outline = 'none';
    success.focus({ preventScroll: true });
  });

  success.querySelectorAll<HTMLElement>('[data-local-form-reset]').forEach((control) => {
    control.addEventListener('click', () => {
      form.reset();
      success.hidden = true;
      form.hidden = false;
      form.querySelector<HTMLElement>('input, select, textarea')?.focus();
    });
  });
});
