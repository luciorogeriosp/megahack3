import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PageMerchant from './pages/merchant/index';
import PageMerchantDetail from './pages/merchant/detail';
import PageCheckoutCart from './pages/checkout/cart';
import PageOrder from './pages/checkout/order';
import PageEvaluate from './pages/checkout/evaluate';
import PageEvaluateConfirm from './pages/checkout/evaluate-confirm';
import PageClub from './pages/club/index';

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
                <AppStack.Screen name="PageOrder" component={PageOrder} />
                <AppStack.Screen name="PageEvaluate" component={PageEvaluate} />
                <AppStack.Screen name="PageEvaluateConfirm" component={PageEvaluateConfirm} />
                <AppStack.Screen name="PageClub" component={PageClub} />
                
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
