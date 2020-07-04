import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { commonStyle } from '../../components/styles/common-style'

const PageDashboard = () => {
    const navigation = useNavigation();    
    const APP_NAME = process.env.APP_NAME;

    useEffect(() => {

    }, []);    

    function handleNavigateMenu(){
      navigation.navigate("Menu");
    }

    return (        
        <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigateMenu}>          
            <Image source={require('../../../assets/icon.png')} style={{width: 300, height: 300, alignSelf: 'center'}}></Image>                  
            <View>
              <View style={[commonStyle.rowFull]}>
                <Text style={[styles.title, commonStyle.middleText]}>
                  Minha Esquina
                </Text>
              </View>                
            </View>        
          </TouchableOpacity>
        </View>
      );     
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding:16,
    },
  
    title: {
      color: '#322153',
      fontSize: 30,
      fontFamily: 'Ubuntu_400Regular',      
    },
  
    titleApp: {
      color: '#322153',
      fontSize: 30,
      fontFamily: 'Ubuntu_700Bold',  
    },

    titleAppName: {
      color: '#322153',
      fontSize: 40,
      fontFamily: 'Ubuntu_700Bold',  
    },

  });   

  export default PageDashboard;