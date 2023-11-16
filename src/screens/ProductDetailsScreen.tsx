import React, { useMemo } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootRouteProps, RootStackParams } from '../services/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ProductDetailsScreen = () => {
  const route = useRoute<RootRouteProps<'ProductDetailsScreen'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const currentProductIndex = route.params.products.findIndex(
    product => product.id === route.params.productId,
  );

  const selectedProduct = route.params.products[Number(currentProductIndex)];

  const navigateToNextProduct = () => {
    const nextProductIndex =
      (currentProductIndex + 1) % route.params.products.length;
    const nextProductId = route.params.products[nextProductIndex].id;
    navigation.push('ProductDetailsScreen', {
      productId: nextProductId,
      products: route.params.products,
    });
  };

  const navigateToPrevProduct = () => {
    const prevProductIndex =
      (currentProductIndex - 1 + route.params.products.length) %
      route.params.products.length;
    const prevProductId = route.params.products[prevProductIndex].id;
    navigation.push('ProductDetailsScreen', {
      productId: prevProductId,
      products: route.params.products,
    });
  };

  const discountedPrice = useMemo((): string => {
    const discounted =
      selectedProduct.price -
      (selectedProduct.price * selectedProduct.discountPercentage) / 100;
    return discounted.toFixed(2);
  }, [selectedProduct]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardContainer}>
          <Carousel
            width={wp(90)}
            height={hp(40)}
            data={selectedProduct.images}
            renderItem={({ index }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: selectedProduct.images[index] }}
                  style={{ resizeMode: 'contain' }}
                  width={wp(88)}
                  height={hp(40)}
                />
              </View>
            )}
          />
          <View style={{ marginLeft: hp(1) }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={styles.titleText}>{selectedProduct.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IoniconsIcon
                  name="star"
                  color={'orange'}
                  size={hp(3)}
                  style={{ marginRight: hp(0.5) }}
                />
                <Text
                  style={{ fontSize: 16, fontFamily: 'JetBrainsMono-Regular' }}>
                  {selectedProduct.rating} Rating!
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.descriptionText,
                { marginHorizontal: hp(0.4), marginTop: hp(2) },
              ]}>
              {selectedProduct.description}
            </Text>
            <View
              style={{
                marginBottom: hp(2),
                marginTop: hp(2),
              }}>
              <Text style={styles.priceText}>{'$' + discountedPrice}</Text>
              <Text style={styles.discountText}>
                %{selectedProduct.discountPercentage} Discounted!
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => navigateToPrevProduct()}>
                <IoniconsIcon name="chevron-back-outline" size={hp(3)} />
                <Text>Prev Product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}
                onPress={() => navigateToNextProduct()}>
                <IoniconsIcon name="chevron-forward-outline" size={hp(3)} />
                <Text>Next Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  cardContainer: {
    flex: 1,
    paddingTop: hp(2),
    paddingBottom: hp(2),
    marginHorizontal: hp(2),
    marginTop: hp(2),
    borderRadius: hp(1.6),
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 25,
    marginHorizontal: hp(0.4),
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Regular',
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'JetBrainsMono-Regular',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Regular',
  },
  discountText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF0000',
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default ProductDetailsScreen;
