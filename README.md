# Matterbeam Analytics

`matterbeam-analytics` is an analytics client for sending events to your [Matterbeam](https://matterbeam.com/) instance.

This client is built using the [analytics](https://www.npmjs.com/package/analytics) package.

## Installation

```bash
npm install matterbeam-analytics
```

## Usage

```js
import matterbeam from "matterbeam-analytics";

const analytics = matterbeam({
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  customer: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
});

/* Track a page view */
analytics.page();

/* Track a custom event */
analytics.track("cart:product_purchased", {
  item: "Trading Cards",
  price: 20.99,
});

/* Identify a user */
analytics.identify("<USER_ID>", {
  firstName: "Bill",
  lastName: "Murray",
});
```

### Configuration options

| Option                                | description                             |
| :------------------------------------ | :-------------------------------------- |
| `apiKey` <br/>**required** - string   | API key for your matterbeam account     |
| `customer` <br/>**required** - string | Customer Id for your matterbeam account |
