import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  animation: {
    width: 120,
    height: 120,
  },
});
