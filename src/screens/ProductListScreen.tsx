import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../models/ProductModel';
import { getProducts } from '../services/api/apiGetProducts';
import CategoryFilterButton from '../components/CategoryFilterButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductCard from '../components/ProductCard';
import SortingModal from '../components/SortingModal';

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>();
  const [sortedProducts, setSortedProducts] = useState<Product[] | null>();
  const [sortingModalVisible, setSortingModalVisible] =
    useState<boolean>(false);
  const [selectedSortingMethod, setSelectedSortingMethod] = useState<
    string | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  //Fetch products, initial load
  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      setProducts(response.products);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (products !== undefined && products !== null) {
      console.log('listener 1');
      console.log(products);
      setSortedProducts(products!);
    }
  }, [products]);

  //Category filtering function
  const categoryFiltering = (item: string): void => {
    if (selectedCategory === item) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(item);
    }
  };

  const sortingAlgorithm = (
    type: 'price' | 'rating',
    sortMethod: 'toLow' | 'toHigh',
  ): Product[] | null => {
    const sortedArray = products?.sort((a, b) => {
      let paramA: number = 0;
      let paramB: number = 0;
      if (type === 'price') {
        paramA = a.price;
        paramB = b.price;
      } else {
        paramA = a.rating;
        paramB = b.rating;
      }
      if (sortMethod === 'toHigh') {
        if (paramA < paramB) {
          return -1;
        }
        if (paramA > paramB) {
          return 1;
        }

        // names must be equal
        return 0;
      } else {
        if (paramA > paramB) {
          return -1;
        }
        if (paramA < paramB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    });
    return sortedArray!;
  };

  //Category list generator function
  const generatedCategories = useMemo(() => {
    const categories: string[] = [];
    products?.forEach(product => {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.mainTitle}>Explore</Text>
          <TouchableOpacity
            onPress={() => setSortingModalVisible(!sortingModalVisible)}>
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
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
        data={sortedProducts}
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
                listCount={products?.length!}
              />
            );
          } else if (selectedCategory === item.category) {
            return (
              <ProductCard
                product={item}
                itemIndex={index}
                listCount={products?.length!}
              />
            );
          } else {
            return null;
          }
        }}
      />

      {/* Sorting Modal */}
      <SortingModal
        open={sortingModalVisible}
        selected={selectedSortingMethod}
        onPress={item => {
          let sorted = sortedProducts;
          console.log(item);
          switch (item) {
            case 'price_low-to-high':
              sorted = sortingAlgorithm('price', 'toHigh');
              break;
            case 'price_high-to-low':
              sorted = sortingAlgorithm('price', 'toLow');
              break;
            case 'rating_asc':
              sorted = sortingAlgorithm('rating', 'toHigh');
              break;
            case 'rating_desc':
              sorted = sortingAlgorithm('rating', 'toLow');
              break;
          }
          setSelectedSortingMethod(item);
          if (sorted !== null) {
            setSortedProducts(sorted);
          } else {
            setSortedProducts(null);
            setSortedProducts(products!);
          }
          setSortingModalVisible(!sortingModalVisible);
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
