# 🛒 Shopee Total Spent Calculator

A simple, safe, and efficient JavaScript snippet to calculate your total spending history on Shopee.

This project is an updated and modernized version (ES6 Async/Await) of the original script by **[epool86](https://github.com/epool86/calculateshopee)**.

## 🚀 Features

* **Safe & Private:** No data is sent to external servers. Everything runs locally in your browser.
* **Async & Rate Limited:** Includes delays between requests to prevent Shopee from blocking your connection (Anti-429).
* **Dynamic Currency:** Automatically formats currency based on your locale (e.g., ₱ for PH, RM for MY).
* **Detailed Logs:** Detailed console logs showing individual items and prices.

## 📋 How to Use

1.  Login to your Shopee account on your desktop browser.
2.  Navigate to the **[My Purchase > Completed](https://shopee.ph/user/purchase/?type=3)** page.
    * PH: `shopee.ph/user/purchase/?type=3`
    * MY: `shopee.com.my/user/purchase/?type=3`
    * SG: `shopee.sg/user/purchase/?type=3`
3.  Press **F12** (or `Right Click` > `Inspect`) to open Developer Tools.
4.  Click on the **Console** tab.
5.  **Important:** If you see a warning, type `allow pasting` and hit Enter. This is a browser security feature.
6.  Copy the code from `script.js` in this repository.
7.  Paste it into the console and press **Enter**.
8.  Wait for the calculation to finish!

## ⚠️ Disclaimer

This script is for **educational purposes only**. It is not affiliated with, endorsed by, or connected to Shopee. Use this script at your own risk.

## 🔒 Privacy

This script **does not** collect your password, credit card info, or personal data. It only reads the "Order History" visible on your screen and sums the numbers. You can audit the code in `script.js` to verify this.

## 🤝 Credits

* Based on the original work by [epool86/calculateshopee](https://github.com/epool86/calculateshopee).
