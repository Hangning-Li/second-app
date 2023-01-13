import * as React from 'react';

// SVG Files
import * as Svgs from '../svgs';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import TeamScreen from './screens/TeamScreen';
import ActivityScreen from './screens/ActivityScreen';

// Screen names
const homeName = 'Home';
const teamName = 'Team';
const activityName = "Activity";

const Tab = createBottomTabNavigator();

export default function MainConatiner() {

    return (
        <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={homeName}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            let rn = route.name;

                            if (rn === homeName) {
                                if (iconName = focused) {
                                    return (<View><Svgs.NavBarHome /></View>);
                                } else {
                                    return (<View><Svgs.NavBarHomeInactive /></View>);
                                }

                            } else if (rn === teamName) {
                                if (iconName = focused) {
                                    return (<View><Svgs.NavBarTeam /></View>);
                                } else {
                                    return (<View><Svgs.NavBarTeamInactive /></View>);
                                }

                            } else if (rn === activityName) {
                                if (iconName = focused) {
                                    return (<View><Svgs.NavBarActivityGeneralTransport /></View>);
                                } else {
                                    return (<View><Svgs.NavBarActivityGeneralTransportInactive /></View>);
                                }
                            }
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'grey',
                        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                        tabBarStyle: { padding: 10, height: 100 }

                    })}
                >

                    <Tab.Screen name={homeName} component={HomeScreen} />
                    <Tab.Screen name={teamName} component={TeamScreen} />
                    <Tab.Screen name={activityName} component={ActivityScreen} />

                </Tab.Navigator>
        </NavigationContainer>
    );
}
