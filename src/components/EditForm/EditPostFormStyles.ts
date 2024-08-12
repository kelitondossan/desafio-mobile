import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 11,
   
    backgroundColor: '#f7f8fa',
  },
  title: {
    
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  input: {
    color: 'black',
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#ecf0f1',
    textAlignVertical: 'top',
  },
  bodyInput: {
    
    height: 130,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    width: '45%', // Ajuste a largura dos botões
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#27ae60',
  },
  deleteButton: {
    backgroundColor: '#c0392b',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15, // Ajuste o tamanho da fonte para caber bem no botão
    textAlign: 'center',
    flex: 1, // Permite que o texto ocupe o espaço disponível
  },
});
