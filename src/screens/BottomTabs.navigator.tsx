import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* Screens */
import {HomeScreen} from './Home.screen';
import {BookmarksScreen} from './Bookmarks.screen';

/* Types */
import {BottomTabParamList} from '../types';

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={HomeScreen} />
      <BottomTabs.Screen name="Bookmarks" component={BookmarksScreen} />
    </BottomTabs.Navigator>
  );
};
