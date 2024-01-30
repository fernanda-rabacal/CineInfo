import { CaretDown, CaretLeft, Circle } from 'phosphor-react-native';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ItemProps {
  id: number;
  name: string;
}

export function Select({ options, onChangeSelect, title }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(1);
  const [text, setText] = useState(options[0].name);

  function renderOption(item: ItemProps) {
    return (
      <TouchableOpacity
        style={[
          styles.optionContainer,
          item.id === selected && { backgroundColor: '#2d2540' },
        ]}
        onPress={() => {
          onChangeSelect(item.id);
          setSelected(item.id);
          setText(item.name);
          setModalVisible(false);
        }}>
        <Text
          style={[
            styles.optionTitle,
            item.id === selected && { fontFamily: 'Poppins-Bold' },
          ]}>
          {item.name}
        </Text>
        {item.id === selected && (
          <Circle color="#dddddd" size={14} weight="fill" />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.showText}>{text}</Text>
        <CaretDown color="#ccc" size={18} weight="fill" />
      </TouchableOpacity>

      <Modal
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CaretLeft size={26} color="#ccc" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <FlatList
            data={options || []}
            keyExtractor={item => item.id}
            renderItem={({ item }) => renderOption(item)}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
