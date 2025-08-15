---
title: "Dynamicxyz Demo"
category: "Web3"
date: "2023-10-11 04:15:00"
desc: "Bridging Web2 and Web3: Simplifying Platform Authentication with Dynamic.xyz"
thumbnail: "/images/dynamicxyz/thumbnail.jpeg"
alt: "Dynamicxyz Demo DApp"
---

##Introduction

Blockchain technology's advent has catalyzed the emergence of decentralized applications (DApps), offering heightened levels of security, privacy, and control to users. This article explores the mechanics of On-Chain (Metamask, Rainbow, Coinbasewallet) and Off-Chain (Facebook, Google) platforms for authentication via [dynamic.xyz](https://dynamic.xyz), a robust platform for streamlined user onboarding.

---

###Table of Contents

- Getting to Know dynamic.xyz
- The SDK Suite
- Building a login/logout application using dynamic.xyz
- Connecting to the dynamic.xyz dashboard
- Wrapping Up

---

##Getting to know dynamic.xyz
Dynamic.xyz offers robust authentication and authorization solutions. They provide an exceptionally user-friendly onboarding process and highly flexible, fully functional developer tools. Additionally, their interactive dashboard is fully customizable to align with the specific UI/UX experience users aim to achieve.

One of their most groundbreaking features is the seamless integration of multiple wallets. Surprisingly, implementing this feature is extremely straightforward, requiring no manual coding. I'll delve into this in a bit.

---

##The SDK Suite

- Dynamic is compatible with React (v17 and upward) and NextJS (v12 and upward).
- For its SDK, Dynamic utilizes either **Ethers** or **Web3.js** libraries to interact with Ethereum blockchain. - Ethers.js has surpassed Web3.js as the primary library for establishing connections between decentralized applications (DApps) and smart contracts on EVM blockchains.

`npm install @dynamic-labs/sdk-react `

- All-Chains SDK (Complete) vs Modular SDK:
  The All-Chains SDK, `@dynamic-labs/sdk-react`, provides a comprehensive package with all features and wallet support. Nevertheless, if your aim is to minimize the bundle size by removing any redundant libraries from our SDK, you now have the option to select and use a specific set of new packages that cater to your preferences.

---

##Building a login/logout application using dynamic.xyz
Here, I will guide you through the process of building a sample project using the dynamic.xyz SDK. Additionally, I will share my thought process and insights regarding its implementation.

##Pre-requisites:
**_Ensure you have the following before proceeding:_**

Environmental_Id: Acquire this post sign-up on the [developer page](https://app.dynamic.xyz/). navigate to the [Developer Dashboard](https://app.dynamic.xyz/dashboard/developer) to obtain your `environmental_id`.

![Developer Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v52j5fbp1f4ehk2932wn.png)

**First step**
Initiate a React App

```bash
npx create-react-app dynamicxyz-demo-app
cd dynamicxyz-demo-app
npm start
```

**Second step**

```bash
npm install @dynamic-labs/sdk-react
```

---

**Third step**
**_Initialize the SDK in your Project_**

The `DynamicContextProvider` component serves to initialize the SDK and provide accessibility throughout the application. To ensure widespread access to Dynamic, it's advisable to position this component as high in the component tree as feasible.

The `EnvironmentId` is what you obtain from your Developer Dashboard as I mentioned earlier. The environment ID is required to identify your Sandbox or Live settings.

`Index.js`

```JavaScript

/...
import { DynamicContextProvider} from "@dynamic-labs/sdk-react";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DynamicContextProvider
    settings={{
      environmentId: "Your environmentID",
    }}
  >
    <App/>
  </DynamicContextProvider>
);

export default App;
```

---

- `useDynamicContext` A Dynamic React Context set via `DynamicContextProvider`.
- `setShowAuthFlow` Triggers the user's signature request.
- `user` Holds data regarding the authenticated person

`App.js`

```JavaScript
.../
import { useDynamicContext } from "@dynamic-labs/sdk-react";

function App() {
  const { setShowAuthFlow, user, handleLogOut } = useDynamicContext();
  if (!user) {
    return <Login setShowAuthFlow={setShowAuthFlow} />;
  }
  return <Dashboard user={user} handleLogOut={handleLogOut} />;
}

export default App;

```

---

**Flexibility of Logging in**
dynamic.xyz provides a variety of login functionality which is easy to setup in your Developer Dashboard.

`Login.js`

```JavaScript
.../

export default function Login({ setShowAuthFlow }) {
  return (
    <>
      <button onClick={() => setShowAuthFlow(true)}>
       Connect Wallet
      </button>
    </>
  );
}
```

---

**Fourth step**
**Logout Functionality**

- `handleLogOut:` Logs out the current user.
- `user.verifiedCredentials[0].address:` Retrieves the user's wallet address.
- `user.email:` Displays the user's email if logged in with email instead of a wallet.

`Dashboard.js`

```JavaScript
.../

export default function Dashboard({ user, handleLogOut }) {
  return (
    <div>
      <h1>Welcome !!!</h1>
      <p>
        {user.verifiedCredentials[0].address || user.email}
      </p>
      <div>
        <button
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

```

##Fifth step
**Great job!!!** You have successfully set up your first application with dynamic.xyz

---

At this point, it should look like this when you click on the connect Wallet button:

![Connect Wallet](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x78dknpj1vjrix89djtc.png)

##Connecting to the Dynamic Dashboard
**Logging into the Dashboard**
The Dynamic Developer Dashboard is developed using this same SDK, this offers over 320 wallets, or email for Login or Sign up.

**Sign in with Email or Social**
`Enable Email/Social Signup:` navigate to the Developer [Dashboard Configurations](https://app.dynamic.xyz/dashboard/configurations), and click on the Sign in with Email or Socials section:
![Developer Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r8bjxg28h629ygzgzgkv.png)
Click on the **_Enable Email/Social Sign up(No wallet)_**, this feature is for users that doesn't have a wallet.
![Email sign up](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jcov03ghc6oclpo3c0hk.png)

`Enable Email/Social Sign up + Magic.link:`

![Social sign up](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8d2vpi7ntfe9yycvc7ap.png)

**_You will need to setup [Magic.link](https://magic.link/)_** to enable the social media authentication with Dynamic.
Once you have logged in to [Magic.link](https://magic.link/), navigate to your Dedicated wallet, and obtain two credentials being the `PUBLISHABLE_API_KEY` and the `SECRET_KEY`
![Magic Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/08ea4wk8ixv9afu8beg2.png)

Once you have obtained both keys, input them in the Dynamic Developer Dashboard:
![Dynamic Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n3fjbmyidvfb3lh13wbh.png)

After adding the extra features from your dashboard it should look like this:

![Wallet connect](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pry279ndpwo5t6uuy81p.png)

---

##Wrapping up

In conclusion, the rapid evolution of blockchain technology has opened up exciting possibilities for transformative applications like those facilitated by Dynamic. By seamlessly integrating blockchain capabilities through their powerful SDK, developers can unlock a new realm of potential for their applications. The versatility offered by Dynamic, supporting popular frameworks like React and NextJS, as well as the option to choose between Ethers and Viem libraries, equips developers with the tools they need to tailor solutions to their precise needs.

In this article, we've provided a step-by-step guide to building a simple DApp using Dynamic. From initializing the SDK and integrating it into your project to connecting to the Dynamic Dashboard, you now possess the knowledge to embark on your web3-focused development journey.

Happy coding and innovating! 🚀

**Source Code:**
View the code and contribute to this project on [GitHub](https://github.com/davidadeola/dynamicxyz-demo-app).

Connect with me on [Twitter](https://twitter.com/DavidAdeola_) for more updates and discussions.
