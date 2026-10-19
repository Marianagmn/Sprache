import * as Speech from 'expo-speech';

let germanVoicePromise;

export function getGermanVoice() {
  if (!germanVoicePromise) {
    germanVoicePromise = Speech.getAvailableVoicesAsync()
      .then((voices) => voices.find((voice) => (
        voice.language?.replace('_', '-').toLowerCase() === 'de-de'
      )) || null)
      .catch((error) => {
        germanVoicePromise = null;
        throw error;
      });
  }
  return germanVoicePromise;
}
