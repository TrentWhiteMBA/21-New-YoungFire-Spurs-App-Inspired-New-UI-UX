import { db, hasFirebaseEnvVars } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

export function initFirebaseRealtimeSync(): () => void {
  if (!hasFirebaseEnvVars) {
    // Return no-op cleanup if firebase env vars not configured
    return () => {};
  }

  try {
    const unsubPrayers = onSnapshot(collection(db, 'prayers'), () => {
      // Dispatches update events for listeners
      window.dispatchEvent(new CustomEvent('yf_prayers_updated'));
    }, () => {});

    const unsubGatherings = onSnapshot(collection(db, 'gatherings'), () => {
      window.dispatchEvent(new CustomEvent('yf_gatherings_updated'));
    }, () => {});

    return () => {
      unsubPrayers();
      unsubGatherings();
    };
  } catch {
    return () => {};
  }
}
