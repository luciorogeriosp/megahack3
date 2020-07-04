import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PageMerchant from './pages/merchant/index';
import PageMerchantDetail from './pages/merchant/detail';
import PageCheckoutCart from './pages/checkout/cart';

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
                <AppStack.Screen name="PageMerchantDetail" component={PageMerchantDetail} />
                <AppStack.Screen name="PageCheckoutCart" component={PageCheckoutCart} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
