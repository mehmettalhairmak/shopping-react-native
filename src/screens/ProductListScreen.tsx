import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';

const ProductListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.mainTitle}>Explore</Text>
        <Text style={styles.subTitle}>Best shopping collection!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Regular',
  },
  subTitle: {
    fontSize: 18,
    color: '#797780',
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default ProductListScreen;
