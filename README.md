Save Rendered HTML Chrome Extension
===================================

![Icon](icon128.png)

This Chrome extension allows you to save the fully rendered HTML of the current tab by clicking a button in the extension's popup.

Features
--------

*   Save the fully rendered HTML of the current tab as a file
*   Automatically generates a timestamped file name for the saved HTML

Demo
----

<!-- <iframe width="1280" height="519" src="https://www.youtube.com/embed/l-BVjc774sc" title="save rendered html chrome extension demo v1.1.1 20231107" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->

https://github-production-user-asset-6210df.s3.amazonaws.com/45612704/281200935-87347612-70a9-4d3e-9505-e1eb0529736f.mp4

Installation
------------

1.  Download or clone this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" in the top right corner if it's not already enabled.
4.  Click the "Load unpacked" button in the top left corner.
5.  Browse to the folder containing the extension files and select it.

The extension should now be installed and visible in your Chrome extensions list.

Usage
-----

1.  Visit a web page in Google Chrome.
2.  Click the extension's icon to open the popup.
3.  Click the "Save HTML" button to download the fully rendered HTML of the current tab as a file.

The file will be named `rendered_html_<timestamp>.html`, where `<timestamp>` is the current date and time in ISO 8601 format.

## Screenshots

![Screenshot 1](screenshots/screenshot-1.png)
![Screenshot 2](screenshots/screenshot-2.png)
![Screenshot 3](screenshots/screenshot-3.png)

<!-- Files -->
<!-- ----- -->
<!---->
<!-- *   `manifest.json`: The extension's manifest file that provides metadata and configuration. -->
<!-- *   `popup.html`: The HTML file for the extension's popup. -->
<!-- *   `popup.js`: The JavaScript file for the extension's popup, which handles button click events and communicates with the content script. -->
<!-- *   `icon48.png`: A 48x48 pixel icon for the extension. -->

<!-- License -->
<!-- ------- -->
<!---->
<!-- This project is released under the MIT License. See the [LICENSE](LICENSE) file for details. -->

## Troubleshooting

If the system's save file prompt doesn't appear when you click on the extension icon, try restarting Chrome. Reloading the extension (in dev mode) won't work.