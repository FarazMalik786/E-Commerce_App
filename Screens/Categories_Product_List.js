import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, useWindowDimensions, Pressable } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

function Categories_Product_List({ route , navigation}) {
    const { Data_Api, Data_image } = route.params;
    const [listdata, setlistdata] = useState([]);

    {/* Portrait mode onn or off*/ }
    const { height, width } = useWindowDimensions();
    const isportrait = height <= width;
    useEffect(() => {
        try {
            (async () => {

                const response = await axios.get(Data_Api);
                setlistdata(response.data);
                console.log(response.data);

            })()
        } catch (error) {
            console.log(error)
        }
    }, []);
    function List({ item, index }) {
        function navigate_product_detail() {
            navigation.navigate("product_detail",{
                id: item.id,
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                image: item.image,
                rating: {
                  rate: item.rating.rate,
                  count: item.rating.count
                }
            });
        }
        return (
            <Pressable onPress={navigate_product_detail}>
            <View style={[Styles.product_container,{width: isportrait ? responsiveWidth(100) : responsiveWidth(100), height: isportrait? responsiveHeight(45) : responsiveHeight(25) }]}>
                <Image source={{ uri: item.image }}
                    style={{ height: isportrait ? responsiveHeight(40) : responsiveHeight(20), width: isportrait ? responsiveWidth(35) : responsiveWidth(40) }}
                    resizeMode="stretch"
                />
                <View style={{ width: isportrait ? responsiveWidth(50) : responsiveWidth(50) , justifyContent:"center"}}>
                    <Text>{item.title}</Text>
                </View>
            </View>
            </Pressable>
        )
    }
    return (
        <View style={Styles.container}>

            <FlatList
                data={listdata}
                keyExtractor={item => item.id}
                renderItem={List}
                ItemSeparatorComponent={()=>{ 
                    return <View style={{height: responsiveHeight(3)}}/>
                }}
                ListHeaderComponent={()=>{
                    return <Image
                    source={{ uri: Data_image }}
                    style={{ width: isportrait ? responsiveWidth(100) : responsiveWidth(100), height: isportrait ? responsiveHeight(100) : responsiveHeight(40) }}
                    resizeMode="stretch"
                />
                }}
            />
        </View>
    )
}

export default Categories_Product_List
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    product_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        backgroundColor:"white"

    }
})