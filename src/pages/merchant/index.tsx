import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { commonStyle } from '../../components/styles/common-style'
import { headerStyle } from '../../components/styles/header-style';
import { footerStyle } from '../../components/styles/footer-style';

import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { FilterModel } from '../../model/filter-model';
import { MerchantModel } from '../../model/merchant-model';

import { getMerchant } from '../../services/merchant-service';

const PageMerchant = () => {
    const navigation = useNavigation();    
    const APP_NAME = process.env.APP_NAME;

    const [filterList, setFilterList] = useState<FilterModel[]>([]);
    const [filterSelected, setFilterSelected] = useState<number>();
    const [merchantList, setMerchantList] = useState<MerchantModel[]>([]);

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

      loadFilter();
    }, []);    

    useEffect(() => {
      async function loadMerchant() {
        const merchantListTemp = await getMerchant();
        setMerchantList(merchantListTemp);
      }
  
      loadMerchant();
    }, []);

    function handleNavigateMenu(){
      navigation.navigate("Menu");
    }

    function handleNavigateHome(){
      navigation.navigate("PageMerchant");
    }

    function handleFilter(item: FilterModel){
      if (item!==undefined){
        setFilterSelected(item.id);
      }
    }

    function handleMerchant(item: MerchantModel){
      navigation.navigate("PageMerchantDetail", item);
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
          {merchantList.length > 0 ? 
          (
            <FlatList
            data={merchantList.sort((a, b) => a.id.toString().localeCompare(b.id.toString()))}
            horizontal={false}
            style={{
              paddingTop: 8,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 0,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleMerchant(item)}
              >
                <View
                  style={{
                    maxHeight: 150,
                    minHeight: 150,
                    borderRadius: 14,
                    borderTopLeftRadius: 0,
                    backgroundColor: "#ffffff",
                    marginBottom:16,
                    padding: 10,
                  }}
                >
                  <View
                      style={{
                        flex:1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                    <View>
                      <Text style={commonStyle.merchantListTitle}>{item.name}</Text>
                      <Text style={commonStyle.merchantListDescription}>{item.address}</Text>
                      <Text style={commonStyle.merchantListDescription}><FontAwesome name="location-arrow" color="#3c3c3c" size={12}></FontAwesome> {item.distance} metros</Text>
                      <Text style={commonStyle.merchantListDescription}><FontAwesome name="users" color="#3c3c3c" size={12}></FontAwesome> {Math.round(item.capacity / 4 * 1.5)} de {item.capacity}</Text>
                      <View>
                        <View style={{minHeight:12, maxHeight:12, flex: 1, flexDirection: 'row' }}>
                          {
                            item.price >= 1 ?
                            (
                              <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2}}></FontAwesome>                              
                            ) : null
                          }
                          {
                            item.price >= 2 ?
                            (
                              <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2}}></FontAwesome>                              
                            ) : null
                          }
                          {
                            item.price >= 3 ?
                            (
                              <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2}}></FontAwesome>                              
                            ) : null
                          }
                          {
                            item.price >= 4 ?
                            (
                              <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2}}></FontAwesome>                              
                            ) : null
                          }
                          {
                            item.price >= 5 ?
                            (
                              <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2}}></FontAwesome>                              
                            ) : null
                          }                                                                              
                        </View>
                      </View>
                    </View>
                    <View style={{minWidth: 80, maxWidth:80, minHeight:80, maxHeight:80, }}>
                      <Image style={commonStyle.merchantLogo} source={{uri: item.logo }}/>
                      <Text style={commonStyle.merchantListCategory}>{item.category}</Text>
                      <View style={{minHeight:12, maxHeight:12, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesome name="star" color={item.evaluation >= 1 ? "#faae02" : "#cccccc"} size={12}></FontAwesome>
                        <FontAwesome name="star" color={item.evaluation >= 2 ? "#faae02" : "#cccccc"} size={12}></FontAwesome>
                        <FontAwesome name="star" color={item.evaluation >= 3 ? "#faae02" : "#cccccc"} size={12}></FontAwesome>
                        <FontAwesome name="star" color={item.evaluation > 4 ? "#faae02" : "#cccccc"} size={12}></FontAwesome>
                        <FontAwesome name="star" color={item.evaluation > 5 ? "#faae02" : "#cccccc"} size={12}></FontAwesome>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          >                  
          </FlatList>            
          ) : 
          (
            <View style={commonStyle.loadingBox}>
              <View>
                <ActivityIndicator>                
                </ActivityIndicator>
                <Text style={commonStyle.loadingText}>aguarde...</Text>
              </View>
            </View>
          )
          }
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
                  onPress={() => alert('Pressed!')}
                >
                  <Text style={{opacity: 0.5, paddingTop: 3}}>
                    <FontAwesome name="gift" size={40}></FontAwesome>
                  </Text>                
                </TouchableOpacity>
              </View>
              <View style={footerStyle.footerItem}>
                <TouchableOpacity
                  onPress={() => alert('Pressed!')}
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

  export default PageMerchant;