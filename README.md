# Lit Based Rating Web Component for Virtual Labs
----

This repository contains the source code for the rating web component for virtual labs. The web component is written and packaged as a lit component, with some customisable parameters for the web-component.

The rating component is further split into the following components:

1. **`rating-display`** : This component has the display of the submitted rating as `stars`, it reads the data from the google sheet using the sheet API. 
2. **`rating-submit`** : This packs the Rate experiment button and the rating-modal, which could be placed on the experiment page and which is used for collecting the rating of the web component, and submits the rating to the google analytics, and gets stored into the google sheets.

## Features 

The following are the features of the rating web-component:

- **rating-display** : 
    - the `rating-display` component could be used separately for displaying the rating of the given experiment,
    - the sheet api url could be specified as `experimentURL` alongside the given component as shown, 
    example usage: 

        `<rating-display experimentURL=<your sheet API url>></rating-display>`
    - using the above specified method the star rating could be encorporated at the desired place.
- **rating-submit** : 
    The `rating-submit` buttons comes with the following parameters : 
    - The number of stars could be varied depending on the use case, by default it being set to 5
    - The title of the rating modal could be varied, and passed as parameter along the component.
    example usage: 
        `<rating-submit title="<some title>"></rating-submit>`
- **rating-input** : 
    The 
# Events 

- on submitting the rating, an event named `vl-rating-submit` is created, that is later captured by the GA4 analytics, and later stored into the google sheet.
<!-- # Rating Web Component 

- A rating web component built using lit.js 
- Easy to use web component , for using the web component in your file , 
- import the `index.js` as module in your html document and use the created web component by using the tags `<rating-modal></rating-modal>`

### Display the rating
- import the js file "display_rating.js" as `<script type="module" src="display_rating.js"></script>` in your html head , along with the style sheet `<link rel="stylesheet" href="node_modules/lit-fontawesome/css/font.css" />`.
- use the web component by suppliying it with the parameters like `<display_rating title=<title> numberOfStars=<numberOfStars> rating=<rating>></display_rating>`
- By default 5 is the number of stars , you can supply a fraction rating and it will round up to nearest half to display the rating
 -->
