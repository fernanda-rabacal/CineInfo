import { Dispatch, SetStateAction, useEffect } from 'react';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer from 'react-native-youtube-iframe';
import { CaretLeft } from 'phosphor-react-native';

interface TrailerVideoProps {
  trailerKey: string;
  visible: boolean;
  onChangeVisible: Dispatch<SetStateAction<boolean>>;
}

export function TrailerVideo({
  trailerKey,
  visible,
  onChangeVisible,
}: TrailerVideoProps) {
  const windowHeigth = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (visible) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }, [visible]);

  /* useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
  }, [trailerKey])); */

  return (
    <Modal visible={visible} onRequestClose={() => onChangeVisible(false)}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}
        onPress={() => onChangeVisible(false)}>
        <CaretLeft color="#fff" />
      </TouchableOpacity>
      <YoutubePlayer
        height={windowWidth}
        width={windowHeigth}
        play={false}
        videoId={trailerKey}
      />
    </Modal>
  );
}
