import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const CustomHeader = (props: NativeStackHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <IoniconsIcon name="chevron-back-outline" size={hp(3)} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Details</Text>
      <IoniconsIcon name="bookmark-outline" size={hp(3)} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: hp(12),
    paddingHorizontal: hp(2),
    alignItems: 'flex-end',
    marginBottom: hp(2),
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Regular',
  },
});
