1: Mention two parts of Express that you learned about this week.
Express is what helps manage the routes and route handlers. Express is what gives us access to the middleware we build and use.

2: Describe Middleware?
Middleware are just functions with access to "the homies" a.k.a. error, req, res, and next.

3: Describe a Resource?
A resource is the part of the application that houses all the functionality that the routes are built off of.

4: What can the API return to help clients know if a request was successful?
The API can return status codes to let the client know all sorts of things. Such as, if it was successful, if it failed and why, or if it is a teapot. 'res.status(418).json({ message: I can't do that because I am a teapot. })'

5: How can we partition our application into sub-applications?
We can partition our application by building out dedicated routers that only handle a specific set of data within the application.
