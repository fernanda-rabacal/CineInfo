import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backBtn: {
    marginBottom: 15,
  },
  text: {
    color: '#ccc',
    fontSize: 15
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
    marginBottom: 20
  },
  releaseAndGenreTitle: {
    fontSize: 16,
    color: '#ededed',
    marginBottom: 10
  },
  genreName: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    color: '#c3c3c3',
    fontSize: 12
  },
  dataContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  overview: {
    fontSize: 17,
    color: '#c8c8c8f2',
    textAlign: 'justify'
  },
  recommendationsTitle: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 25,
    marginBottom: 15
  },
  recommendations: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20
  }
})