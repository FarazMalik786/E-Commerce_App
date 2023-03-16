import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Custom_Button from './UI/Custom_Button'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config';
import { useDispatch} from 'react-redux';
import { Basic_Info } from '../Redux/Basic_Info';
import { fetchUserById } from '../Redux/Basic_Info';
import { fetchUserCart } from '../Redux/Cart_Info';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const [input, setinput] = useState({
        email: "",
        password: "",
    });
    const [isLoading , setisLoading] = useState(false);
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation()
    const dispatch = useDispatch();

    function presshandler() {
        if (input.email == "" || input.password == "") {
            Alert.alert("Invalid Email Or Password");
        } else {
            setisLoading(true);
            signInWithEmailAndPassword(auth, input.email, input.password)
                .then( async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                 
                  
                   dispatch(fetchUserById({userId:user.uid , email_id:user.email}));
                    // ...
                    dispatch(fetchUserCart({ userId: user.uid, email_id: user.email }));
                    // navigation
                    if (user.uid != undefined) {
                        navigation.replace('mainscreen');
                        
                    } else{
                        setisLoading(false);
                        Alert.alert("SomeThing Wronge please try again later");
                        
                    }
                   
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert(errorMessage);
                    setisLoading(false);
                });
        }
       
    }
    const isPortrait =  height <= width;
    

    return (
        <ScrollView style={Styles.container}>
            <Text style={Styles.login}>Login</Text>
            <TextInput
                onChangeText={(v) => {
                    setinput(previousState => {
                        return { ...previousState, email: v }
                    });
                }}
                value={input.email}
                style={[Styles.textinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
                placeholder="Email" />
            <TextInput
                onChangeText={(v) => {
                    setinput(previousState => {
                        return { ...previousState, password: v }
                    });
                }}
                value={input.password}
                style={[Styles.textinput, { height: isPortrait ? responsiveHeight(15) : responsiveHeight(8), width: isPortrait ? responsiveWidth(80) : responsiveWidth(80) }]}
                placeholder="Password" />

            <View style={Styles.btn}>
                <Custom_Button
                    text={isLoading ? (<ActivityIndicator color={"white"} size="small"/>):"LOGIN"}
                    btnheight={isPortrait ? responsiveHeight(12) : responsiveHeight(8)}
                    btnwidth={isPortrait ? responsiveWidth(80) : responsiveWidth(80)}
                    color="white"
                    onpress={ presshandler }
                    backgroundColor="#ff4500"
                    borderRadius={responsiveWidth(8)} />
            </View>
            <Text style={Styles.create_account_txt} onPress={() => navigation.navigate("user_info") } >Creat An Account</Text>

        </ScrollView>
    )
}

export default LoginScreen
const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    login: {
        fontSize: responsiveFontSize(6),
        fontWeight: "bold",
        marginVertical: responsiveHeight(9),
        marginLeft: responsiveWidth(6)
    },
    textinput: {
        borderBottomWidth: responsiveWidth(0.5),
        borderBottomColor: "gray",
        alignSelf: "center",
        marginVertical: responsiveHeight(1),
        borderRadius: responsiveWidth(3)
    },
    btn: {
        alignSelf: "center",
        marginVertical: responsiveHeight(7),
    },
    create_account_txt: {
        fontSize: responsiveHeight(3),
        alignSelf: "center",
        width: responsiveWidth(50)
    }

})