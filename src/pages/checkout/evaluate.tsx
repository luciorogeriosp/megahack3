import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, ListView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { commonStyle } from '../../components/styles/common-style'
import { headerStyle } from '../../components/styles/header-style';
import { footerStyle } from '../../components/styles/footer-style';

import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { FilterModel } from '../../model/filter-model';
import { MerchantModel } from '../../model/merchant-model';
import { MenuModel } from '../../model/menu-model';
import { OrderModel } from '../../model/order-model';
import { CartModel } from '../../model/cart-model';

const PageEvaluate = () => {
    const navigation = useNavigation();    
    const route = useRoute();

    const APP_NAME = process.env.APP_NAME;

    const [filterList, setFilterList] = useState<FilterModel[]>([]);
    const [order, setOrder] = useState<OrderModel>(new OrderModel());
    const [filterSelected, setFilterSelected] = useState<number>();
    const [filterLoaded, setFilterLoaded] = useState<boolean>(false);
    const [consumeType, setConsumeType] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);

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
        setConsumeType('consumir');
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

  function handleEvaluateConfirm() {
    navigation.navigate("PageEvaluateConfirm", order);
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
              minHeight: 175, 
              maxHeight: 175,     
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.6,                       
            }}
          >
        
            <View style={{
              minHeight: 54, 
              maxHeight: 54,
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.6
            }}>
              <View>
                <Text style={commonStyle.merchantDetailTitle}>Avaliação - {order.merchant.name}</Text>
                <View style={{minHeight:20, maxHeight:20, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={commonStyle.merchantDetailText}>{order.merchant.category} - {order.merchant.distance} metros - </Text>
                  <View style={{minHeight:20, maxHeight:20, flex: 1, flexDirection: 'row'}}>
                  {
                    order.merchant.price >= 1 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    order.merchant.price >= 2 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    order.merchant.price >= 3 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    order.merchant.price >= 4 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    order.merchant.price >= 5 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  </View>
                  <View style={{minHeight:20, maxHeight:20, flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <FontAwesome name="star" color={"#faae02"} size={16} style={{paddingTop: 3, paddingRight: 2}}></FontAwesome>
                    <Text style={{textAlign: 'right', color: '#faae02'}}>{order.merchant.evaluation} ({order.merchant.evaluation_responses})</Text>
                  </View>                  
                </View>
              </View>       
            </View>            
            <View style={{
              minHeight: 128, 
              maxHeight: 128,
              }}>
                <View style={{
                  maxHeight:130, 
                  flex: 1, 
                  flexDirection: 'row', 
                  }}>
                  <View style={{
                      maxWidth: 200,
                      marginTop: 5,
                    }}
                  >
                    <Image style={commonStyle.logo} source={require('../../images/logo.png')}></Image>
                  </View>                  
                  <View style={{
                    marginLeft: 5
                    }}
                  >
                    <Text style={commonStyle.orderTitle}>Pedido {order.id}</Text>
                    <Text style={commonStyle.orderText}>{order.merchant.name}</Text>
                    <Text style={commonStyle.orderText}>Valor: R$ {parseFloat(totalPrice.toString()).toFixed(2)}</Text>
                    <Text style={commonStyle.orderText}>Mesa: 14</Text>
                    <Text style={commonStyle.orderText}>Data: 10/10/2020 11h30</Text>
                  </View>
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
              <View style={{minHeight:80, maxHeight:80, flex: 1, flexDirection: 'row',}}>
                <View style={{marginRight: 10, }}>
                  <FontAwesome name="gift" size={60} style={{color: '#7066fc'}}></FontAwesome>
                </View>
                <View style={{paddingRight: 60}}>
                  <Text style={commonStyle.evaluateTitle}>Avalie os restaurantes e a sua experiência, desta forma, irá acumular pontos para serem utilizados em nosso Clube de Benefícios.</Text>                  
                </View>
              </View>
              <View
                style={{
                  borderRadius: 14,
                  backgroundColor: "#ffffff",
                  marginTop:16,
                  marginBottom:16,
                  padding: 10,
                }}
              >
                <View>
                    <Text style={commonStyle.evaluateCategoryCleanTitle}>Higiene e Limpeza</Text>                  
                  </View>                     
                <View 
                  style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.6,    
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                </View>     
                <View>
                  <Text style={commonStyle.evaluateQuestionTitle}>1. Respeito aos limites de distanciamento entre mesas e cadeiras.</Text>
                </View>
                <View style={{minHeight:30, maxHeight:30, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                </View>              
                <View 
                  style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.6,    
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                </View>    
                <View>
                  <Text style={commonStyle.evaluateQuestionTitle}>2. Os funcionários usam máscaras e sistemas de proteção.</Text>
                </View>
                <View style={{minHeight:30, maxHeight:30, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                </View>     
                <View 
                  style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.6,    
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                </View>    
                <View>
                  <Text style={commonStyle.evaluateQuestionTitle}>3. Havia sinalização no chão e clareza nas regras de distanciamento.</Text>
                </View>
                <View style={{minHeight:30, maxHeight:30, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                </View>                          
              </View>              
              <View
                style={{
                  borderRadius: 14,
                  backgroundColor: "#ffffff",
                  marginTop:16,
                  marginBottom:16,
                  padding: 10,
                }}
              >
                <View>
                    <Text style={commonStyle.evaluateCategoryFoodTitle}>Alimento e Experiência</Text>                  
                  </View>                     
                <View 
                  style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.6,    
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                </View>     
                <View>
                  <Text style={commonStyle.evaluateQuestionTitle}>1. Os alimentos estavam bem preparados e foram servidos de maneira adequada.</Text>
                </View>
                <View style={{minHeight:30, maxHeight:30, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                </View>              
                <View 
                  style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.6,    
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                </View>    
                <View>
                  <Text style={commonStyle.evaluateQuestionTitle}>2. Os alimentos estavam na temperatura correta.</Text>
                </View>
                <View style={{minHeight:30, maxHeight:30, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                </View>     
                <View 
                  style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.6,    
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                </View>    
                <View>
                  <Text style={commonStyle.evaluateQuestionTitle}>3. O pedido estava de acordo com o que foi realizado no aplicativo.</Text>
                </View>
                <View style={{minHeight:30, maxHeight:30, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                  <FontAwesome name="star" color={"#cccccc"} size={30} style={{marginRight: 20}}></FontAwesome>
                </View>                          
              </View> 
              <View>
                <RectButton style={commonStyle.buttonPrimary} onPress={() => { handleEvaluateConfirm()}}>
                  <Text style={commonStyle.buttonText}>
                    Enviar Avaliação
                  </Text>
                  <FontAwesome name="paper-plane"  color="#e7e7e7" size={12} style={{paddingRight: 8}}></FontAwesome>
                </RectButton>  
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

  export default PageEvaluate;