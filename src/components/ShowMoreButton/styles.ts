import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 200,
    borderRadius: 6,
    margin: 6,
    backgroundColor: theme.COLORS.GRAY_500,
    opacity: 0.5,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.GRAY_200,
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONTS.TEXT,
  },
});
