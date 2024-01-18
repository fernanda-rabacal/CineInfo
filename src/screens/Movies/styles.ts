import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listEmptyText: {
    fontSize: 20,
    color: '#e3e3e3',
    textAlign: 'center',
  },
  searchInput: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: '#866287',
    color: '#dedede',
    fontSize: 16,
    paddingHorizontal: 7,
    marginVertical: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moviesContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  movieContainerTitle: {
    fontSize: 20,
    color: '#ebe6ee',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
});
