Reflection:
1. Why is it dangerous to store passwords in plain text, and how does hashing prevent harm if the database is compromised?
Storing passwords in plain text is dangerous because anyone who gains access to the database can read the users' passwords directly. Attackers could use these passwords to access users' accounts, especially if they use the same password on other websites. Password hashing converts a password into a one-way hash that is difficult to reverse. In our project, bcrypt helps protect users because the database stores password hashes instead of their original passwords.

2. The login endpoint returns the same error for "user not found" and "wrong password." Why is this better than giving specific messages?
Returning the same error message for both cases helps protect user information. If the system gives different messages, attackers can discover which email addresses are registered. They could use this information to target existing accounts with further attacks. Using a general error message, such as "Invalid email or password," makes it harder to identify registered users.

3. In your own words, what does the middleware do on every protected request, and why is it better than putting token-checking code inside every route handler?
The authentication middleware checks whether a protected request contains a valid JWT in the Authorization header. It verifies the token and allows the request to continue only if the token is valid; otherwise, it returns an unauthorized response. Using middleware avoids repeating the same authentication code in every route handler. It also makes the application easier to maintain and helps ensure that protected routes use consistent authentication checks.

4. What is one thing that could still go wrong in this system, and how would you address it in a real application?
One possible problem is token theft, which could allow an attacker to access protected routes using someone else's token. In a real application, I would use HTTPS to protect data during transmission and keep tokens secure on the client side. I would also use a strong, randomly generated JWT secret stored in environment variables and never upload it to GitHub. Additionally, I would implement token expiration and a secure way to revoke or refresh tokens when necessary.
