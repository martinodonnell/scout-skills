import React from "react";
import { TouchableOpacity, Linking } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const openURL = (mobilieURL, websiteURL) => {
    Linking.canOpenURL(mobilieURL).then(supported => {
        if (supported) {
            Linking.openURL(mobilieURL)
        } else {
            Linking.openURL(websiteURL)
        }
    })
}

const AntIconLink = ({name,iconSize,color, mobileURL, websiteURL}) => (
    <TouchableOpacity onPress={() => openURL(mobileURL, websiteURL)}>
        <AntDesign name={name} size={iconSize} color={color} />
    </TouchableOpacity>
)

export {AntIconLink}
