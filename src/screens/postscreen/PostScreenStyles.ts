import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockImage: {
    width: 60,
    height: 60,
  },
  clockText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#2c3e50',
  },
  HomeImage: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#2c3e50',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderColor: '#56ab2f',
    borderWidth: 1,
  },
});
