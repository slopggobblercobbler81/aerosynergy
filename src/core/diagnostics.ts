export interface PoppedBubbleReport {
  featureId: string;
  error: string;
  stack?: string;
  timestamp: string;
}

const poppedBubbles: PoppedBubbleReport[] = [];
const subscribers = new Set<() => void>();

export function recordPoppedBubble(featureId: string, error: Error | string) {
  const report: PoppedBubbleReport = {
    featureId,
    error: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'object' && error !== null ? (error as Error).stack : undefined,
    timestamp: new Date().toISOString(),
  };
  poppedBubbles.push(report);
  subscribers.forEach((cb) => cb());
}

export function getPoppedBubbles(): PoppedBubbleReport[] {
  return [...poppedBubbles];
}

export function clearPoppedBubbles(): void {
  poppedBubbles.length = 0;
  subscribers.forEach((cb) => cb());
}

export function subscribeDiagnostics(callback: () => void): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}