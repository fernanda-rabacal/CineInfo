import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
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
});
