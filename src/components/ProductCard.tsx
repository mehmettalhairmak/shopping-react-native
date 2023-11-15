import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../models/ProductModel';
import Carousel from 'react-native-reanimated-carousel';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ProductCardProps {
  product: Product;
  itemIndex: number;
  listCount: number;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, itemIndex, listCount }) => {
    return (
      <View
        style={[
          styles.container,
          {
            marginBottom:
              itemIndex === listCount - 1 || itemIndex === listCount - 2
                ? 30
                : 0,
          },
        ]}>
        <View style={styles.favoriteIconContainer}>
          <IoniconsIcon
            size={hp(3)}
            name="bookmark-outline"
            style={{ paddingRight: hp(1.2), paddingTop: hp(1.2) }}
          />
        </View>
        <Carousel
          width={hp(20)}
          height={hp(25)}
          data={product.images}
          renderItem={({ index }) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.images[index] }}
                style={{ resizeMode: 'contain' }}
                width={hp(18)}
                height={hp(25)}
              />
            </View>
          )}
        />
        <Text style={styles.priceText}>{'$' + product.price}</Text>
        <Text style={styles.titleText}>{product.title}</Text>
      </View>
    );
  },
);

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    marginHorizontal: 5,
    borderRadius: hp(1.6),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  favoriteIconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'JetBrainsMono-Regular',
  },
  titleText: {
    color: '#797780',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Regular',
  },
});
