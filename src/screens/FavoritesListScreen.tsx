import React from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  removeFavoriteProduct,
  selectFavoriteProductList,
} from '../services/redux/slices/favoriteProductListSlice';
import ProductCard from '../components/ProductCard';

const FavoritesListScreen = () => {
  const favoritedProducts = useAppSelector(
    selectFavoriteProductList,
  ).favoriteProductList;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ marginHorizontal: 20, marginTop: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.mainTitle}>Favorites</Text>
        </View>
        <Text style={styles.subTitle}>Best shopping collection!</Text>
      </View>
      {/* Product List */}
      <FlatList
        data={favoritedProducts}
        style={{ flex: 1 }}
        numColumns={2}
        contentContainerStyle={{ marginTop: 20, gap: 20, marginBottom: 20 }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <ProductCard
            product={item}
            itemIndex={index}
            listCount={favoritedProducts?.length!}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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

export default FavoritesListScreen;
