import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'
import { icons } from '../../constants';

const TabIcon = ({color, focused, icon, name}) => {
    return (
        <View className="items-center justify-center py-2">
            <Image
             source={icon}
             resizeMode="contain"
             tintColor={color}
             className="w-3 h-3"
              />
              <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs mt-1`}>{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
        },
      }}
      >
        <Tabs.Screen
         name="home" 
         options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
           <TabIcon
           color={color}
           focused={focused}
           icon={icons.home}
           name="Home"
           />
          ),
         }}
         />
      </Tabs>
    </>
  )
}

export default TabsLayout