/**
 * Dialogs opened from a trigger.
 *
 *   trigger:  any element with `data-modal-open="<id>"`
 *   content:  `<template id="<id>">` holding the overlay (with a `[role="dialog"]` inside)
 *   close:    `[data-modal-close]` inside the dialog, a click on the overlay or the Esc key
 *
 * The overlay is added to <body> when it opens (no transformed ancestor can clip it) and removed
 * when it closes, which also stops anything playing inside it. The focus goes into the dialog,
 * stays there while it is open and returns to the trigger afterwards.
 */
declare global {
  interface Window {
    __pilarisModalReady?: boolean;
  }
}

let active: { overlay: HTMLElement; opener: HTMLElement } | null = null;

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

function closeModal() {
  if (!active) return;
  const { overlay, opener } = active;
  active = null;
  overlay.remove();
  opener.focus();
}

function openModal(opener: HTMLElement) {
  const template = document.getElementById(opener.dataset.modalOpen ?? '');
  if (!(template instanceof HTMLTemplateElement)) return;

  closeModal();

  const overlay = template.content.firstElementChild?.cloneNode(true);
  if (!(overlay instanceof HTMLElement)) return;

  document.body.appendChild(overlay);
  active = { overlay, opener };
  overlay.querySelector<HTMLElement>('[data-modal-close]')?.focus();
}

if (!window.__pilarisModalReady) {
  window.__pilarisModalReady = true;

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const opener = event.target.closest<HTMLElement>('[data-modal-open]');
    if (opener) {
      openModal(opener);
      return;
    }

    if (active && (event.target === active.overlay || event.target.closest('[data-modal-close]'))) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;

    // Triggers that are not native buttons still answer to Enter and Space
    if (target?.matches('[data-modal-open][role="button"]') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openModal(target);
      return;
    }

    if (!active) return;

    if (event.key === 'Escape') {
      closeModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = [...active.overlay.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !active.overlay.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !active.overlay.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

export {};
