# Rating Web Component 

- A rating web component built using lit.js 
- Easy to use web component , for using the web component in your file , 
- import the `index.js` as module in your html document and use the created web component by using the tags `<rating-modal></rating-modal>`

### Display the rating
- import the js file "display_rating.js" as `<script type="module" src="display_rating.js"></script>` in your html head , along with the style sheet `<link rel="stylesheet" href="node_modules/lit-fontawesome/css/font.css" />`.
- use the web component by suppliying it with the parameters like `<display_rating title=<title> numberOfStars=<numberOfStars> rating=<rating>></display_rating>`
- By default 5 is the number of stars , you can supply a fraction rating and it will round up to nearest half to display the rating
