import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

const MotionPreferencesContext = createContext(true);

export function MotionPreferencesProvider({ children }) {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let preferenceChanged = false;

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      preferenceChanged = true;
      setReduceMotion(enabled);
    });

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (isMounted && !preferenceChanged) {
          setReduceMotion(enabled);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('No se pudo consultar la preferencia de movimiento reducido.', error);
        }
      });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return (
    <MotionPreferencesContext.Provider value={reduceMotion}>
      {children}
    </MotionPreferencesContext.Provider>
  );
}

export function useReduceMotion() {
  return useContext(MotionPreferencesContext);
}
