import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  listEmptyText: {
    color: theme.COLORS.GRAY_200,
    fontSize: theme.FONT_SIZE.LG,
    textAlign: 'center',
  },
  title: {
    color: theme.COLORS.GRAY_100,
    fontSize: theme.FONT_SIZE.XXL,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 15,
    borderBottomColor: theme.COLORS.GRAY_400,
    borderBottomWidth: 1,
  },
});
