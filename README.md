# 👑 Crownd Mobile App

### *Where every purchase is your crowning moment.*

![Expo](https://img.shields.io/badge/EXPO-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/REACT%20NATIVE-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Navigation](https://img.shields.io/badge/REACT%20NAVIGATION-6B52AE?style=for-the-badge&logo=react&logoColor=white)
![Razorpay](https://img.shields.io/badge/RAZORPAY-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)
![FastAPI](https://img.shields.io/badge/FASTAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![EAS Build](https://img.shields.io/badge/EAS%20BUILD-000020?style=for-the-badge&logo=expo&logoColor=white)

> Creator & Brand Mobile App · Dual-Role Portal · Purchase-Linked Cashback · Crownd Score Matching · Razorpay Wallet Checkout

*Real Buyers • Real Posts • Instagram-Verified Cashback • Dual Creator & Brand Experience • FastAPI Backend*

🔴 **LIVE BACKEND** — https://crownd3.onrender.com/ &nbsp;|&nbsp; 📱 **MOBILE REPO** — https://github.com/ju-pyjanvi/crownd_app &nbsp;|&nbsp; 🌐 **WEB REPO** — https://github.com/ju-pyjanvi/Crownd_Final

📊 **PITCH DECK** — https://drive.google.com/file/d/1f2fkKyGfWk420u_qOf79_BoVtlaq075y/view?usp=sharing

---

## 📌 What Is Crownd?

Crownd turns everyday micro-influencers — creators with **1,000+ Instagram followers** — into a brand's highest-trust, performance-linked marketing channel.

Creators **shop** at partner brands using their **Crownd Wallet**, **post** about their purchase on Instagram, and receive **real cashback** once verified. Brands pay **₹0 upfront content fees** and fund campaigns only when a verified purchase and post both happen.

---

## ✨ Mobile App Features

### 🎭 Dual-Role Entry Gate (`RoleSelectScreen`)
* **Creator Portal:** Mint & peach editorial palette (`#E8F4F0` / `#F3DCC8`) tailored for creators to track their Crownd Score, browse active campaigns, and cash back purchases.
* **Brand Portal:** Inverted crimson-halo theme (`#A82A4E` / `#6F1A32`) with sage-green action accents (`#7A9168`), showcasing unit economics, creator tiers, brand sign-up, and an escrow treasury wallet.

### 👑 Creator Experience
* **Crown Explore Drawer:** Custom SVG crown toggle on the Creator Sign-In screen granting instant access to **About Us** (cashback categories across Beauty, Fashion, Cafés, Fitness, and Tech) and **How It Works** (3-step flow + Crownd Score breakdown).
* **Crownd Score & Eligibility Ladder:** Real-time score tracking across **Crown** (`Coronet`), **Throne** (`Regalia`), and **Empire** (`Sovereign`) tiers.
* **Two-Step Campaign Flow (`BrandScreen`):** Pay for a partner brand purchase from your wallet, share on Instagram, and submit the post URL for verification and cashback release.
* **Password-Protected Cashback Vault (`WalletScreen`):** Masks wallet balance until password confirmation, supports instant top-ups via Razorpay WebView checkout, and filters transaction history (`All`, `Cashback`, `Top-ups`, `Payments`).

### 🏢 Brand Experience
* **Unit Economics & Tiers (`BrandHubScreen`):** Highlights **80%** lower campaign cost vs. agency spend, **1K+** real followers, **₹0** upfront content fees, and **10%** Crownd commission on verified sales.
* **Brand Onboarding (`BrandSignupScreen`):** Dedicated sign-up flow for partner brands to select target creator tiers and cashback offers.
* **Brand Escrow Wallet (`BrandWalletScreen`):** Tracks available campaign escrow pool, verified GMV, and commission-itemized ledger entries.

---

## 🗂️ Project Structure

```text
crownd_app/
├── App.js                        # Root navigation, role gate & font loader
├── app.json                      # Expo app config & Android package settings
├── eas.json                      # EAS Build profiles (preview APK & production AAB)
├── package.json                  # Dependencies & scripts
└── src/
    ├── config.js                 # Backend API base URL & Render cold-start timeout
    ├── theme.js                  # Color tokens, typography & tier metadata
    ├── components/
    │   ├── ui.js                 # Screen gradients, CrownIcon SVG, Cards, Pills & Buttons
    │   └── RazorpayCheckout.js   # Hosted Razorpay checkout inside React Native WebView
    ├── lib/
    │   ├── api.js                # Authenticated fetch wrapper & SecureStore session helpers
    │   └── auth.js               # Auth & role state context provider
    └── screens/
        ├── RoleSelectScreen.js   # Creator vs. Brand entry selector
        ├── AuthScreen.js         # Creator sign-in, application & Crown menu toggle
        ├── AboutUsScreen.js      # Platform overview & cashback categories
        ├── HowItWorksScreen.js   # 3-step guide
