Represents data, implements business logic and handles storage. 

Every model should be independent of other models and of the outside world. They shouldn't
need to know about other models or the controllers that use them.

At least one file per type of data, don't mix.

Models should never return http errors but model specific errors. http  should never
reach models. 

Example: 
a user model which can:
    create user in db
    fetch user from db
    fetch everything by the user from db
    fetch all users
    Authenticate a user
    Change a password

But do comments in a different model, because datatype is model not user.
