import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { Product } from '../../models/ProductModel';

export type RootRouteProps<RouteName extends keyof RootStackParams> = RouteProp<
  RootStackParams,
  RouteName
>;

export type TabRouteProps<RouteName extends keyof BottomTabParams> = RouteProp<
  BottomTabParams,
  RouteName
>;

export type RootStackParams = {
  TabNavigation: NavigatorScreenParams<BottomTabParams>;
  ProductDetailsScreen: {
    products: Product[];
    productId: number;
  };
};

export type BottomTabParams = {
  ProductListScreen: {};
  FavoritesListScreen: {};
};
