import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { Loader } from '../Loader';
import { styles } from './styles';
import { ReactNode } from 'react';

interface ScreenLayoutProps extends SafeAreaViewProps {
  children: ReactNode;
  isLoading?: boolean;
}

export function ScreenLayout({
  children,
  isLoading = false,
  style,
  ...rest
}: ScreenLayoutProps) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
}
