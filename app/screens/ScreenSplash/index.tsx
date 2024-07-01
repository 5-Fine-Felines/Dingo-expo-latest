import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { Border, Color, FontFamily, FontSize } from '@/app/GlobalStyles';
import IMAGES from '@/assets/images';



const index = () => {
    const router = useRouter();
    
    useEffect(() => {
        const timer = setTimeout(() => {
          router.replace('../../screens/ScreenOnboarding');
        }, 4000); // 4 seconds
        return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.splash}>
            <Text style={[styles.dingo, styles.toTypo]}>Dingo</Text>
            <Text style={[styles.welcome, styles.welcomeFlexBox]}>Welcome</Text>
            <Text style={[styles.to, styles.toTypo]}>to</Text>
            <Text
                style={[styles.pawsitivelyUnforgettableCare, styles.welcomeFlexBox]}
            >{`Positively Unforgettable Care for Your Furry Family`}</Text>
            <Image
                style={styles.amusedtallcirripedMax1mb1Icon}
                contentFit="cover"
                source={IMAGES.SPLASHPET}
            />
        </View>
  )
};

const styles = StyleSheet.create({
    splash:{
        shadowColor: "rgba(18, 15, 40, 0.12)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 1,
        borderRadius: Border.br_21xl,
        backgroundColor: "#f9ffff",
        flex: 1,
        width: "100%",
        height: 844,
        overflow: "hidden",
    },
    toTypo: {
        textAlign: "left",
        color: Color.colorBlack,
        fontFamily: FontFamily.poppinsBold,
        fontWeight: "700",
        fontSize: FontSize.size_45xl,
        position: "absolute",
    },
    welcomeFlexBox: {
        textAlign: "center",
        color: Color.colorBlack,
        position: "absolute",
    },
    dingo: {
        top: 546,
        left: 120,
        lineHeight: 65,
    },
    welcome: {
        top: 386,
        left: 75,
        fontWeight: "800",
        fontFamily: FontFamily.poppinsExtraBold,
        lineHeight: 60,
        fontSize: FontSize.size_45xl,
        textAlign: "center",
    },
    to: {
        top: 473,
        left: 175,
        lineHeight: 65,
    },
    pawsitivelyUnforgettableCare: {
        top: 733,
        left: 11,
        fontSize: FontSize.size_xl,
        lineHeight: 26,
        fontFamily: FontFamily.fredokaOne,
    },
    amusedtallcirripedMax1mb1Icon: {
        top: 11,
        left: 20,
        width: 350,
        height: 350,
        position: "absolute",
    },


});

export default index