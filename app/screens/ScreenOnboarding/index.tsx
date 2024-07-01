import React from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { FontSize, Color, FontFamily, Border } from "@/app/GlobalStyles";


const index = () => {
  return (
    <Pressable
    style={styles.splash}
    /* onPress={() => navigation.navigate(SCREENS.AUTH)} */
  >
    <View style={styles.splashChild} />
    <Text style={styles.dingo}>D I N G O</Text>
    <Text style={styles.fineFelines}>F i n e F e l i n e s</Text>
    <View style={styles.slider1} />
    <Image
      style={styles.oolzfw0RemovebgPreview1Icon}
      contentFit="cover"
      source={require("@/assets/images/oolzfw0removebgpreview-1.png")}
    />
    <Image
      style={styles.splashItem}
      contentFit="cover"
      source={require("@/assets/images/rectangle-1.png")}
    />
    <Text
      style={[styles.getStarted, styles.getStartedTypo]}
    >{`get started >`}</Text>
    <Text style={[styles.heyWelcome, styles.getStartedTypo]}>
      hey! welcome
    </Text>
  </Pressable>
);
};

const styles = StyleSheet.create({
getStartedTypo: {
  fontWeight: "600",
  letterSpacing: 3,
  fontSize: FontSize.size_xl,
  textAlign: "center",
  color: Color.colorBlack,
  position: "absolute",
},
splashChild: {
  top: 49,
  left: 55,
  borderRadius: 60,
  backgroundColor: "#ff5f00",
  width: 279,
  height: 759,
  display: "none",
  position: "absolute",
},
dingo: {
  top: 400,
  left: 65,
  fontSize: FontSize.size_45xl,
  lineHeight: 60,
  fontWeight: "800",
  fontFamily: FontFamily.poppinsExtraBold,
  textAlign: "center",
  color: Color.colorBlack,
  position: "absolute",
},
fineFelines: {
  top: 770,
  left: 117,
  lineHeight: 26,
  fontFamily: FontFamily.fredokaOne,
  fontSize: FontSize.size_xl,
  textAlign: "center",
  color: Color.colorBlack,
  position: "absolute",
},
slider1: {
  top: 600,
  left: 114,
  backgroundColor: Color.colorGray_400,
  width: 176,
  height: 33,
  position: "absolute",
},
oolzfw0RemovebgPreview1Icon: {
  top: 30,
  left: 75,
  borderRadius: Border.br_95xl,
  width: 234,
  height: 271,
  position: "absolute",
},
splashItem: {
  top: 640,
  left: 73,
  borderRadius: 30,
  width: 244,
  height: 57,
  position: "absolute",
},
getStarted: {
  top: 655,
  left: 78,
  textTransform: "uppercase",
  fontFamily: FontFamily.poppinsSemiBold,
  width: 239,
  height: 115,
},
heyWelcome: {
  top: 494,
  left: 59,
  textTransform: "capitalize",
  fontFamily: FontFamily.fredokaSemiBold,
  width: 281,
  height: 25,
},
splash: {
  shadowColor: "rgba(18, 15, 40, 0.12)",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 6,
  elevation: 6,
  shadowOpacity: 1,
  borderRadius: Border.br_21xl,
  backgroundColor: Color.colorWhite,
  flex: 1,
  width: "100%",
  height: 844,
  overflow: "hidden",
},
});

export default index