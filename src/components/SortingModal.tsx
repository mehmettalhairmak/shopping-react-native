import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const SortingModal = ({
  open,
  selected,
  onPress,
}: {
  open: boolean;
  selected: string | null;
  onPress: (item: string | null) => void;
}) => {
  const sortOpinions = [
    {
      id: 1,
      param: 'price_low-to-high',
      name: 'Price - Low to High',
    },
    {
      id: 2,
      param: 'price_high-to-low',
      name: 'Price - High to Low',
    },
    {
      id: 3,
      param: 'rating_asc',
      name: 'Rating - (Asc)',
    },
    {
      id: 4,
      param: 'rating_desc',
      name: 'Rating - (Desc)',
    },
  ];

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            data={sortOpinions}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    selected !== item.param
                      ? onPress(item.param)
                      : onPress(null)
                  }>
                  <Text style={styles.modalText}>Sort By: {item.name}</Text>
                </TouchableOpacity>
                {selected === item.param && (
                  <IoniconsIcon
                    name="checkmark-circle"
                    size={20}
                    color={'orange'}
                  />
                )}
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 35,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 15,
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default SortingModal;
