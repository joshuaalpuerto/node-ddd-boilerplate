# Authentication

As your REST APIs must be stateless, so does your authentication layer. For this, **JWT (JSON Web Token) is ideal.**

JWT consists of three parts:

- **Header**, containing the type of the token and the hashing algorithm
- **Payload** containing the claims
- **Signature** (JWT does not encrypt the payload, just signs it!)

Adding JWT-based authentication to your application is very straightforward:

```js
  router.use(auth.authenticate())
```

After that, the API endpoints are protected with JWT. To access the protected endpoints, you have to provide the token in the `Authorization` header field.

```sh
  curl --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ" my-website.com
```

One thing that you could notice is that the JWT module does not depend on any database layer. This is the case because all JWT tokens can be verified on their own, and they can also contain time to live values.

**Also, you always have to make sure that all your API endpoints are only accessible through a secure connection using HTTPS.**
