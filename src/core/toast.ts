// Global Toast Queue per §4.5.3, §8.3

export type ToastKind = 'info' | 'success' | 'party';

export interface ToastItem {
  id: string;
  message: string;
  kind: ToastKind;
  createdAt: number;
}

let activeToasts: ToastItem[] = [];
const toastQueue: ToastItem[] = [];
let hushMode = false;
let calmWatersMode = false;
const listeners = new Set<(toasts: ToastItem[]) => void>();

const MAX_VISIBLE_TOASTS = 3;
const TOAST_DURATION_MS = 3500;

function notify() {
  listeners.forEach((fn) => fn([...activeToasts]));
}

function processQueue() {
  while (activeToasts.length < MAX_VISIBLE_TOASTS && toastQueue.length > 0) {
    const nextToast = toastQueue.shift();
    if (!nextToast) break;

    activeToasts.push(nextToast);
    notify();

    setTimeout(() => {
      dismissToast(nextToast.id);
    }, TOAST_DURATION_MS);
  }
}

export function setHushMode(hush: boolean): void {
  hushMode = hush;
}

export function setCalmWatersMode(calm: boolean): void {
  calmWatersMode = calm;
}

export function showToast(message: string, kind: ToastKind = 'info'): void {
  // If hush mode is active, suppress non-critical toasts
  if (hushMode && kind !== 'party') {
    return;
  }

  const toast: ToastItem = {
    id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    message,
    kind,
    createdAt: Date.now(),
  };

  if (activeToasts.length < MAX_VISIBLE_TOASTS) {
    activeToasts.push(toast);
    notify();

    setTimeout(() => {
      dismissToast(toast.id);
    }, TOAST_DURATION_MS);
  } else {
    toastQueue.push(toast);
  }
}

export function dismissToast(id: string): void {
  const prevLen = activeToasts.length;
  activeToasts = activeToasts.filter((t) => t.id !== id);
  if (activeToasts.length !== prevLen) {
    notify();
    processQueue();
  }
}

export function subscribeToasts(listener: (toasts: ToastItem[]) => void): () => void {
  listeners.add(listener);
  listener([...activeToasts]);
  return () => {
    listeners.delete(listener);
  };
}