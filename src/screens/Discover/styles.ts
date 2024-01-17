import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20,
  },
  searchInput: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: '#866287',
    color: '#dedede',
    fontSize: 16,
    paddingHorizontal: 7,
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
  modalContainer: {
    margin: 0,
    padding: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#1f1632',
    padding: 15,
  },
  gotBackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  searchResultText: {
    fontSize: 20,
    marginBottom: 20,
  },
  noDataFoundText: {
    textAlign: 'center',
    fontSize: 25,
  }
});
