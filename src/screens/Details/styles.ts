import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backBtn: {
    marginBottom: 15,
  },
  text: {
    fontFamily: theme.FONTS.TEXT,
    fontSize: theme.FONT_SIZE.SM,
    color: theme.COLORS.GRAY_200,
  },
  poster: {
    width: '100%',
    height: 220,
    borderRadius: 5,
  },
  title: {
    fontSize: theme.FONT_SIZE.XXL,
    color: '#ededed',
    marginVertical: 15,
    fontFamily: theme.FONTS.TEXT,
  },
  trailerBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 5,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: theme.COLORS.PURPLE_400,
  },
  timeAndVoteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  releaseAndGenreContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    borderTopColor: theme.COLORS.GRAY_DEFAULT,
    borderTopWidth: 1,
    marginBottom: 20,
  },
  releaseAndGenreTitle: {
    fontSize: theme.FONT_SIZE.MD,
    color: theme.COLORS.GRAY_100,
    fontFamily: theme.FONTS.TEXT,
    marginBottom: 10,
  },
  genreName: {
    textAlign: 'center',
    color: theme.COLORS.GRAY_200,
    borderWidth: 1,
    borderColor: theme.COLORS.GRAY_200,
    padding: 5,
    borderRadius: 5,
    fontSize: theme.FONT_SIZE.SSM,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  overview: {
    fontSize: theme.FONT_SIZE.MD,
    color: '#fffffff2',
    opacity: 0.8,
    textAlign: 'justify',
    fontFamily: theme.FONTS.TEXT,
  },
  recommendationsTitle: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONTS.TEXT,
    fontSize: theme.FONT_SIZE.XL,
    marginTop: 25,
    marginBottom: 15,
  },
  recommendations: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
});
