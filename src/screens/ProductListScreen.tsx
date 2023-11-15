import React, { useEffect, useMemo, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import { ProductModelRoot } from '../models/ProductModel';
import { getProducts } from '../services/api/apiGetProducts';
import CategoryFilterButton from '../components/CategoryFilterButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductCard from '../components/ProductCard';

const ProductListScreen = () => {
  const [products, setProducts] = useState<ProductModelRoot>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  //Fetch products, initial load
  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      setProducts(response);
    }
    fetchData();
  }, []);

  //Category filtering function
  const categoryFiltering = (item: string): void => {
    if (selectedCategory === item) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(item);
    }
  };

  //Category list generator function
  const generatedCategories = useMemo(() => {
    const categories: string[] = [];
    products?.products?.forEach(product => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  }, [products]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ marginHorizontal: 20, marginTop: 30 }}>
        <Text style={styles.mainTitle}>Explore</Text>
        <Text style={styles.subTitle}>Best shopping collection!</Text>
      </View>
      {/* Category List */}
      <View>
        <FlatList
          horizontal
          data={generatedCategories}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.categoryItemContainer,
                {
                  marginLeft: index === 0 ? 20 : 0,
                  marginRight:
                    index === generatedCategories.length - 1 ? 20 : 0,
                },
              ]}>
              <CategoryFilterButton
                category={item}
                selectedCategory={selectedCategory}
                onPress={() => categoryFiltering(item)}
              />
            </View>
          )}
        />
      </View>
      {/* Product List */}
      <FlatList
        data={products?.products}
        style={{ flex: 1 }}
        numColumns={2}
        contentContainerStyle={{ marginTop: 20, gap: 20, marginBottom: 20 }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => {
          if (selectedCategory === null) {
            return (
              <ProductCard
                product={item}
                itemIndex={index}
                listCount={products?.products.length!}
              />
            );
          } else if (selectedCategory === item.category) {
            return (
              <ProductCard
                product={item}
                itemIndex={index}
                listCount={products?.products.length!}
              />
            );
          } else {
            return null;
          }
        }}
      />
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
  categoryList: {
    gap: 20,
  },
  categoryItemContainer: {
    height: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductListScreen;
