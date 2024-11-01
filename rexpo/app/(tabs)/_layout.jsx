import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'
import { icons } from '../../constants';

const TabIcon = ({color, focused, icon, name}) => {
    return (
        <View>
            <Image
             source={icon}
             resizeMode= "contain"
             tintColor={color}
             className="w-6 h-6"
              />
              <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
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