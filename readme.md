Running locally

For IOS

Do this first time + any time you change anything at the native level

## Setup

Add the google-services.json and GoogleService-Info.plist files from firebase

Running
We need this because firebase has been included. Everytime there is a change to package.json, you need to rerun these commands

```
npx expo run:ios
npx expo run:android
```

Starting the app

```
npm start
```

## Add to stores

```
eas build -p ios
    <string>2.0.3</string>
# For IOS, make sure the CFBundleShortVersionString number in ios/ScoutSkills/Info.plist is set to the version number in app.json
eas submit --platform ios

eas build -p android
eas submit --platform android
```
