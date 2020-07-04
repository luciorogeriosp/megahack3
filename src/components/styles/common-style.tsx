import { StyleSheet, Dimensions } from 'react-native'

const fullWidth = Dimensions.get('window').width; //full width
const headerFullWidth = fullWidth - 36;
const commonStyle = StyleSheet.create({
    container: {
      flex: 1,
    },

    content: {
      paddingTop:16 ,
      paddingRight:16,
      paddingBottom:16,
      paddingLeft:16,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',      
    },

    rowFull: {
      width: fullWidth,
    },

    headerFull: {
      width: headerFullWidth,
    },

    box: {
      flex: 1,
    },

    four: {
      flex: 4
    },

    middle: {
      justifyContent: "center",
    },

    middleText: {
      textAlign: "center",
    },

    title: {
      color: '#322153',
      fontSize: 22,
      fontFamily: 'Ubuntu_700Bold',      
    },
  
    comment: {
      color: '#0C090C',
      fontSize: 12,
      fontFamily: 'Roboto_400Regular',
    },

    color1: {
      color: '#40bb6a'
    },
  
    color2: {
      color: '#cc6286'
    },
  
    color3: {
      color: '#fe963d'
    },
  
    color4: {
      color: '#32c0e6'
    }, 

    buttonSuccess: {
      backgroundColor: '#009589',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonWarning: {
      backgroundColor: '#ffc108',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },

    buttonError: {
      backgroundColor: '#ff5722',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
    
    buttonPrimary: {
      backgroundColor: '#2096f3',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },    

    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
      marginLeft:10,
      marginRight:10,
    },  

    infoText: {
      justifyContent: 'center',
      textAlign: 'center',
      color: '#004da2',
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginLeft:10,
      marginRight:10,
    },      

    info: {
      color: '#004da2',
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',      
    },

    errorMessage: {
      color: '#eb4e4d',
      fontSize: 14,
      fontFamily: 'Roboto_400Regular',      
    },

    pickerSelect: {
      backgroundColor: '#ffffff',
      height: 60,
      borderRadius: 10,
      overflow: 'hidden',
    },    

    input: {
      flex: 1,
      padding: 8,
      fontSize: 16,
      lineHeight: 16,
      color: '#333',
      backgroundColor: '#FFF',
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderColor: '#dadce0',
      textTransform: 'uppercase',
      height: 40,
    },    

    merchantLogo: {
      width: '100%',
      height: 80,
      resizeMode: 'cover',
      borderRadius: 10,
    },

    merchantListTitle: {
      color: '#3c3c3c',
      fontSize: 18,
      fontFamily: 'Roboto_500Medium',
    },    

    merchantListDescription: {
      color: '#3c3c3c',
      fontSize: 13,
      fontFamily: 'Roboto_400Regular',
    },        
})
  
export { commonStyle }    