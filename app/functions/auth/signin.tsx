import {
  GoogleSignin,
  statusCodes,
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import { supabase } from '../../lib/supabase';

interface SignInResult {
  id: string;
  email: string;
  last_signin: Date;
  pictureurl: string;
  error?: string;
}

export default async function signin(): Promise<SignInResult | { error: string }> {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
    webClientId: '81739700104-rdkps922ue2mitk1clrvo46trlv9hsvs.apps.googleusercontent.com',
  });

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.idToken,
      });

      if (error) {
        return { error: error.message };
      }

      const user = data?.user;
      return {
        id: user?.id || '',
        email: user?.email || userInfo.user.email || 'No email',
        last_signin: new Date(user?.last_sign_in_at || Date.now()), // Default to current date/time if undefined
        pictureurl: userInfo.user.photo || '', // Use photo from Google userInfo
      };
    } else {
      throw new Error('no ID token present!');
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
      console.error(error);
    }
    return { error: error.message || 'An unknown error occurred' };
  }
}
