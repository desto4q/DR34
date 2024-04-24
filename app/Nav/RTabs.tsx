import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {AiFillHeart, AiFillHome, AiOutlineSearch, AiOutlineSetting} from 'rn-icons/ai';
import {colors, tw} from '../exports/exports';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SavedScreen from '../screens/SavedScreen';

let Tabs = createBottomTabNavigator();
let f_State = (e: boolean) => tw(e ? 'opacity-100' : 'opacity-50');
export default function RTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {...tw('absolute m-2 rounded-md  border-t-0 h-14')},
      }}>
      <Tabs.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiFillHome
                style={{...f_State(focused)}}
                fill={focused ? colors.yellow[500] : colors.gray[500]}
                size={24}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiOutlineSearch
                style={{...f_State(focused)}}
                fill={focused ? colors.yellow[500] : colors.gray[500]}
                size={24}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiOutlineSetting
                style={{...f_State(focused)}}
                fill={focused ? colors.yellow[500] : colors.gray[500]}
                size={24}
              />
            );
          },
        }}
      />
       <Tabs.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiFillHeart
                style={{...f_State(focused)}}
                fill={focused ? colors.yellow[500] : colors.gray[500]}
                size={24}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
}
