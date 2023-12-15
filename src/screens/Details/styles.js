import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1139",
    paddingHorizontal: 15
  },
  text: {
    color: '#ccc',
    fontSize: 16
  },
  poster: {
    width: '100%', 
    height: 200, 
    borderRadius: 5,
  },
  title: {
    fontSize: 28,
    color: '#ededed',
    marginVertical: 15,
  },
  timeAndVoteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
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
    fontSize: 20,
    color: '#ededed',
    marginBottom: 10
  },
  genreName: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    color: '#d6d6d6',
    fontSize: 12
  },
  dataContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  overview: {
    fontSize: 17,
    color: '#d3d3d3',
    textAlign: 'justify'
  }
})