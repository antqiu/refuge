# Refuge Project

### About

Refuge is a project that utilizies the Refuge Restrooms API that fetches data about bathrooms that are safe and accessible for trans and non-binary individuals. This website is easy to use and allows users to search for restrooms based on location and zip code, and users can also comment on existing restrooms.

### Distinctiveness and Complexity

When I came across the Refuge API on a list of free APIs on GitHub, I was intrigued at how unique it was. Most of the APIs were based on economy/food/etc, but this one was about accessible bathrooms instead. I noticed that the existing API was hard to work with and the existing website looked a bit outdated, so my plan for this project was to make an easy way for any user to interact with the API to get its information and more.

The parameters for the API only took in Longitude and Langitude to search, which proved to be a difficulty when proceeding with this project. After some research, I realized that I had to use the Geocoder API in order to first convert a Zip Code to Longitude and Langitude. Doing so exposed me to using the Google Cloud Console and creating my own API Keys. In addition to fetching the Refuge Restrooms API, the complexity from this project also stemmed from the Google Maps API. Generating the map itself also took in longitude and langitude, so there wasn't that much difficulty there since I had already found it prior. However, I had an issue where the function to create the map wouldn't run if it was in the same function as the DOMContentLoaded in my JavaScript. It had something to do with it being asynchronous, but I eventually found a workaround to it by including the JavaScript in the HTML and not in the same file as the JavaScript.

Not only that, I think the landing page was another difficulty. The course itself did not cover CSS as much and I wanted to make a nice landing page with text on top of a background image. My idea was to have a bathroom door in the center that was white and contrasting text in front of it. This would require the webpage to scale from the center to always keep the door visible. I had to watch several tutorials before I fully understood how to make it.

I also created a page where the user could view more of the details of a specific bathroom. The difficulty here was that I couldn't just look up the bathroom by ID since there was no GET Method for that. So I had to use another fetch request by longitude and langitude, which involved some hidden HTML where I set their value equal to them. By then, my JavaScript was getting very repetitive because I was fetching from the same API and just displaying them a little bit differently.

Furthermore, making the website mobile responsive was difficult. I spent the most time onn the navbar, where I wanted to change its style if the dimensions ever reached a certain size. I used the bootstrap hamburger icon and have the user click on that to collapse the rest of the tabs open.

Lastly, as for the DJango Models, I implemented both a User and a Comment feature, which was similar to previous projects. The way I made each comment was by storing each bathroom ID with the User and the time. I put each comment in most-recent order and displayed them normally.

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
