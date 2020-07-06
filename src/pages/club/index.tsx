import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { commonStyle } from '../../components/styles/common-style'
import { headerStyle } from '../../components/styles/header-style';
import { footerStyle } from '../../components/styles/footer-style';

import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { FilterModel } from '../../model/filter-model';

const PageClub = () => {
    const navigation = useNavigation();    
    const APP_NAME = process.env.APP_NAME;

    const [filterList, setFilterList] = useState<FilterModel[]>([]);
    const [filterSelected, setFilterSelected] = useState<number>();

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

    function handleGetOffer(){
      
    }

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
                marginBottom:16,
                marginLeft: 16,
                marginRight: 16,
                padding: 10,  
                marginTop: 0,    
                minHeight:100, 
                maxHeight:100, 
              }}
          >
            <View style={{flex: 1, flexDirection: 'column',}}>
              <Text style={commonStyle.clubTitle}>Clube de Vantagens</Text>                  
              <Text style={commonStyle.clubDescription}>Aqui a sua experiência vale pontos, troque abaixo seus pontos por cupons de descontos e participe do nosso Clube de Vantagens.</Text>
              <Text style={commonStyle.evaluateThanksTitle}>Total de pontos: 1200</Text>
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
              <View style={{
              }}>
                <View
                  style={{
                    borderRadius: 14,                  
                    backgroundColor: "#ffffff",
                    padding: 16,
                    marginBottom: 16,   
                    marginTop: 5,
                    marginRight: 10,
                    minHeight: 160                  
                  }}
                >
                  <View style={{alignItems: 'center'}}>
                    <Image style={commonStyle.clubImage} source={require('../../../assets/icon/icon-off-10.png')}></Image>
                    <View>
                      <Text style={commonStyle.clubPoints}>180 pontos</Text>
                      <RectButton style={commonStyle.buttonPrimary} onPress={() => { handleGetOffer()}}>
                        <Text style={commonStyle.buttonText}>
                          Resgatar
                        </Text>
                      </RectButton>                       
                    </View>
                  </View>                  
                </View>   
              </View>
              <View style={{
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
                    minHeight: 160                  
                  }}
                >
                  <View style={{alignItems: 'center'}}>
                    <Image style={commonStyle.clubImage} source={require('../../../assets/icon/icon-off-20.png')}></Image>
                    <View>
                      <Text style={commonStyle.clubPoints}>396 pontos</Text>
                      <RectButton style={commonStyle.buttonPrimary} onPress={() => { handleGetOffer()}}>
                        <Text style={commonStyle.buttonText}>
                          Resgatar
                        </Text>
                      </RectButton>                       
                    </View>
                  </View>                  
                </View>   
              </View>   
              <View style={{
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
                    minHeight: 160                  
                  }}
                >
                  <View style={{alignItems: 'center'}}>
                    <Image style={commonStyle.clubImage} source={require('../../../assets/icon/icon-off-40.png')}></Image>
                    <View>
                      <Text style={commonStyle.clubPoints}>2970 pontos</Text>
                      <RectButton style={commonStyle.button} onPress={() => { handleGetOffer()}}>
                        <Text style={commonStyle.buttonText}>
                          Resgatar
                        </Text>
                      </RectButton>                       
                    </View>
                  </View>                  
                </View>   
              </View>   
              <View style={{
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
                    minHeight: 160                  
                  }}
                >
                  <View style={{alignItems: 'center'}}>
                    <Image style={commonStyle.clubImage} source={require('../../../assets/icon/icon-off-50.png')}></Image>
                    <View>
                      <Text style={commonStyle.clubPoints}>8910 pontos</Text>
                      <RectButton style={commonStyle.button} onPress={() => { handleGetOffer()}}>
                        <Text style={commonStyle.buttonText}>
                          Resgatar
                        </Text>
                      </RectButton>                       
                    </View>
                  </View>                  
                </View>   
              </View>            
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
                  <Text style={{paddingTop: 3}}>
                    <FontAwesome name="gift" size={40} style={{color: '#6200ee'}}></FontAwesome>
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

  export default PageClub;