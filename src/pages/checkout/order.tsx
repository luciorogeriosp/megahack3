import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { commonStyle } from '../../components/styles/common-style'
import { headerStyle } from '../../components/styles/header-style';
import { footerStyle } from '../../components/styles/footer-style';

import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { FilterModel } from '../../model/filter-model';
import { OrderModel } from '../../model/order-model';
import { CartModel } from '../../model/cart-model';

interface ParamsMerchant {
  id: number;
}

const PageOrder = () => {
    const navigation = useNavigation();    
    const route = useRoute();

    const APP_NAME = process.env.APP_NAME;

    const [filterList, setFilterList] = useState<FilterModel[]>([]);
    const [order, setOrder] = useState<OrderModel>(new OrderModel());
    const [menuList, setMenuList] = useState<CartModel[]>(new Array<CartModel>());
    const [filterSelected, setFilterSelected] = useState<number>();
    const [filterLoaded, setFilterLoaded] = useState<boolean>(false);
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
      });      
    }, []);  
    
    useEffect(() => {
      async function setFromParam() {      
        setOrder(route.params as OrderModel);
      }      

      async function getMenuFromService() {     
        if (order.merchant.id > 0){
            let totalPriceTemp = 0;
            for (let index = 0; index < order.items.length; index++) {
              const element = order.items[index];
              totalPriceTemp+=parseFloat(element.price.toString());
            }

            setTotalPrice(totalPriceTemp);
          }

          setMenuList(order.items);        
        }

        setFromParam().then(()=> {        
          getMenuFromService().then(()=>{
          })
        });      
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

    function handleEvaluate(){
      navigation.navigate("PageEvaluate", order);
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
            }}
          >
        
            <View style={{
              minHeight: 54, 
              maxHeight: 54,
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.6
            }}>
              <View>
                <Text style={commonStyle.merchantDetailTitle}>Resumo do Pedido - {order.merchant.name}</Text>
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
                    <Text style={commonStyle.orderTitle}>Pedido {order.id} realizado com sucesso!</Text>
                    <Text style={commonStyle.orderText}>{order.merchant.name}</Text>
                    <Text style={commonStyle.orderText}>Valor: R$ {parseFloat(totalPrice.toString()).toFixed(2)}</Text>
                    <Text style={commonStyle.orderText}>Mesa: 14</Text>
                    <Text style={commonStyle.orderText}>Data: 10/10/2020 11h30</Text>
                  </View>
                </View>
              </View>       
          </View>
          <FlatList
            data={menuList}
            horizontal={false}
            ListEmptyComponent={()=>
            (
              <View style={{paddingBottom: 200}}>
                <Text style={commonStyle.NoDataText}>Nenhum cardápio definido.</Text>
              </View>
            )}
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 0,
              borderRadius: 14,
              marginRight: 16,
              marginLeft: 16,
              backgroundColor: "#ffffff",
              maxHeight: 230
            }}
            ItemSeparatorComponent={()=>(
              <View 
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 0.6,    
                }}
              >
              </View>
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom:16,
                  padding: 10,  
                  marginTop: 10,                
                }}
                key={item.id}
              >
                <View
                    style={{
                      flex:1,
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                  <View>
                    <Text style={commonStyle.merchantMenuTitle}>1 {item.name}</Text>
                  </View>
                </View>
              </View>
            )}
          >                  
          </FlatList>          
          <View style={{
            minHeight: 290,
            paddingTop: 8,
            paddingLeft: 16,
            paddingRight: 16,
            }}
          >
            <View style={{
              maxHeight:130, 
              flex: 1, 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              marginTop: 5,              
              }}>
              <View style={{
                  maxWidth: 170
                }}
              >
                <Image style={commonStyle.qrcode} source={require('../../images/qr-code.png')}></Image>
                <Text style={commonStyle.orderTextInfo}>Apresente esse QRCode para realizar sua refeição</Text>
              </View>                  
              <View style={{
                maxWidth: 170
                }}
              >
                <TouchableOpacity
                  onPress={() => handleEvaluate()}
                >
                  <Image style={commonStyle.qrcode} source={{uri: 'https://pixabay.com/get/57e6d2474353ad14f6da8c7dda35367b1c3cd7ed50577348_1280.png'}}></Image>
                  <Text style={commonStyle.orderTextInfo}>Avalie esse pedido e ganhe pontos do Clube de Vantagens</Text>
                </TouchableOpacity>
              </View>
            </View>  
          </View>
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

  export default PageOrder;