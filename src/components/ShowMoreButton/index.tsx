import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlusCircle } from 'phosphor-react-native';
import { styles } from './styles';

export function ShowMoreButton() {
  const { navigate } = useNavigation();

  function handleDiscover() {
    navigate('Discover');
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleDiscover}>
      <PlusCircle color="#cecece" size={48} />
      <Text style={styles.text}>Show More</Text>
    </TouchableOpacity>
  );
}
