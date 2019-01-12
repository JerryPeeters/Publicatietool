Defines app routes and their logic.

Requests and responses should never leave middleware and controllers. 

One file per logical part of the application, not per page.
For example: comments/all and comments/new could be called from a different page.

A model should never directly access the database.
