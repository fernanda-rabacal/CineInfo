import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20
  },
  poster: {
    width: 110,
    height: 160,
    borderRadius: 10
  }, 
  title: {
    fontSize: 20,
    color: "#ccc",
    marginBottom: 25
  },
  text: {
    fontSize: 15,
    color: '#ccc'
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  }
})