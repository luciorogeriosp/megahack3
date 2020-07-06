import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, ListView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { commonStyle } from '../../components/styles/common-style'
import { headerStyle } from '../../components/styles/header-style';
import { footerStyle } from '../../components/styles/footer-style';

import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { FilterModel } from '../../model/filter-model';
import { OrderModel } from '../../model/order-model';

interface ParamsMerchant {
  id: number;
}

const PageEvaluateConfirm = () => {
    const navigation = useNavigation();    
    const route = useRoute();

    const APP_NAME = process.env.APP_NAME;

    const [filterList, setFilterList] = useState<FilterModel[]>([]);
    const [order, setOrder] = useState<OrderModel>(new OrderModel());
    const [filterSelected, setFilterSelected] = useState<number>();
    const [filterLoaded, setFilterLoaded] = useState<boolean>(false);

    useEffect(() => {
      async function loadFilter() {
        const filterListTemp: Array<FilterModel> = [];
        filterListTemp.push(new FilterModel(1, 'Distância'));
        filterListTemp.push(new FilterModel(2, 'Pontuação'));
        filterListTemp.push(new FilterModel(3, 'Lotação'));
        filterListTemp.push(new FilterModel(4, 'Preço'));
        setFilterList(filterListTemp);
        
        setFilterSelected(1);        
      }

      loadFilter().then(()=> {
        setFilterLoaded(true);
      });      
    }, []);  
    
    useEffect(() => {
      async function setFromParam() {      
        setOrder(route.params as OrderModel);
      }      

      setFromParam();      
    }, [order]);      


    function handleNavigateHome(){
      navigation.navigate("PageMerchant");
    }

    function handleClub(){
      navigation.navigate("PageClub");
    }

    function handleProfile(){
      navigation.navigate("PageProfile");
    }
    
    function handleFilter(item: FilterModel){
      if (item!==undefined){
        setFilterSelected(item.id);
        if (filterLoaded === true){
          handleNavigateHome();
        }
      }
    }

    return (        
        <View style={{flex: 1}}>
          <View style={headerStyle.header}>
            <View style={headerStyle.headerItems}>
              <View style={{height: 50, paddingTop: 10}}>
                <Text style={headerStyle.headerAdress}>
                  <FontAwesome name="location-arrow" color="#fff" size={12}></FontAwesome> 
                  &nbsp;Rua Domingos Barbieri, 54
                </Text>
                <Text style={headerStyle.headerAdress}>
                  Itu/SP
                </Text>
              </View>
              <View style={{width: 20, height: 50}}>

              </View>
              <View style={{height: 50, width: 200, paddingTop: 0}}>
                <RNPickerSelect
                    style={{
                      placeholder: {
                        color: '#fff', 
                        fontSize: 12,
                        fontFamily: 'Roboto_400Regular',},
                      inputIOS: { 
                        color: '#fff', 
                        fontSize: 12,
                        fontFamily: 'Roboto_400Regular',},
                      inputAndroid: { 
                        color: '#fff', 
                        fontSize: 12,
                        fontFamily: 'Roboto_400Regular',},
                    }}                                    
                    placeholder={{ label: "Seleção" }}
                    onValueChange={(filterItem) => handleFilter(filterItem)}
                    items={filterList.map(item => (
                      { label: item.name, value: item.id }
                    ))}  
                    value={filterSelected}                  
                  />  
              </View>              
            </View>
          </View>
          <View
            style={{
              paddingTop: 8,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 0,
              minHeight: 55, 
              maxHeight: 55,     
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.6,                       
            }}
          >
        
            <View style={{
              minHeight: 54, 
              maxHeight: 54,
            }}>
              <View style={{
                alignItems: 'center'
              }}>
                <Text style={commonStyle.evaluateThanks}>Prontinho</Text>
              </View>       
            </View>                               
          </View>
          <ScrollView>
            <View
              style={{
                marginBottom:16,
                marginLeft: 16,
                marginRight: 16,
                padding: 10,  
                marginTop: 0,    

              }}
            >
              <View style={{minHeight:90, maxHeight:90, flex: 1, flexDirection: 'row',}}>
                <View style={{marginRight: 10, }}>
                  <Image style={commonStyle.evaluateOK} source={require('../../../assets/icon/icon-ok.png')}></Image>                  
                </View>
                <View style={{paddingRight: 60}}>
                  <Text style={commonStyle.evaluateThanksTitle}>10 pontos creditados no</Text>                  
                  <Text style={commonStyle.evaluateThanksTitle}>Clube de Vantagens!</Text>
                  <Text style={commonStyle.evaluateThanksTitle}>Total de pontos: 1200</Text>
                </View>
              </View>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}>
                <View
                  style={{
                    borderRadius: 14,                  
                    backgroundColor: "#ffffff",
                    padding: 16,
                    marginBottom: 16,   
                    marginTop: 5,
                    marginRight: 10,
                    minHeight: 180                  
                  }}
                >
                  <View>
                    <Image style={commonStyle.providerImage} source={require('../../images/logo.png')}></Image>
                  </View>
                </View>   
                <View
                  style={{
                    borderRadius: 14,                  
                    backgroundColor: "#ffffff",
                    padding: 16,
                    marginBottom: 16,   
                    marginTop: 5,
                    marginRight: 10,
                    minHeight: 180                      
                  }}
                >
                  <View>
                    <Image style={commonStyle.providerImage} source={{uri:order.merchant.logo}}></Image>
                  </View>
                </View>  
              </View>                   
              <Text style={commonStyle.evaluateTitle}>
                Obrigado por utilizar o Minha Esquina, agradecemos a preferência!
              </Text>
            </View>
          </ScrollView>         
          <View style={footerStyle.footer}>
            <View style={footerStyle.footerItems}>
              <View style={footerStyle.footerItem}>
                <TouchableOpacity
                  onPress={() => handleNavigateHome()}
                >
                  <Text style={{opacity: 0.5, paddingTop: 2}}>
                    <FontAwesome name="home" size={42}></FontAwesome>
                  </Text>                
                </TouchableOpacity>
              </View>
              <View style={footerStyle.footerItem}>
                <TouchableOpacity
                  onPress={() => handleClub()}
                >
                  <Text style={{opacity: 0.5, paddingTop: 3}}>
                    <FontAwesome name="gift" size={40}></FontAwesome>
                  </Text>                
                </TouchableOpacity>
              </View>
              <View style={footerStyle.footerItem}>
                <TouchableOpacity
                  onPress={() => handleProfile()}
                >
                  <Text style={{opacity: 0.5, paddingTop: 3}}>
                    <FontAwesome name="user" size={40}></FontAwesome>
                  </Text>                
                </TouchableOpacity>
              </View>
            </View>
          </View>
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

  export default PageEvaluateConfirm;