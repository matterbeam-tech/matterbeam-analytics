# Matterbeam plugin for `analytics`

[Matterbeam](https://matterbeam.com/) Integration for [analytics](https://www.npmjs.com/package/analytics)

<details>
<summary>Click to expand</summary>

- [Installation](#installation)
- [How to use](#how-to-use)

</details>

## Installation

```bash
npm install analytics
npm install analytics-plugin-matterbeam
```

## How to use

The `analytics-plugin-matterbeam` package works in the browser and server-side in Node.js. To use, install the package, include in your project and initialize the plugin with [analytics](https://www.npmjs.com/package/analytics).

Below is an example of how to use the plugin.

```js
import Analytics from "analytics";
import matterbeam from "analytics-plugin-matterbeam";

const analytics = Analytics({
  app: "awesome-app",
  plugins: [
    matterbeam({
      apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      customer: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    }),
  ],
});

/* Track a page view */
analytics.page();

/* Track a custom event */
analytics.track("cart:product_purchased", {
  item: "Trading Cards",
  price: 20.99,
});

/* Identify a visitor */
analytics.identify("<USER_ID>", {
  firstName: "bill",
  lastName: "murray",
});
```

The Matterbeam plugin works with these analytic api methods:

- **[analytics.page](https://getanalytics.io/api/#analyticspage)** - Sends page views into Matterbeam
- **[analytics.track](https://getanalytics.io/api/#analyticstrack)** - Track custom events and send to Matterbeam
- **[analytics.identify](https://getanalytics.io/api/#analyticsidentify)** - Identify visitors and send details to Matterbeam

### Configuration options

| Option                                | description                             |
| :------------------------------------ | :-------------------------------------- |
| `apiKey` <br/>**required** - string   | API key for your matterbeam account     |
| `customer` <br/>**required** - string | Customer Id for your matterbeam account |
