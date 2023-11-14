import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

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
    product: any;
  };
};

export type BottomTabParams = {
  ProductListScreen: {};
  FavoritesListScreen: {};
};
