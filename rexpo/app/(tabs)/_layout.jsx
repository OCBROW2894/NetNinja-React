import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'
import { icons } from '../../constants';

const TabIcon = ({color, focused, icon, name}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
             source={icon}
             resizeMode="contain"
             tintColor={color}
             className="w-6 h-6"
              />
              <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}} >{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,
          tabBarActiveTintColor:'#FFA001',
          tabBarInactiveTintColor: '#CDCDEO',
          tabBarStyle: {
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderTopColor: '#232533',
              height: 60,
          }
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

          <Tabs.Screen
              name="bookmark"
              options={{
                  headerShown: false,
                  title: 'Bookmark',
                  tabBarIcon: ({color, focused}) => (
                      <TabIcon
                          color={color}
                          focused={focused}
                          icon={icons.bookmark}
                          name="Bookmark"
                      />
                  ),
              }}
          />

          <Tabs.Screen
              name="create"
              options={{
                  headerShown: false,
                  title: 'Create',
                  tabBarIcon: ({color, focused}) => (
                      <TabIcon
                          color={color}
                          focused={focused}
                          icon={icons.plus}
                          name="Create"
                      />
                  ),
              }}
          />

          <Tabs.Screen
              name="profile"
              options={{
                  headerShown: false,
                  title: 'Profile',
                  tabBarIcon: ({color, focused}) => (
                      <TabIcon
                          color={color}
                          focused={focused}
                          icon={icons.profile}
                          name="Profile"
                      />
                  ),
              }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout