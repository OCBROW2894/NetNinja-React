// Import necessary components and utilities
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'
import { icons } from '../../constants';

// Custom TabIcon component to render each tab's icon and label
const TabIcon = ({color, focused, icon, name}) => {
    return (
        <View className="flex items-center justify-center gap-2">
            <Image
             source={icon}
             resizeMode="contain"
             tintColor={color}  // Changes the icon color based on tab state
             className="w-6 h-6"
              />
              <Text 
                numberOfLines={1}  // Limits text to single line
                ellipsizeMode="tail"  // Adds ... if text is too long
                // Changes font weight based on whether tab is focused
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-center`} 
                style={{
                    color: color,  // Applies active/inactive color
                    minWidth: 60,  // Ensures minimum width for text
                    textAlign: 'center'
                }}
              >
                {name}
              </Text>
        </View>
    );
};

// Main tab navigation layout component
const TabsLayout = () => {
  return (
    <>
      <Tabs
      // Global configuration for all tabs
      screenOptions={{
        tabBarShowLabel: false,  // Hides default tab labels
        tabBarActiveTintColor:'#FFA001',    // Color when tab is active (orange)
        tabBarInactiveTintColor: '#CDCDE0', // Color when tab is inactive (grey)
        tabBarStyle: {
            backgroundColor: '#161622',  // Dark background for tab bar
            borderTopWidth: 1,
            borderTopColor: '#232533',   // Subtle border at top of tab bar
            height: 50,
        }
      }}
      >
        {/* Home Tab Configuration */}
        <Tabs.Screen
         name="home" 
         options={{
          headerShown: false,  // Hides the header
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

          {/* Bookmark Tab Configuration */}
          <Tabs.Screen
              name="bookmark"
              options={{
                  headerShown: false,
                  title: "Bookmark",
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

          {/* Create Post Tab Configuration */}
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

          {/* Profile Tab Configuration */}
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

export default TabsLayout;