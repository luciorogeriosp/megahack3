import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
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
import { CartModel } from '../../model/cart-model';

import { getMenu } from '../../services/menu-service';
import { getMerchantById } from '../../services/merchant-service';

interface ParamsMerchant {
  id: number;
}

const PageCheckoutCart = () => {
    const navigation = useNavigation();    
    const route = useRoute();

    const APP_NAME = process.env.APP_NAME;

    const [filterList, setFilterList] = useState<FilterModel[]>([]);
    const [menu, setMenu] = useState<MenuModel>(new MenuModel());
    const [merchant, setMerchant] = useState<MerchantModel>(new MerchantModel());
    const [menuList, setMenuList] = useState<MenuModel[]>(new Array<MenuModel>());
    const [filterSelected, setFilterSelected] = useState<number>();
    const [filterLoaded, setFilterLoaded] = useState<boolean>(false);
    const [consumeType, setConsumeType] = useState<string>("");
    const [quantityList, setQuantityList] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
      async function loadFilter() {
        const filterListTemp: Array<FilterModel> = [];
        filterListTemp.push(new FilterModel(1, 'Distância'));
        filterListTemp.push(new FilterModel(2, 'Pontuação'));
        filterListTemp.push(new FilterModel(3, 'Lotação'));
        filterListTemp.push(new FilterModel(4, 'Preço'));
        setFilterList(filterListTemp);
        
        const quantityListTemp: Array<string> = [];
        quantityListTemp.push("1");
        quantityListTemp.push("2");
        quantityListTemp.push("3");
        quantityListTemp.push("4");
        setQuantityList(quantityListTemp);

        setFilterSelected(1);        
      }

      loadFilter().then(()=> {
        setFilterLoaded(true);
        setConsumeType('consumir');
      });      
    }, []);  
    
    useEffect(() => {
      async function setFromParam() {      
        setMenu(route.params as MenuModel);
      }      

      async function getMenuFromService() {     
        if (menu.merchantId > 0){
          const merchantTemp = await getMerchantById(menu.merchantId);   
          setMerchant(merchantTemp);
          const menuListTemp = await getMenu(menu.merchantId);        
          if (menuListTemp !== undefined){
            menuListTemp.shift();
            menuListTemp.shift();
            menuListTemp.shift();
            menuListTemp.shift();
            menuListTemp.pop();
            menuListTemp.pop();
            menuListTemp.pop();
            menuListTemp.pop();

            let totalPriceTemp = 0;
            for (let index = 0; index < menuListTemp.length; index++) {
              const element = menuListTemp[index];
              totalPriceTemp+=parseFloat(element.price.toString());
            }

            setTotalPrice(totalPriceTemp);
          }
          setMenuList(menuListTemp);        
        }
      }      

      setFromParam().then(()=> {        
        getMenuFromService().then(()=>{

        })
      });      
    }, [menu]);  

    function getMerchantPhoto() {
      let merchantPhoto = require('../../images/merchant/no-image.png');      
      switch (merchant.id.toString()) {
        case "1":
          merchantPhoto = require('../../images/merchant/img-1.png');
          break;
        case "2":
          merchantPhoto = require('../../images/merchant/img-2.png');
          break;
        case "3":
          merchantPhoto = require('../../images/merchant/img-3.png');
          break;
        case "4":
          merchantPhoto = require('../../images/merchant/img-4.png');
          break;
        case "5":
          merchantPhoto = require('../../images/merchant/img-5.png');
          break;
        case "6":
          merchantPhoto = require('../../images/merchant/img-6.png');
          break;                     
      }
      return merchantPhoto;
    }

    function handleNavigateMenu(){
      navigation.navigate("Menu");
    }

    function handleCart(item: MenuModel){

    }

    function handleQuantity(quantity: number){
      console.log(quantity);
    }

    function handleNavigateHome(){
      navigation.navigate("PageMerchant");
    }
    
    function handleFilter(item: FilterModel){
      if (item!==undefined){
        setFilterSelected(item.id);
        if (filterLoaded === true){
          handleNavigateHome();
        }
      }
    }

    function handleConsume(type: string) {
      setConsumeType(type);
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
          <ScrollView
            style={{
              paddingTop: 8,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 0,
              minHeight: 105
            }}
          >
        
            <View style={{
              minHeight: 54, 
              maxHeight: 54,
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.6
            }}>
              <View>
                <Text style={commonStyle.merchantDetailTitle}>Meu Pedido - {merchant.name}</Text>
                <View style={{minHeight:20, maxHeight:20, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={commonStyle.merchantDetailText}>{merchant.category} - {merchant.distance} metros - </Text>
                  <View style={{minHeight:20, maxHeight:20, flex: 1, flexDirection: 'row'}}>
                  {
                    merchant.price >= 1 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    merchant.price >= 2 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    merchant.price >= 3 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    merchant.price >= 4 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  {
                    merchant.price >= 5 ?
                    (
                      <FontAwesome name="money" color="#206b28" size={12} style={{paddingRight: 2, paddingTop: 5}}></FontAwesome>                              
                    ) : null
                  }
                  </View>
                  <View style={{minHeight:20, maxHeight:20, flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <FontAwesome name="star" color={"#faae02"} size={16} style={{paddingTop: 3, paddingRight: 2}}></FontAwesome>
                    <Text style={{textAlign: 'right', color: '#faae02'}}>{merchant.evaluation} ({merchant.evaluation_responses})</Text>
                  </View>                  
                </View>
              </View>       
            </View>            
            <View style={{
              minHeight: 54, 
              maxHeight: 54,
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.6
              }}>
                <View style={{minHeight:20, paddingLeft:40, paddingRight:40, maxHeight:20, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <RectButton style={consumeType === "consumir" ? commonStyle.buttonSelected : commonStyle.button} onPress={() => { handleConsume('consumir')}}>
                      <Text style={commonStyle.buttonText}>
                        Consumir agora
                      </Text>
                      <FontAwesome name="check"  color="#e7e7e7" size={12} style={{paddingRight: 8}}></FontAwesome>
                    </RectButton>                                          
                  </View>
                  <View style={{minWidth: 10, maxWidth: 10}}>

                  </View>
                  <View>
                    <RectButton style={consumeType === "agendar" ? commonStyle.buttonSelected : commonStyle.button} onPress={() => { handleConsume('agendar')}}>
                      <Text style={commonStyle.buttonText}>
                        Agendar horário
                      </Text>
                      <FontAwesome name="calendar"  color="#e7e7e7" size={12} style={{paddingRight: 8}}></FontAwesome>
                    </RectButton>   
                  </View>                  
                </View>
              </View>       
          </ScrollView>
          <FlatList
            data={menuList !==undefined ? menuList.sort((a, b) => a.category_id.toString().localeCompare(b.category_id.toString())) : null}
            horizontal={false}
            ListFooterComponent={() => (
              <View style={{paddingBottom: 20}}>
                <RectButton style={commonStyle.buttonError} onPress={() => { handleConsume('agendar')}}>
                  <Text style={commonStyle.buttonText}>
                    Efetuar Pagamento (R$ {parseFloat(totalPrice.toString()).toFixed(2)})
                  </Text>
                  <FontAwesome name="credit-card"  color="#e7e7e7" size={12} style={{paddingRight: 8}}></FontAwesome>
                </RectButton>                 
              </View>
            )}
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
            }}
            renderItem={({ item }) => (
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
                  <View style={{minWidth: 120, maxWidth:120, minHeight:120, maxHeight:120, }}>
                    <Image style={commonStyle.menuPhoto} source={{uri: item.photo }}/>
                  </View>
                  <View style={{minWidth: 180}}>
                    <Text style={commonStyle.merchantMenuTitle}>{item.name}</Text>
                    <Text style={commonStyle.merchantMenuDescription}>{item.category_name}</Text>
                    <Text style={commonStyle.merchantMenuDescription}>R$ {parseFloat(item.price.toString()).toFixed(2)}</Text>
                    <Text style={[commonStyle.merchantMenuDescription, {width: 50, borderWidth: 0.8, borderColor: '#ccc', textAlign: 'right'}]}>1</Text>               
                  </View>
                </View>
              </View>
            )}
          >                  
          </FlatList>  
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

  export default PageCheckoutCart;