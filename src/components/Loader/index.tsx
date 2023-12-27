import LottieView from "lottie-react-native";
import { View } from "react-native";
import { styles } from "./styles";

export function Loader() {

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/loader.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
