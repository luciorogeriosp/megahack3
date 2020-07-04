import { StyleSheet } from 'react-native'
  
 const headerStyle = StyleSheet.create({
    header: {
        backgroundColor: '#374761',        
        paddingTop:34,
        paddingRight:16,
        paddingBottom:32,
        marginBottom: 2, 
        paddingLeft:16,
        borderBottomColor:"#2c699d",
        borderBottomWidth: 1,
        minHeight: 85, 
        maxHeight: 85,        
      },

      headerItems: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        paddingLeft: 0,
        paddingRight: 20,                
      },      

      headerAdress: {
        textAlign: "right",
        color: "#fff",
        fontFamily: 'Roboto_400Regular',
        textAlignVertical: 'bottom',
        fontSize: 12,
      },

      headerIcon: {
        color: '#ffffff',
        paddingRight: 5,
      },

      headerTitle: {
        backgroundColor: '#004da2',
        paddingTop:5,
        paddingRight:16,
        paddingBottom:5,
        paddingLeft:16,
        flexDirection: 'row',
      },
  
      pageTitle: {
        color: '#ffffff',
        fontSize: 16,
        justifyContent:'center'
      },      
 })
  
 export { headerStyle }    