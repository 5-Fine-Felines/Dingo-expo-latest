import { View, Text, StyleSheet, ActivityIndicator, Pressable, TextInput, Touchable, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { Border, Color, FontFamily, FontSize } from '@/app/GlobalStyles'
import IMAGES from '@/assets/images'
import onGoogleButtonPress from '@/app/functions/auth/signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

type UserInfo = {
    email: string;
    name: string | null;
    id: string;
    photo: string | null;

};


const index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserInfo | null>(null);

    const handleLogin = async () => {
        try {
          const UserInfo = await onGoogleButtonPress();
          const userInfoJSON = await AsyncStorage.getItem('user');
          if (userInfoJSON) {
            router.replace('../../screens/ScreenHome');
          } else {
            console.log('No user info found in storage.');
          }
        } catch (error) {
          console.error('Error retrieving user info from storage:', error);
        }
      };

    return (
        <View style={styles.createAnAccount}>
            <Image
                style={styles.goodDoggyBro1}
                contentFit="cover"
                source={require("../../../assets/images/good-doggybro-1.png")}
            />
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={Color.colorDarkorange} />
                </View>
            )}
            <View style={[styles.rectangleParent]}>
                <View style={[styles.createLayout]}>
                    <TouchableOpacity delayPressIn={0} onPress={() => {
                        handleLogin();
                    }} disabled={loading}>
                        <View style={[styles.frameChild, styles.frameBg]} />
                    </TouchableOpacity>
                    <Image style={{ width: 25, height: 25, left: 50, top: 10 }}
                        contentFit="cover" source={IMAGES.GOOGLEICON} />
                    <Text style={[styles.login, styles.loginTypo]}>SignIn with Google</Text>
                </View>

            </View>

            {/* <View style={[styles.emailInner, styles.createLayout]}>
                <View style={[styles.frameItem, styles.frameItemLayout]} />
            </View>
            <View style={[styles.passwordInner, styles.createLayout]}>
                <View style={[styles.frameItem, styles.frameItemLayout]} />
            </View>

            <TextInput
                // onChangeText={(text) => setEmail(text)}
                // value={email}
                placeholder="Email Address"
                autoCapitalize='none'
                style={[styles.emailAddress, styles.dingoPosition]}
            />
            <TextInput
                // onChangeText={(text) => setPassword(text)}
                // value={password}
                secureTextEntry
                placeholder="Password"
                autoCapitalize='none'
                style={[styles.password, styles.dingoPosition]}
            /> */}
            <Image
                style={styles.ellipseIcon}
                contentFit="cover"
                source={require("../../../assets/images/ellipse-22.png")}
            />
            <Image
                style={styles.groupIcon}
                contentFit="cover"
                source={require("../../../assets/images/group-70.png")}
            />
            {/* <Image
        style={[styles.mailIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../../../assets/images/mail.png")}
      />
      <Image
        style={[styles.lockIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../../../assets/images/lock.png")}
      /> */}

            {/* <View style={{ width: '100%', alignItems: "center", top: 500 }}>
        <View style={styles.subtractIcon}>
          <Pressable
            onPress={() => {
            //   navigation.navigate(SCREENS.USERHOME);
            }}
            disabled={loading}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
      </View> */}

            {/* <View style={[styles.forgetPasswordWrapper, styles.forgetLayout]}>
        <Text style={[styles.forgetPassword, styles.forgetLayout]}>
          Forget Password?
        </Text>
      </View> */}
            <Image
                style={styles.oolzfw0RemovebgPreview1Icon}
                contentFit="cover"
                source={require("../../../assets/images/oolzfw0removebgpreview-11.png")}
            />
            <Text style={[styles.dingo, styles.dingoPosition]}>D I N G O</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    createLayout: {
        height: 45,
        position: "absolute",
        backgroundColor: Color.colorWhite,
    },
    frameBg: {
        backgroundColor: Color.colorDarkorange,
        left: 0,
    },
    loginTypo: {
        color: Color.colorWhite,
        fontFamily: FontFamily.fredokaMedium,
        fontWeight: "500",
        textAlign: "left",
        position: "absolute",
    },
    frameItemLayout: {
        width: 353,
        borderRadius: Border.br_3xs,
        height: 45,
        position: "absolute",
    },
    passwordTypo: {
        color: Color.colorDarkorange,
        textAlign: "left",
        fontFamily: FontFamily.fredokaRegular,
    },
    dingoPosition: {
        left: 90,
        fontSize: FontSize.size_xl,
        position: "absolute",
    },
    iconLayout: {
        width: 24,
        height: 24,
        position: "absolute",
        overflow: "hidden",
    },
    forgetLayout: {
        width: 232,
        position: "absolute",
    },
    goodDoggyBro1: {
        top: -4,
        left: -126,
        width: 668,
        height: 1179,
        position: "absolute",
    },
    orConnectWith: {
        top: 637,
        left: 107,
        width: 183,
        textAlign: "left",
        fontFamily: FontFamily.fredokaRegular,
        color: Color.colorBlack,
        fontSize: FontSize.size_6xl,
        position: "absolute",
    },
    frameChild: {
        borderRadius: Border.br_3xs,
        backgroundColor: Color.colorDarkorange,
        top: 0,
        height: 45,
        width: 318,
        position: "absolute",
    },
    login: {
        top: 8,
        left: 90,
        // textTransform: "uppercase",
        width: 194,
        fontSize: FontSize.size_xl,
        color: Color.colorWhite,
        fontFamily: FontFamily.fredokaMedium,
        fontWeight: "500",
    },
    register: {
        top: 8,
        left: 101,
        textTransform: "uppercase",
        width: 124,
        fontSize: FontSize.size_6xl,
        color: Color.colorWhite,
        fontFamily: FontFamily.fredokaMedium,
        fontWeight: "500",
    },
    rectangleParent: {
        top: 657,
        width: 318,
        borderRadius: Border.br_81xl,
        left: 40,
        height: 45,
    },
    frameItem: {
        top: -2,
        borderColor: Color.colorWhite,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.colorDarkorange,
        left: 0,
    },
    emailInner: {
        top: 298,
        left: 22,
        borderRadius: 150,
        width: 346,
    },
    passwordInner: {
        top: 378,
        left: 22,
        borderRadius: 150,
        width: 346,
    },
    createAnAccountChild: {
        top: 377,
        left: 20,
    },
    createAnAccountItem: {
        top: 712,
        borderColor: Color.colorDarkorange,
        borderWidth: 3,
        borderStyle: "solid",
        width: 318,
        borderRadius: Border.br_81xl,
        left: 40,
        height: 45,
    },
    loginWithGoogle: {
        top: 722,
        left: 126,
        textTransform: "capitalize",
        width: 212,
        fontSize: FontSize.size_xl,
        position: "absolute",
    },
    google1Icon: {
        top: 724,
        left: 92,
        width: 20,
        height: 20,
        position: "absolute",
    },
    emailAddress: {
        left: 128,
        top: 306,
        fontSize: FontSize.size_xl,
    },
    password: {
        top: 386,
        color: Color.colorDarkorange,
        textAlign: "left",
        fontFamily: FontFamily.fredokaRegular,
    },
    ellipseIcon: {
        top: -202,
        left: 244,
        width: 523,
        height: 523,
        position: "absolute",
    },
    groupIcon: {
        top: -376,
        left: 100,
        width: 536,
        height: 536,
        position: "absolute",
    },
    mailIcon: {
        left: 56,
        height: 24,
        top: 306,
    },
    lockIcon: {
        left: 58,
        height: 24,
        top: 386,
    },
    subtractIcon: {
        marginTop: 200,
        width: 200,
        height: 200,
    },
    forgetPassword: {
        fontSize: FontSize.size_xl,
        left: 0,
        top: 0,
        width: 232,
        textAlign: "left",
        color: Color.colorBlack,
        fontFamily: FontFamily.fredokaRegular,
    },
    forgetPasswordWrapper: {
        top: 625,
        left: 208,
        height: 24,
    },
    oolzfw0RemovebgPreview1Icon: {
        top: 180,
        left: 105,
        borderRadius: Border.br_95xl,
        width: 169,
        height: 183,
        position: "absolute",
    },
    dingo: {
        top: 400,
        lineHeight: 48,
        fontWeight: "800",
        fontFamily: FontFamily.poppinsExtraBold,
        textAlign: "center",
        color: Color.colorBlack,
        marginLeft: 60,
    },
    createAnAccount: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 23,
        elevation: 23,
        shadowOpacity: 1,
        borderRadius: Border.br_21xl,
        flex: 1,
        width: "100%",
        height: 844,
        overflow: "hidden",
        backgroundColor: Color.colorWhite,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    nextButton: {
        backgroundColor: Color.colorDarkorange,
        borderRadius: Border.br_3xs,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    nextButtonText: {
        color: Color.colorWhite,
        fontFamily: FontFamily.fredokaMedium,
        fontSize: FontSize.size_6xl,
        textTransform: "uppercase",
    },
});

export default index;