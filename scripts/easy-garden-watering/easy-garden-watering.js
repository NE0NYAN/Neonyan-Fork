/*
Author: @NE0NYAN (Github) | @Neonyan (@Jkbg) (Pokefarm)
A userscript that adds some quality of life changes to the garden. The main one is for easier watering:
Easy Garden Watering: Makes the 'Water Plant' and 'Harvest Plant' buttons much larger & stacks them on top of one another. Also hides these buttons when clicked. They can be returned by refreshing the page or using the 'refresh' button.
If you find errors in the code, you can use github to report them OR you can use the forum thread on PFQ in the guides category dedicated to this script. [https://pfq.link/~-BV6]
*/

/* @TODO
    - Wrangle Harvest Popup
*/

(function () {
    "use strict";

    // Verify that the current URL is the garden page
    if (!/^\/garden/.test(location.pathname)) return;

    console.log("Easy Garden Watering Loaded");

    /* ---- Variables ---- */
    console.log("-- Start Variables --");

    // For Bigger Buttons
    let plantBerry = document.getElementById("plantberry");
    let plantSame = document.getElementById("plantsame");
    let plantControls = plantSame.parentElement;
    let waterAll = document.getElementById("waterall");
    let harvestAll = document.getElementById("harvestall");
    let waterHarvestControls = waterAll.parentElement;

    // For Watering Functionality
    let scriptToggle = false;
    let toggleBtn;
    let gardenHeader = document.querySelectorAll("#garden > .panel > h3")[1];
    let gardenUl = document.querySelectorAll("#garden_content > ul")[0];
    let gardenUlLi = document.querySelectorAll("#garden_content > ul > li");
    let cmd = document.querySelectorAll(".cmd");
    let cmdBtn = document.querySelectorAll(".cmd > button");
    let uproot = document.querySelectorAll(".uproot");
    let uprootBtn = document.querySelectorAll('[data-action="uproot"]');
    let harvestBtn = document.querySelectorAll('[data-action="harvest"]');
    let divStatus = document.querySelectorAll("#garden_content > ul > li> div.status");
    let reloadgarden = document.getElementById("reloadgarden");
    let EGWControls;
    let EGWTitle;
    let EGWText;

    /* ---- DOM Elements ---- */
    console.log("-- Start Adding Dom Elements --");

    // Create Easy Garden Watering Controls Panel
    EGWControls = addElement("div", "", "EGW-Controls", "Added Easy Garden Watering Controls Div Element");
    // Insert Easy Garden Watering Controls Panel
    gardenHeader.insertAdjacentElement("beforebegin", EGWControls);
    EGWControls = document.getElementById("EGW-Controls");
    EGWControls.classList.add("panel");
    EGWControls.style.display = "flex";
    EGWControls.style.flexWrap = "wrap";
    EGWControls.style.justifyContent = "space-between";
    EGWControls.style.alignContent = "center";
    EGWControls.style.gap = "8px";
    EGWControls.style.border = "none";
    EGWControls.style.marginBottom = "4px";
    console.log("EGWControls =");
    console.log(EGWControls);

    // Create Controls h3
    EGWTitle = addElement("h3", "Easy Garden Watering Controls", "EGW-Title", "Created the Easy Garden Watering Controls Title");
    // Insert Controls h3
    EGWControls.insertAdjacentElement("afterbegin", EGWTitle);
    EGWTitle = document.getElementById("EGW-Title");
    EGWTitle.style.width = "100%";
    EGWTitle.style.marginLeft = "-4px";
    EGWTitle.style.marginRight = "-4px";
    EGWTitle.style.borderRadius = "0";
    console.log("EGWTitle =");
    console.log(EGWTitle);

    // Create Controls p
    EGWText = addElement("p", "Press the toggle button to turn this script on or off!", "EGW-Text", "Created the Easy Garden Watering Controls Text");
    // Insert Controls p
    EGWTitle.insertAdjacentElement("afterend", EGWText);
    EGWText = document.getElementById("EGW-Text");
    console.log("EGWText =");
    console.log(EGWText);

    // Create Controls button
    toggleBtn = addElement("button", "Toggle", "EGW-Toggle", "Created the Easy Garden Watering Toggle Button");
    // Insert Controls button
    EGWText.insertAdjacentElement("afterend", toggleBtn);
    toggleBtn = document.getElementById("EGW-Toggle");
    toggleBtn.style.flexGrow = "2";
    console.log("toggleBtn =");
    console.log(toggleBtn);

    // Create Flavor Text
    let flavorText = addElement("p", "Press 'Reload' or 'Toggle' to return to normal garden view!", "EGW-Flavor-Text", "Created the Easy Garden Watering Flavor Text");
    flavorText.style.textAlign = "center";
    flavorText.style.fontStyle = "italic";

    // Create Harvest Warning
    let harvestWarning = addElement("p", "This berry is ready to harvest! Please use the 'harvest all' button.", "Created the Harvest Warning Element");
    harvestWarning.style.textAlign = "center";
    harvestWarning.style.fontStyle = "italic";

    // Change Reload Function
    reloadgarden.addEventListener("click", function (e) {
        e.preventDefault();
        location.reload();
        return false;
    });

    /* ---- Functions ---- */

    // addElement Function Definition
    function addElement(elementType, textContent, IDName, consoleLog) {

        // Create new div element
        let newElm = document.createElement(elementType);

        // Add div content
        let newContent = document.createTextNode(textContent);

        // Add text to content
        newElm.appendChild(newContent);

        // Add ID
        newElm.id = IDName;

        console.log(consoleLog);
        return newElm;
    };

    /* ---- Bigger Buttons ---- */

    plantControls.style.display = "flex";
    plantControls.style.justifyContent = "center";
    waterHarvestControls.style.display = "flex";
    waterHarvestControls.style.justifyContent = "center";

    plantBerry.style.padding = "1.5em";
    plantBerry.style.width = "45%";
    plantSame.style.padding = "1.5em";
    plantSame.style.width = "45%";
    waterAll.style.padding = "1.5em";
    waterAll.style.width = "45%";
    harvestAll.style.padding = "1.5em";
    harvestAll.style.width = "45%";

    /* ---- Easy Watering ---- */

    /* Script Toggle function & eventlistener */
    toggleBtn.addEventListener("click", function () {
        scriptToggle = !scriptToggle;

        // Script On/Off Logic
        if (scriptToggle == true) {
            /* Turn script on */

            // Insert Flavor Text
            gardenUl.insertAdjacentElement("beforebegin", flavorText);


            // CSS Adjustments

            // Fix size of the full garden UL element
            gardenUl.style.position = "relative";
            gardenUl.style.height = "200px";
            gardenUl.style.margin = "10px";
            gardenUl.style.display = "flex";
            gardenUl.style.flexWrap = "wrap";
            gardenUl.style.alignItems = "center";
            gardenUl.style.justifyContent = "center";

            // Change the style of each garden Li element to be the full size of the garden UL element
            gardenUlLi.forEach(li => {
                li = li.style;

                li.display = "flex";
                li.position = "absolute";
                li.boxSizing = "border-box";
                li.color = "transparent";
                li.width = "100%";
                li.height = "100%";
                li.overflow = "hidden";
            });

            // Hide every other div in each garden LI
            divStatus.forEach(div => {
                div = div.style;

                div.display = "none";
            });

            // Change uproot div to be the full size of it's parent (garden ul>li)
            uproot.forEach(div => {
                div = div.style;

                div.boxSizing = "border-box";
                div.zIndex = "10";
                div.height = "50px";
                div.width = "50px";
                div.margin = "0.2em";
                div.top = "0";
                div.left = "0";
            });

            // Change uprootBtn to be the full size of it's parent (uproot)
            uprootBtn.forEach(btn => {
                btn.style.fontSize = "25pt";
                btn.style.boxSizing = "border-box";
                btn.style.height = "100%";
                btn.style.width = "100%";
                btn.style.borderRadius = "0";

                // Water plants button hides on click
                btn.addEventListener("click", function () {
                    btn.closest("ul>li").style.display = "none";
                    btn.getAttribute("disabled", true);
                });
            });

            // Change cmd div to be the full size of it's parent (garden ul>li)
            cmd.forEach(div => {
                div = div.style;

                div.boxSizing = "border-box";
                div.height = "100%";
                div.width = "100%";
                div.top = "0";
                div.left = "0"
            });

            // Change cmdBtn to be the full size of it's parent (cmd)
            cmdBtn.forEach(btn => {
                if (btn.getAttribute("data-action") == "harvest") {
                    btn.parentElement.parentElement.style.display = "none";
                    btn.parentElement.parentElement.insertAdjacentElement("beforebegin", harvestWarning);
                }
                btn.style.textTransform = "capitalize";
                btn.style.fontSize = "32pt";
                btn.style.boxSizing = "border-box";
                btn.style.height = "100%";
                btn.style.width = "100%";
                btn.style.borderRadius = "0";

                // Water plants button hides on click
                btn.addEventListener("click", function () {
                    btn.closest("ul>li").style.display = "none";
                    btn.getAttribute("disabled", true);

                    // If button is for harvesting
                });

            });
        } else {
            console.log(scriptToggle);
            /* Turn script off */

            // Remove Flavor Text
            flavorText.remove();

            // CSS Adjustments

            // Default back to original of all CSS
            gardenUl.style.position = "";
            gardenUl.style.height = "";
            gardenUl.style.margin = "";
            gardenUl.style.display = "";
            gardenUl.style.flexWrap = "";
            gardenUl.style.alignItems = "";
            gardenUl.style.justifyContent = "";

            gardenUlLi.forEach(li => {
                li = li.style;

                li.position = "";
                li.boxSizing = "";
                li.color = "";
                li.width = "";
                li.height = "";
                li.overflow = "";
                li.display = "inline-block";
            });

            divStatus.forEach(div => {
                div = div.style;

                div.display = "";
            });

            // Change uproot div to be the full size of it's parent (garden ul>li)
            uproot.forEach(div => {
                div = div.style;

                div.boxSizing = "";
                div.zIndex = "";
                div.height = "";
                div.width = "";
                div.margin = "";
                div.top = "";
                div.left = "";
            });

            // Change uprootBtn to be the full size of it's parent (uproot)
            uprootBtn.forEach(btn => {
                btn.style.fontSize = "";
                btn.style.boxSizing = "";
                btn.style.height = "";
                btn.style.width = "";
                btn.style.borderRadius = "";

                // Water plants button hides on click
                btn.removeEventListener("click", function () {
                    btn.closest("ul>li").style.display = "none";
                    btn.getAttribute("disabled", true);
                });
            });

            cmd.forEach(div => {
                div = div.style;

                div.boxSizing = "";
                div.height = "";
                div.width = "";
                div.top = "";
                div.left = "";
            });

            cmdBtn.forEach(btn => {

                btn.style.fontSize = "";
                btn.style.boxSizing = "";
                btn.style.height = "";
                btn.style.width = "";
                btn.style.borderRadius = "";
                btn.style.borderRadius = "";

                // Water Plants Button Disappear On Click Event Listener Removal
                btn.removeEventListener("click", function () {
                    btn.closest("ul>li").style.display = "none";
                    btn.getAttribute("disabled", true);
                });
            });
        };
    });

})();
