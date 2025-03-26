React Native Product App

Prerequisites

Before running the project, ensure you have the following installed:

Node.js (Recommended: v18+)

npm or yarn (Package manager)

React Native CLI

Android Studio (For Android development)

Xcode (For iOS development - macOS only)

Installation

Follow these steps to set up and run the project:

1. Clone the Repository

git clone https://github.com/your-repository/ProductApp.git
cd ProductApp

2. Install Dependencies

npm install  # or yarn install

3. Set Up Android (If Running on Android)

Ensure you have:

Android Studio installed with an emulator or a physical device connected

ANDROID_HOME environment variable set up

USB Debugging enabled (for physical devices)

Then, run:

npx react-native start --reset-cache
npx react-native run-android

4. Set Up iOS (If Running on iOS - macOS Only)

Ensure you have:

Xcode installed

Cocoapods installed (sudo gem install cocoapods)

Then, run:

cd ios && pod install && cd ..
npx react-native start --reset-cache
npx react-native run-ios

Troubleshooting

1. Gradle Build Issues (Android)

cd android && ./gradlew clean && cd ..
npx react-native run-android

2. Metro Bundler Issues

npx react-native start --reset-cache

3. Dependency Issues (Missing Modules)

rm -rf node_modules package-lock.json yarn.lock
npm install  # or yarn install

4. Expo-Font or Vector Icons Not Found

npm install expo-font @expo/vector-icons

Features

Product Listing by Category

Search Functionality

Favorite Products

Product Details Page

Contributing

Feel free to fork the repository and submit pull requests. Make sure to follow best practices.

License

This project is licensed under the MIT License.

