# Contact Mobile app

Small contacts app that enables user to create, edit and delete contacts, as well as sort and filter them by name or age.

## Technologies used

- Node.js
- React Native
- MongoDB
- Express

## How to use

### Install project

```
cd client
npm install

cd server
npm install
```

### Run project

To run the project, you will need 3 terminals: one for the server, one for tunnelling with ngrok, and one for the client. Open a first terminal and run this command:

```
cd server
npm start
```

Open a second terminal and run:

```
cd server
npm run tunnel
```

Copy the http address given by ngrok into App.js, line 12, in the ngrokDomain variable:

```js
// Example:
export default function App() {
  const ngrokDomain = "http://3c5d-45-2-224-224.ngrok.io";

  const fetchContacts = () => {
    axios
      .get(`${ngrokDomain}/api/contacts`)
      .then((res) => {
        setContacts(res.data.data.contacts);
      })
      .catch((err) => console.log(err));
  };
```

Start the server and run the Expo app on your phone:

```
cd client
npm start
```

## Possible improvements

Even though all the core features are implemented, there are many improvements that this app can use

- Redesign the UI
- Not close modal when error
- Fix image bug
- Implement gender filter
- Implement image import when creating a new contact
- If the app grows, add Redux
- Refactor App.js

## Screenshots

![Home screen](https://github.com/mariam-hm/weusthem-test-dev/blob/master/screenshots/screen01.jpg "Home screen")
![Sorted list](https://github.com/mariam-hm/weusthem-test-dev/blob/master/screenshots/screen02.jpg "Sorted list")
![Create screen](https://github.com/mariam-hm/weusthem-test-dev/blob/master/screenshots/screen03.jpg "Create screen")
![Search](https://github.com/mariam-hm/weusthem-test-dev/blob/master/screenshots/screen04.jpg "Search")
![Edit screen](https://github.com/mariam-hm/weusthem-test-dev/blob/master/screenshots/screen05.jpg "Edit screen")
