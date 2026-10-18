import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export async function provideAnswerHapticFeedback(correct, enabled) {
  if (!enabled || (Platform.OS !== 'android' && Platform.OS !== 'ios')) {
    return;
  }

  try {
    await Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning,
    );
  } catch {
    // Los hápticos son opcionales: un fallo del dispositivo no debe interrumpir la lección.
  }
}