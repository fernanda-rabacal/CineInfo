import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 10,
    left: 15,
    zIndex: 100,
    fontFamily: 'Poppins-Regular',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -10,
  },
});
