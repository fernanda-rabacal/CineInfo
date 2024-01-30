import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  showText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  modal: {
    backgroundColor: '#1f1632',
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    gap: 20,
    marginLeft: 15,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    fontFamily: 'Poppins-Regular',
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});
