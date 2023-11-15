import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CategoryFilterButtonProps {
  category: string;
  selectedCategory: string | null | undefined;
  onPress: () => void;
}

const CategoryFilterButton: React.FC<CategoryFilterButtonProps> = memo(
  ({ category, selectedCategory, onPress }) => {
    const capitalizeFirstLetter = (word: string): string => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const convertToHumanReadable = (categoryName: string): string => {
      let words = categoryName.split('-');
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
        {selectedCategory === category ? (
          <LinearGradient
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#FFB36D', '#FF9D43', '#FF7A00']}>
            <Text style={[styles.text, { color: '#FFF' }]}>
              {convertToHumanReadable(category)}
            </Text>
          </LinearGradient>
        ) : (
          <Text style={styles.text}>{convertToHumanReadable(category)}</Text>
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

export default CategoryFilterButton;
