Save Rendered HTML Chrome Extension
===================================

This Chrome extension allows you to save the fully rendered HTML of the current tab by clicking a button in the extension's popup.

Features
--------

*   Save the fully rendered HTML of the current tab as a file
*   Automatically generates a timestamped file name for the saved HTML

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