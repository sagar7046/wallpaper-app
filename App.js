import React, { useEffect } from 'react';
import {
  StatusBar,
  PermissionsAndroid,
  Platform,
  NativeModules
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import themeReducer from './redux/themeReducer';
import { RootStack } from './src/rootStack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/homeScreen';
import { StackContainer } from './src/rootStack';
import PhotoCollection from './src/photosCollection';
const store = createStore(themeReducer);
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

const App = () => {

  const { ABC } = NativeModules;

  const configurePermission = async () => {
    if (Platform.OS == "android") {
      try {
        const permissionGranted = await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE', {
          title: "Wallpaper App",
          message: "Wallpaper app wants to read your storage to save the pictures",
          buttonNegative: "No",
          buttonPositive: "Yes",
          buttonNeutral: "Ask me later"
        })
        if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Now you can save the pictures into camera roll");
        } else {
          console.log("Sorry you won't be able to use this feature.");
        }
      }
      catch (error) {
        console.warn(error);
      }
    }
  }

  useEffect(() => {

    ABC.show()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    //ask for permission
    configurePermission();

    //create android channel..
    createNotificationChannel();

    const onFirebase = messaging().onMessage(async remoteMessage => {
      const notifeeData = remoteMessage;

      const { body, title } = notifeeData.notification;

      await notifee.displayNotification({
        title: `<p style="color: #4caf50;"><b>${title}</span></p></b></p> &#128576;`,
        body: `${body}`,
        android: {
          channelId: "wallpaper",
          color: '#4caf50',
          showTimestamp: true,
          smallIcon: "ic_small_icon",
          actions: [
            {
              title: "Yes",
              pressAction: {
                id: 'xps',
                mainComponent: "PhotoCollection"
              },
            },
            {
              title: "No",
              pressAction: { id: "12" }
            }
          ]
        }
      })
    })

    return onFirebase;
  }, [])

  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: "wallpaper",
      name: "Unspalash Wallpaper",
      lights: true,
      vibration: true,
      importance: AndroidImportance.HIGH,
      badge: true,
      description: "This is a description about the notification."
    })
  }

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer
          linking={{
            prefixes: ["demoapp://", "https://www.demoapp.com"],
            enabled: true,
            config: {
              screens: {
                Home: {
                  screens: {
                    view: {
                      path: "view/:userName",
                      parse: { userName: String }
                    }
                  }
                }
              }
            }
          }}
        >
          <RootStack></RootStack>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default (App);
