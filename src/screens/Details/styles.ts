import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backBtn: {
    marginBottom: 15,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: '#ccc',
    fontSize: 15,
  },
  poster: {
    width: '100%',
    height: 220,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    color: '#ededed',
    marginVertical: 15,
    fontFamily: 'Poppins-Regular',
  },
  trailerBtnContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#bc85ff',
  },
  timeAndVoteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  releaseAndGenreContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    borderTopColor: '#656565',
    borderTopWidth: 1,
    marginBottom: 20,
  },
  releaseAndGenreTitle: {
    fontSize: 16,
    color: '#ededed',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  genreName: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    color: '#c3c3c3',
    fontSize: 12,
  },
  dataContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  overview: {
    fontSize: 16,
    color: '#fffffff2',
    opacity: 0.8,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
  },
  recommendationsTitle: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  recommendations: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20,
  },
});
