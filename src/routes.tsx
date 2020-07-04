import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/login';
import PageDashboard from './pages/dashboard/index';
import PageMerchant from './pages/merchant/index';

const AppStack = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5',
                    }
                }}
            >
                <AppStack.Screen name="PageMerchant" component={PageMerchant} />
                <AppStack.Screen name="PageDashboard" component={PageDashboard} />
                <AppStack.Screen name="Login" component={Login} />                
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;