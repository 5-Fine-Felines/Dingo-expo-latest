import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'; // Assuming Firebase for user management
import { Button } from 'react-native';

// ... other imports

interface GoogleUserInfo {
  uid: string;
  displayName: any;
  email: any;
  imageUrl?: any; // Optional for profile picture
  lastLoginDate?: Date; // Optional for last login date (requires additional setup)
}

GoogleSignin.configure({
    webClientId: "714952557855-ajpi4eanfuasc0987846ouds4sp7drbc.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    
   
  });


const _signIn = async (): Promise<GoogleUserInfo | undefined> => {
  try {
    await GoogleSignin.hasPlayServices(); // Attempt to resolve missing Play Services

    const userInfo = await GoogleSignin.signIn();

    if (!userInfo || !userInfo.user) {
      return undefined; // Handle cases where user cancels or an error occurs
    }

    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    const firebaseUser = await auth().signInWithCredential(googleCredential);

    // Extract user information from Firebase or Google Sign-In response
    const { uid, displayName, email, photoURL } = firebaseUser.user;

    // Optionally, retrieve last login date (requires server-side logic):
    // - Store last login timestamp in a database on successful sign-in
    // - Retrieve and update the date upon subsequent sign-ins

    return { uid, displayName, email, imageUrl: photoURL };
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.warn('User cancelled the login flow');
          break;
        case statusCodes.IN_PROGRESS:
          console.warn('Sign-in operation already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error('Play Services not available or outdated');
          break;
        default:
          console.error('An error occurred:', error);
      }
    } else {
      console.error('An error unrelated to Google Sign-In occurred:', error);
    }

    return undefined;
  }
};

export const MyButton = () => {
  const handlePress = async () => {
    const user = await _signIn();

    if (user) {
      console.log('Signed in user:', user);
      // Handle successful sign-in (e.g., navigate to profile screen)
    } else {
      // Handle sign-in cancellation or error
    }
  };

  return (
    <Button title="Sign in with Google" onPress={handlePress} />
  );
};



