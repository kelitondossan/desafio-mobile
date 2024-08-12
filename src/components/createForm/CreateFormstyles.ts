// src/components/CreatePostForm/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 219,
    width: 343,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    color:'black',
  },
  input: {
    alignItems: 'center',
    color: 'black',
    height: 40,
    width: 280,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  textArea: {
    height: 50,
    width: 280,
    textAlignVertical: 'top',
  },
  button: {
    alignItems: 'center',
    margin: 17,
  },
  buttonIcon: {
    width: 40,
    height: 40,
  },
});
