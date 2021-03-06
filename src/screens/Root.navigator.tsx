import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/* Components */
import {BottomTabNavigator} from './BottomTabs.navigator';
import {StoryDetailsModal} from './StoryDetailsModal.screen';

/* Types */
import {RootStackParamList} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="StoryDetailsModal"
        component={StoryDetailsModal}
        options={({route}) => ({
          presentation: 'modal',
          title: route.params.title,
        })}
      />
    </RootStack.Navigator>
  );
};
