import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
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

import { getMenu } from '../../services/menu-service';

interface ParamsMerchant {
  id: number;
}

const PageMerchantDetail = () => {
    const navigation = useNavigation();    
    const route = useRoute();

    const APP_NAME = process.env.APP_NAME;

    const [filterList, setFilterList] = useState<FilterModel[]>([]);
    const [merchant, setMerchant] = useState<MerchantModel>(new MerchantModel());
    const [menuList, setMenuList] = useState<MenuModel[]>([]);
    const [filterSelected, setFilterSelected] = useState<number>();
    const [filterLoaded, setFilterLoaded] = useState<boolean>(false);
    const [subpage, setSubPage] = useState<string>("");

    useEffect(() => {
      async function loadFilter() {
        const filterListTemp: Array<FilterModel> = [];
        filterListTemp.push(new FilterModel(1, 'Distância'));
        filterListTemp.push(new FilterModel(2, 'Pontuação'));
        filterListTemp.push(new FilterModel(3, 'Lotação'));
        filterListTemp.push(new FilterModel(4, 'Preço'));
        setFilterList(filterListTemp);
        
        //setFilterSelected(1);        
      }

      loadFilter().then(()=> {
        setFilterLoaded(true);
        setSubPage('cardapio');
      });      
    }, []);  
    
    useEffect(() => {
      async function setFromParam() {      
        setMerchant(route.params as MerchantModel);
      }      

      async function getMenuFromService() {    
        const menuListTemp = await getMenu(merchant.id);
        if (menuList === null || menuList === undefined || menuList.length === 0){
          setMenuList(menuListTemp);        
        }        
      }      

      setFromParam().then(()=> {        
        getMenuFromService().then(()=>{
          
        })
      });      
    }, [merchant]);  

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

    function handleCart(item: MenuModel){
      navigation.navigate("PageCheckoutCart", item);
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
        if (filterLoaded === true){
          handleNavigateHome();
        }
      }
    }

    function handleSubmenu(submenu: string){
      setSubPage(submenu);
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
              minHeight: 275,
            }}
          >
            <View style={{minHeight: 150, maxHeight: 150,}}>
              { merchant.id > 0 ? (
                <Image style={commonStyle.merchantPhoto} source={getMerchantPhoto()}></Image>
                ) : null                
              }
            </View>            
            <View style={{
              minHeight: 54, 
              maxHeight: 54,
              borderBottomColor: '#ccc',
              borderBottomWidth: 0.6
            }}>
              <View>
                <Text style={commonStyle.merchantDetailTitle}>{merchant.name}</Text>
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
            <View
              style={{
                flexDirection: "row",
                height: 56,
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.6                
              }}
            >
              <View style={{ 
                flex: 1, 
              }}>
                <RectButton style={subpage === "cardapio" ? commonStyle.buttonSelected : commonStyle.button} onPress={() => { handleSubmenu('cardapio')}}>
                  <Text style={commonStyle.buttonText}>
                    Cardápio
                  </Text>
                </RectButton>                  
              </View>
              <View style={{ 
                flex: 1, 
                }
              }>
                <RectButton style={subpage === "novidades" ? commonStyle.buttonSelected : commonStyle.button} onPress={() => { handleSubmenu('novidades')}}>
                  <Text style={commonStyle.buttonText}>
                    Novidades (2)
                  </Text>
                </RectButton>                   
              </View>
              <View style={{ 
                flex: 1, 
                paddingLeft: 10, 
                paddingRight: 10,
              }}>
                <RectButton style={subpage === "fornecedores" ? commonStyle.buttonSelected : commonStyle.button} onPress={() => { handleSubmenu('fornecedores')}}>
                  <Text style={commonStyle.buttonText}>
                    Fornecedores
                  </Text>
                </RectButton>                   
              </View>
            </View>
          </ScrollView>
          {
            subpage === "cardapio" ? 
            (
              <FlatList
              data={menuList}
              horizontal={false}
              ListEmptyComponent={()=>
              (
                <View style={{paddingBottom: 200}}>
                  <ActivityIndicator>                
                  </ActivityIndicator>
                  <Text style={commonStyle.loadingText}>aguarde...</Text>                                
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
                    maxHeight: 136,
                    minHeight: 136,
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
                    <View>
                      <Text style={commonStyle.merchantMenuTitle}>{item.name}</Text>
                      <Text style={commonStyle.merchantMenuDescription}>{item.category_name}</Text>
                      <Text style={commonStyle.merchantMenuDescription}>R$ {parseFloat(item.price.toString()).toFixed(2)}</Text>
                      <RectButton style={commonStyle.buttonPrimary} onPress={() => { handleCart(item)}}>
                        <View style={commonStyle.buttonIcon}>
                          <Text>
                            <FontAwesome name="plus"  color="#e7e7e7" size={12}></FontAwesome>
                          </Text>
                        </View>
                        <Text style={commonStyle.buttonText}>
                          fazer pedido
                        </Text>
                      </RectButton>                          
                    </View>
                  </View>
                </View>
              )}
            >                  
            </FlatList>                  
            )
            : null
          }
          {
            subpage === "novidades" ? 
            (
            <ScrollView
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 0,
                minHeight: 275,
              }}
            >
              <View
                style={{
                  borderRadius: 14,                  
                  backgroundColor: "#ffffff",
                  padding: 16,
                  marginBottom: 16,                     
                }}
              >
                <View>
                  <Text style={commonStyle.newsTitle}>Qual o papel de uma alimentação adequada e saudável durante a pandemia de COVID?</Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Image style={commonStyle.newsPhoto} source={{
                      uri: 'https://pixabay.com/get/52e1dd464950a814f6d1867dda35367b1c3cd7e35455714b_1920.jpg',
                    }}></Image>
                  </View>
                  <View>
                    <Text style={commonStyle.newsDescription}>                  
                      Alimentos in natura, como frutas, legumes, verduras, grãos diversos, oleaginosas, tubérculos, raízes, carnes e ovos, são saudáveis e excelentes fontes de fibras, de vitaminas, minerais e de vários compostos que são essenciais para a manutenção da saúde e a prevenção de muitas doenças. Inclusive aquelas que aumentam o risco de complicações do Coronavírus, como diabetes, hipertensão e obesidade
                    </Text>                  
                  </View>
                  <View style={{
                  flex: 1,
                  flexDirection: 'row'
                }
                }>
                  <Text style={commonStyle.newsMore}>                  
                    Saiba mais em:&nbsp;
                  </Text>                  
                  <Text style={commonStyle.newsLink}>                  
                    saudebrasil.saude.gov.br
                  </Text>                  
                </View>
              </View>   
              <View
                style={{
                  borderRadius: 14,                  
                  backgroundColor: "#ffffff",
                  padding: 16,                     
                }}
              >
                <View>
                  <Text style={commonStyle.newsTitle}>O que quer dizer comida de verdade?</Text>
                </View>
                <View style={{marginTop: 5}}>
                  <Image style={commonStyle.newsPhoto} source={{
                    uri: 'https://pixabay.com/get/54e7d0454e54ab14f6d1867dda35367b1c3cd7e35a58784f_1920.jpg',
                  }}></Image>
                </View>
                <View>
                  <Text style={commonStyle.newsDescription}>                  
                    Já parou para pensar no conceito de alimentação saudável? Muita gente pode acabar associando o termo a alimentos “especiais”, mais caros, raros e pouco acessíveis. Mas a resposta para essa pergunta pode ser bem mais simples do que você imagina.
                  </Text>                  
                  <Text style={commonStyle.newsDescription}>                  
                    Estamos falando da comida de verdade. Um conceito já bem conhecido por quem acompanha o Guia Alimentar para a População Brasileira, elaborado pelo Ministério da Saúde. De acordo com a publicação, a regra de ouro para comer de forma saudável é basear a alimentação em alimentos in natura ou minimamente processados.
                  </Text>                  
                  <Text style={commonStyle.newsDescription}>                  
                    Segundo a Dra. Elisabetta Recine, nutricionista, docente e coordenadora do Observatório de Políticas de Segurança Alimentar e Nutrição da Universidade de Brasília (UnB), a comida de verdade nada mais é do que a tradução popular da alimentação adequada e saudável.
                  </Text>                  
                </View>
                <View style={{
                  flex: 1,
                  flexDirection: 'row'
                }
                }>
                  <Text style={commonStyle.newsMore}>                  
                    Saiba mais em:&nbsp;
                  </Text>                  
                  <Text style={commonStyle.newsLink}>                  
                    saudebrasil.saude.gov.br
                  </Text>                  
                </View>
              </View>        
            </ScrollView>                           
            )
            : null
          }
          {
            subpage === "fornecedores" ? 
            (
            <ScrollView
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 0,
                minHeight: 275,
              }}
            >
              <View>
                <Text style={commonStyle.newsTitle}>Conheça quem fornece os alimentos que você consome. Nós valorizamos o produtores locais!</Text>
              </View>              
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <View
                  style={{
                    borderRadius: 14,                  
                    backgroundColor: "#ffffff",
                    padding: 16,
                    marginBottom: 16,   
                    marginTop: 5,
                    marginRight: 10,
                    minHeight: 220                  
                  }}
                >
                  <View>
                    <Text style={commonStyle.newsTitle}>Hortifruti Zanon</Text>
                  </View>
                  <View>
                    <Image style={commonStyle.providerImage} source={{
                      uri: 'https://pixabay.com/get/57e7d4434950a414f6d1867dda35367b1c3cd7e25152764d_1920.jpg',
                    }}></Image>
                  </View>
                  <View>
                    <Text style={commonStyle.providerLink}>                  
                      zanonhortifruti.com.br
                    </Text>                  
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
                    minHeight: 220                      
                  }}
                >
                  <View>
                    <Text style={commonStyle.newsTitle}>MelanciaSim</Text>
                  </View>
                  <View>
                    <Image style={commonStyle.providerImage} source={{
                      uri: 'https://pixabay.com/get/54e3d3444a50a514f6d1867dda35367b1c3cd7e25151774d_1920.jpg',
                    }}></Image>
                  </View>
                  <View>
                    <Text style={commonStyle.providerLink}>                  
                      pedemanga.com.br
                    </Text>                  
                  </View>
                </View>  
              </View>   
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <View
                  style={{
                    borderRadius: 14,                  
                    backgroundColor: "#ffffff",
                    padding: 16,
                    marginBottom: 16,   
                    marginTop: 5,
                    marginRight: 10,
                    minHeight: 220                  
                  }}
                >
                  <View>
                    <Text style={commonStyle.newsTitle}>Doce Sabor</Text>
                  </View>
                  <View>
                    <Image style={commonStyle.providerImage} source={{
                      uri: 'https://pixabay.com/get/57e0dd424950a814f6d1867dda35367b1c3cd7e251547740_1920.jpg',
                    }}></Image>
                  </View>
                  <View>
                    <Text style={commonStyle.providerLink}>                  
                      sobremesasdocesabor.com.br
                    </Text>                  
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
                    minHeight: 220,                     
                  }}
                >
                  <View>
                    <Text style={commonStyle.newsTitle}>Pecuária Taurus</Text>
                  </View>
                  <View>
                    <Image style={commonStyle.providerImage} source={{
                      uri: 'https://pixabay.com/get/57e2d64a4e51a814f6d1867dda35367b1c3cd7e25156774b_1920.jpg',
                    }}></Image>
                  </View>
                  <View>
                    <Text style={commonStyle.providerLink}>                  
                      pecuaria.com.br
                    </Text>                  
                  </View>
                </View>  
              </View>                  
            </ScrollView>                           
            )
            : null
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

  export default PageMerchantDetail;