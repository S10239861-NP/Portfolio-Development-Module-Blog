function shrinkMainSidebar(intervalState)
{
    let currentMainSidebarWidth = parseInt(getComputedStyle(mainSidebar).width.replace("px", ""));

    if (currentMainSidebarWidth > 0)
    {
        mainSidebar.style.width = (currentMainSidebarWidth - 1) + "px";

        updateToggleSidebarButtonPosition();

        return;
    }

    let currentMainSidebarLeftPadding = parseInt(
        getComputedStyle(mainSidebar).paddingLeft.replace("px", "")
    );

    if (currentMainSidebarLeftPadding > 0)
    {
        mainSidebar.style.paddingLeft = (currentMainSidebarLeftPadding - 1) + "px";

        updateToggleSidebarButtonPosition();

        return;
    }

    let currentMainSidebarRightPadding = parseInt(
        getComputedStyle(mainSidebar).paddingRight.replace("px", "")
    );

    if (currentMainSidebarRightPadding > 0)
    {
        mainSidebar.style.paddingRight = (currentMainSidebarRightPadding - 1) + "px";

        updateToggleSidebarButtonPosition();

        return;
    }

    clearInterval(intervalState.id);
}

function onToggleSidebarButtonMouseUp()
{
    let intervalState = new IntervalState();

    intervalState.id = setInterval(shrinkMainSidebar, 2, intervalState);
}

function initToggleSidebarButton()
{
    updateToggleSidebarButtonPosition();

    toggleSidebarButton.addEventListener("mouseup", onToggleSidebarButtonMouseUp);
}

function updateToggleSidebarButtonPosition()
{
    toggleSidebarButton.style["left"] = mainSidebar.getBoundingClientRect().width + "px";
}

let toggleSidebarButton = document.getElementById("toggle_side_bar_button");

let mainSidebar = document.getElementById("main_side_bar");

initToggleSidebarButton();
