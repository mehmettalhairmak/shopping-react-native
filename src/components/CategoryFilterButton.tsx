import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface FilterButtonProps {
  filterItem: string;
  selected: string | null | undefined;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = memo(
  ({ filterItem, selected, onPress }) => {
    const capitalizeFirstLetter = (word: string): string => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const convertToHumanReadable = (filterName: string): string => {
      let words = filterName.split('-');
      for (let i = 0; i < words.length; i++) {
        words[i] = capitalizeFirstLetter(words[i]);
      }

      let result = words.join(' ');

      return result;
    };

    return (
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={onPress}>
        {selected === filterItem ? (
          <LinearGradient
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#FFB36D', '#FF9D43', '#FF7A00']}>
            <Text style={[styles.text, { color: '#FFF' }]}>
              {convertToHumanReadable(filterItem)}
            </Text>
          </LinearGradient>
        ) : (
          <Text style={styles.text}>{convertToHumanReadable(filterItem)}</Text>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(7),
    color: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default FilterButton;
