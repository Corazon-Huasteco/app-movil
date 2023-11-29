import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { StoreStackScreen, HomeStackScreen, ArticlesStackScreen, SavedStackScreen } from './stackNav';


const Tab = createMaterialBottomTabNavigator();


export default function Navigation() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Incio"
        // activeColor="#e91e63"
        // activeColor="#e91e63"
        // barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Articulos"
          component={ArticlesStackScreen}
          options={{
            tabBarLabel: 'Artículos',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="text-box" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Guardados"
          component={SavedStackScreen}
          options={{
            tabBarLabel: 'Guardados',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bookmark" color={color} size={26} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Tienda"
          component={StoreStackScreen}
          options={{
            tabBarLabel: 'Tienda',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="shopping" color={color} size={26} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

