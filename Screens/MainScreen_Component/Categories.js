import React from 'react'
import Pressable_Images from '../UI/Pressable_Images'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { View  , useWindowDimensions} from 'react-native'
import SignupScreen from '../SignupScreen'

function Categories({ navigation }) {
    const {height, width} = useWindowDimensions();
    const isportrait = height <= width ;

    function image_navigation(Api , image) {
        navigation.navigate("categories_product_list",{
            Data_Api: Api,
            Data_image : image
        });
       
    }
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-evenly",

        }}>
            <Pressable_Images
                image_url="https://p4.wallpaperbetter.com/wallpaper/226/785/162/city-coffee-fashion-men-wallpaper-preview.jpg"
                image_height={isportrait ? responsiveHeight(40) : responsiveHeight(20)}
                image_width={responsiveWidth(20)}
                image_borderradius={responsiveWidth(8)}
                press={()=>image_navigation("https://fakestoreapi.com/products/category/men's clothing","https://assets.ajio.com/medias/sys_master/images/images/h39/hcc/31254775463966/Ajio-SS21-BANNERS-1024x672px-04.jpg")}
            />
            <Pressable_Images
                image_url="https://i.pinimg.com/originals/7d/d6/6f/7dd66f7a207e06d9c308f04b9b5909ac.jpg"
                image_height={isportrait ? responsiveHeight(40) : responsiveHeight(20)}
                image_width={responsiveWidth(20)}
                image_borderradius={responsiveWidth(8)}
                press={()=>image_navigation("https://fakestoreapi.com/products/category/women's clothing","https://img.freepik.com/premium-vector/e-commerce-fashion-sale-landing-page-design_619609-9.jpg")}

            />

            <Pressable_Images
                image_url="https://c1.wallpaperflare.com/preview/696/462/446/chain-beads-jewellery-necklace.jpg"
                image_height={isportrait ? responsiveHeight(40) : responsiveHeight(20)}
                image_width={responsiveWidth(20)}
                image_borderradius={responsiveWidth(8)}
                image_resizemode="stretch"
                press={()=>image_navigation("https://fakestoreapi.com/products/category/jewelery","https://img.lovepik.com/free-template/20210217/bg/a0ad9b85a967c.png_list.jpg!/fw/431/clip/0x300a0a0")}
            />
            <Pressable_Images
                image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGVsZWN0cm9uaWN8ZW58MHx8MHx8&w=1000&q=80"
                image_height={isportrait ? responsiveHeight(40) : responsiveHeight(20)}
                image_width={responsiveWidth(20)}
                image_borderradius={responsiveWidth(8)}
                image_resizemode="stretch"
                press={()=>image_navigation("https://fakestoreapi.com/products/category/electronics","https://media.istockphoto.com/id/1206800961/photo/online-shopping-and-payment-man-using-tablet-with-shopping-cart-icon-digital-marketing.jpg?s=612x612&w=0&k=20&c=qG_9JB9ll4P5to97_HVxzMqhhzF0Gi1nWM_hNeiotbk=")}
            />
        </View>
    )
}

export default Categories
