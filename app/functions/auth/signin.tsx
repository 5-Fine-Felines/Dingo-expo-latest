// SignInButton.js
import auth from '@react-native-firebase/auth';
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';


type UserInfo = {
    email: string;
    name: string | null;
    id: string;
    photo: string | null;
  };

GoogleSignin.configure({
    webClientId: '714952557855-ajpi4eanfuasc0987846ouds4sp7drbc.apps.googleusercontent.com',
});


export default async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the user's ID token and other info
    const userInfo = await GoogleSignin.signIn();
  
    // Extract the user info
    const { idToken, user } = userInfo;
    // const { email, name, id, photo } = user;
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
  
    // Return the user info
    return { user };
  }



