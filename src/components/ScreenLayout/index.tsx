import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../Loader';
import { styles } from './styles';
import { ScrollView } from 'react-native';

export function ScreenLayout({ children, isLoading = false }) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </SafeAreaView>
  );
}
