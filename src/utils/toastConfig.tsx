import {
  BaseToastProps,
  ErrorToast,
  BaseToast,
} from 'react-native-toast-message';

export const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#c7e8ca',
        height: '100%',
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
      }}
      text2Style={{
        fontSize: 16,
        color: '#29292E',
      }}
      text2NumberOfLines={10}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        height: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fa9494',
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
      }}
      text2Style={{
        fontSize: 16,
        color: '#29292E',
      }}
      text2NumberOfLines={10}
    />
  ),
};
