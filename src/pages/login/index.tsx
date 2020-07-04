//http://bootstrap.themes.guide/herbie/#buttons

import React,{ useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { TextInput, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { View, SafeAreaView, ImageBackground, StyleSheet, Text } from 'react-native';

import { commonStyle } from '../../components/styles/common-style'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
    },
  
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
   
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginTop: 20,
      paddingHorizontal: 24,
      fontSize: 16,
      opacity: 0.75,
    },
  
    
    button: {
        width: '100%',
        backgroundColor: '#3276b1',
        borderColor: '#2c699d',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
      },
  });


  
const Login = () => {
    const navigation = useNavigation();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        navigation.navigate('Home');
      }
    
    return (
      <SafeAreaView>
          <View>
              <Text style={styles.title}>Bem Vindo ao SAL</Text>
              <Text style={styles.description}>Sistema Administrativos de Lojas, Capítulos, Pronaoi e Heptadas.</Text>
          </View>
          <TextInput
              style={styles.input}
              placeholder="Número de Afiliação"
              onChangeText={text => setUserName(text)}
              defaultValue={username}
          />      
          <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Senha"
              onChangeText={text => setPassword(text)}
              defaultValue={password}
          />      
          <View style={styles.footer}>
              <RectButton style={styles.button} onPress={handleLogin}>
                  <FontAwesome name="sign-in" size={20} color="#FFF" />
                  <Text style={styles.buttonText}>Entrar</Text>
              </RectButton>
          </View>   
          <View>
              <Text style={commonStyle.comment}>Aqui você poderá ver as atividades do seu organismo, iniciações e visualizar seus dados.</Text>
          </View>

        </SafeAreaView>                    
    );
}

export default Login;