# Habitat

One of the biggest obstacles to building habits is that they often feel like work. Habitat from Team Habit aims to flip that notion on its head by giving users the tools they need for self-improvement. Habitat features cute virtual pets that users can keep happy and buy cosmetics for using the Friendship Points they receive after completing tasks. By treating task completion as a game rather than a chore, Habitat empowers users to complete their goals and have fun while doing so. We hope you enjoy bonding with your virtual pet in Habitat!
![Cat Image](https://github.com/Skumar30/Habitat/blob/master/habitat_app/src/assets/cat.png)

## Login Credentials

The following login credentials should be used in this app.

Username | Password | Details
| --- | --- | ---
|test_username | password1! | Used for most test cases
| test_case6 | password1! | Used for test case 6 (logout)
| new_username | password! | Account should be used for testing the sign-up functionality in the test cases


| Darin8 | pass123!!! | Used for wellness contract functionality (cases 20-24)
| new_1_testername | password1! | Account should be used for testing the sign-up functionality in the user story acceptance tests


## Requirements

To run this app you will need the following:
* Node
* Android Studio
* any JDK
## Installation


Since our app isn't actually deployed and runs on an emulator, we can simply clone the gitHub repo.
```bash
git clone https://github.com/Skumar30/Habitat.git
```

After cloning, navigate to the habitat_app folder and install the node modules for our front-end. 
```bash
cd Habitat/habitat_app
npm install
```

Next, navigate to our server and install node modules there as well
```bash
cd habitat_server
npm install
```

Lastly, we need to setup our IP address since the server will run on your computer.\
To find your ip address:\
**(Windows)**:
In command prompt: 
```bash
ipconfig
```
Specifically, we want the **IPv4 Address** under **Wireless LAN adapter WI-Fi 2:**

**(Mac)**:\
[Follow this link](https://osxdaily.com/2010/11/21/find-ip-address-mac/#:~:text=You%20can%20find%20any%20Macs,indicated%20in%20the%20screenshot%20below)


Once you have your IP Address, open up `../src/IP_ADDRESS.tsx` and replace `YOUR IPv4 Address Here` with your IP.

Your `IP_ADDRESS.tsx` should look something like this:
```javascript
export const IP_ADDRESS = '123.456.789.012';
```

## How to Run

To run the app, we need to do 3 things:
* start the server
* start the metro bundler
* launch the emulator

### Starting the server
Simply navigate to the server folder and start
```bash
cd habitat_app/habitat_server
npm start
```

### Starting the metro bundler
To launch our react-native app, **in a new terminal window** navigate to `habitat_app` and start
```bash
cd habitat_app/
npx react-native start
```
**Note:** On Macs, `react-native start` can be used instead of `npx react-native start`

### Launching the emulator
**In a new terminal window** navigate to `habitat_app` and launch the android emulator
```bash
cd habitat_app/
npx react-native run-android
```
**Note:** On Macs, `react-native run-android` can be used instead of `npx react-native run-android`

You will initially encounter a white screen on the emulator while the bundler loads the files.\
If the white screen persists:
* There may have been a problem with the bundler: enter `r` on the **Metro Bundler** terminal
* If that doesnt fix the problem, follow the above instructions to restart the metro bundler and emulator. Ensure that the bundler is started first.

## Known Bugs

There are currently no known bugs at this time.
