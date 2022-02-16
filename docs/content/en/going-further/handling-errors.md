---
title: Handling Errors
subtitle: "Discover how to handle errors from Strapi. 💡"
description: "Discover how to handle errors from Strapi. 💡"
position: 9
category: "💡 Going Further"
---

Thanks to **Strapi v4**, handling errors is no longer a huge waste of time 🙌🏻
You have now a well formated error object that has the follwing format:

```js
{
  data: null,
  error: {
    status: "", // HTTP status
    name: "", // Strapi error name ('ApplicationError' or 'ValidationError')
    message: "", // A human reable error message
    details: {
      // error info specific to the error type
    }
  }
}
```

> To know more about it, see [Strapi Error Handling](https://docs.strapi.io/developer-docs/latest/developer-resources/error-handling.html#rest-errors)
