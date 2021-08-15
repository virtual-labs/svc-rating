# Rating Service Plugin for Rating System of Virtual Lab Experiments.

## Requirements for the Plugin

The Plugin requires 3 empty **divs** with the following class names in the target HTML document that will carry the plugin.

- **rating-lab** : the div where the rating of the lab will be displayed
- **rating-experiment** : the div where the rating of the experiment will be displayed
- **rating-page** : the div where the rating of the page the user is on at the moment will be displayed

Apart from these, the plugin also requires information about the page. For this the plugin will look into the **meta** tags of the page. The important information the plugin looks for is the following:

- **lab_name** : Name of the lab, which will be important in displaying the rating of the lab
- **experiment_short_name** : Name of the experiment, which will be important in displaying the rating of the experiment
- **learning_unit** : Name of the learning unit or the experiment that the user will be rating
- **task_name**: Name of the task, i.e., _Aim_, _Theory_, etc. that the user will be rating

The plugin can be used by simple incorporating the js file in the script tag of the HTML doc.

For a sample page that satisfies all requirements, please look at [index.html](./index.html).

Apart from all the HTML requirements, the developer needs to provide the correct Google Sheets API URLs for their google sheets in the script.

## Submission of User Ratings

The ratings provided by the user are stored using **sessionStorage**. The same rating keeps updating every time the user rates the page. This limits unethical boosting/lowering of ratings by the user to a certain extent.

The ratings are only recorded when the **beforeunload** is invoked, i.e., when the user is leaving the page. This translates to events in which the user refreshes the page, closes the tab, or closes the entire browser window.

## Error Handling

The following erroneous scenarios have been taken care of by the script:

- The experiment/lab details are missing in the **meta** tags of the HTML doc
- The **fetch** request to Google Sheets API returns an error
- The corresponding lab/experiment/page credentials do not exist in the mentioned Google Sheet
- The experiment details that are necessary for recording the rating are missing
