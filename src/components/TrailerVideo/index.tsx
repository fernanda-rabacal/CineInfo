import { Dispatch, SetStateAction, useEffect } from "react";
import { Dimensions, Modal, TouchableOpacity } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import YoutubePlayer from "react-native-youtube-iframe";
import { CaretLeft } from "phosphor-react-native";

interface TrailerVideoProps {
  trailerKey: string;
  visible: boolean;
  onChangeVisible: Dispatch<SetStateAction<boolean>>  
}

export function TrailerVideo({ trailerKey, visible, onChangeVisible }:TrailerVideoProps) {
  const windowHeigth = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width

  useEffect(() => {
    if(visible) {
      changeOrientation(ScreenOrientation.OrientationLock.LANDSCAPE)
    } else {
      changeOrientation(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }, [visible])

  console.log(trailerKey)
  
  const changeOrientation = async (newOrientation) => {
    await ScreenOrientation.lockAsync(newOrientation);
  };

  /* useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
  }, [trailerKey])); */

  return (
    <Modal visible={visible}>
      <TouchableOpacity 
          style={
            { position: 'absolute', top: 20, left: 20, zIndex: 10}}
          onPress={() => onChangeVisible(false)}>
          <CaretLeft color="#fff" />
      </TouchableOpacity>
      <YoutubePlayer
        height={windowWidth}
        width={windowHeigth}
        play={true}
        videoId={trailerKey}
      />
    </Modal>
  );
}