import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useAppSelector } from '../hooks/redux';
import { selectSelectedProduct } from '../services/redux/slices/selectedProductSlice';

const ProductDetailsScreen = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct).selectedProduct;

  return (
    <View style={styles.container}>
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
          <Text style={styles.titleText}>{selectedProduct.title}</Text>
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
            <Text style={styles.priceText}>{'$' + selectedProduct.price}</Text>
            <Text style={styles.discountText}>
              %{selectedProduct.discountPercentage} Discounted!
            </Text>
          </View>
        </View>
      </View>
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
    marginVertical: hp(6),
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
