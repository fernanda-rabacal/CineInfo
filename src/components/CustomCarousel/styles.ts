import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    alignItems: 'center',
    gap: 10,
  },
  activeDot: {
    color: theme.COLORS.WHITE,
    margin: 3,
    opacity: 1,
  },
  inactiveDot: {
    color: theme.COLORS.WHITE,
    margin: 3,
    opacity: 0.5,
  },
});
