import { StyleSheet } from 'react-native'
  
 const footerStyle = StyleSheet.create({
    footer: {
        minHeight: 50, 
        maxHeight: 50, 
        marginTop: 2,
        backgroundColor: '#e4e4e4'
    },

    footerItems: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingLeft: 20, 
        paddingRight: 20,        
    },

    footerItem: {
        width: 50, 
        height: 50, 
        alignItems:'center',
    }
})

export { footerStyle }    