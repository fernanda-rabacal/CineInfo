import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  showText: {
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONTS.TEXT,
  },
  modal: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    gap: 20,
    marginLeft: 15,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: theme.FONT_SIZE.XL,
    fontFamily: theme.FONTS.TEXT,
    color: theme.COLORS.WHITE,
    opacity: 0.8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    fontFamily: theme.FONTS.TEXT,
  },
  optionTitle: {
    fontSize: theme.FONT_SIZE.LG,
    fontFamily: theme.FONTS.TEXT,
  },
});
