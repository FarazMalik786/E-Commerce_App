import React from 'react'
import { Text, View, FlatList } from 'react-native'
import Pressable_Images from '../UI/Pressable_Images'

function Products_List({ listdata , product_item_height , product_item_width , product_item_borderradius , product_item_container_width , numcolumn , horizontal , navigation  }) {
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
           <View style={{justifyContent:"center",alignItems:"center" , width: product_item_container_width }}>
                <Pressable_Images
                    image_url={item.image}
                    image_height={product_item_height}
                    image_width={product_item_width}
                    image_borderradius={product_item_borderradius}
                    image_resizemode="stretch"
                    press={navigate_product_detail}
                />
           </View>
        )
    }

    return (
        <>
            <FlatList
                data={listdata}
                renderItem={List}
                keyExtractor={item => item.id}
                nestedScrollEnabled={true}
                horizontal={horizontal}
                numColumns={numcolumn}
               
            />
        </>
    )
}

export default Products_List
