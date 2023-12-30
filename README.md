# Refuge Project

### About

Refuge is a project that utilizies the Refuge Restrooms API that fetches data about bathrooms that are safe and accessible. This website is easy to use and allows users to search for restrooms based on location and zip code, and users can also comment on existing restrooms.

### How to Run

1. Download and unzip
2. Open terminal
3. Enter the Refuge directory
4. Run "python manage.py runserver"
5. Press Control + C to exit

Note: 

a) Input your own API Key in line 7 of search.js

b) Input your own API Key in line 18 of restroom.html

### Files Description

static\locate directory

- landing.css
  styling for the landing page
- styles.css
  styling for the rest of the website
- script.js
  javascript that gets the user's current location and displays bathrooms closest to them
- search.js
  javascript that takes a user's zip code from a search result and displays bathrooms closest to that
- map.js
  javascript that fetches the information for a specified bathroom

templates\locate directory

- index.html
  landing page
- layout.html
  collapsable navbar with linked scripts
- login.html/register.html
  user sign-in/sign-up
- near.html
  used to display list of bathrooms near the user
- restroom.html
  used to display details of a specific bathroom
- restrooms.html
  used to display list of bathrooms near a zipcode

- admin.py
  used to show database of users and comments
- urls.py
  list of urls
- views.py
  used to handle post/get requests
