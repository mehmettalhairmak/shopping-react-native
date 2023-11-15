import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const CustomTabBar = (props: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {props.state.routes.map((route, index) => {
        let iconName: string = 'home';
        const isFocused = props.state.index === index;

        switch (route.name) {
          case 'ProductListScreen':
            if (isFocused) {
              iconName = 'home';
            } else {
              iconName = 'home-outline';
            }
            break;
          case 'FavoritesListScreen':
            if (isFocused) {
              iconName = 'bookmark';
            } else {
              iconName = 'bookmark-outline';
            }
        }

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.navigationButton}>
            <IoniconsIcon name={iconName} size={30} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(9),
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  navigationButton: {
    alignItems: 'center',
    marginTop: hp(1),
  },
});
