function shrinkMainSidebar(intervalState, shrinkSpeed)
{
    let currentMainSidebarWidth = parseInt(getComputedStyle(mainSidebar).width.replace("px", ""));

    if (currentMainSidebarWidth > 0)
    {
        let newMainSidebarWidth = currentMainSidebarWidth - shrinkSpeed;

        if (newMainSidebarWidth >= 0)
        {
            mainSidebar.style.width = newMainSidebarWidth + "px";
        }
        else
        {
            mainSidebar.style.width = "0px";
        }

        updateToggleSidebarButtonPosition();

        return;
    }

    let currentMainSidebarLeftPadding = parseInt(
        getComputedStyle(mainSidebar).paddingLeft.replace("px", "")
    );

    if (currentMainSidebarLeftPadding > 0)
    {
        let newMainSidebarLeftPadding = currentMainSidebarLeftPadding - shrinkSpeed;

        if (newMainSidebarLeftPadding >= 0)
        {
            mainSidebar.style.paddingLeft = newMainSidebarLeftPadding + "px";
        }
        else
        {
            mainSidebar.style.paddingLeft = "0px";
        }

        updateToggleSidebarButtonPosition();

        return;
    }

    let currentMainSidebarRightPadding = parseInt(
        getComputedStyle(mainSidebar).paddingRight.replace("px", "")
    );

    if (currentMainSidebarRightPadding > 0)
    {
        let newMainSidebarRightPadding = currentMainSidebarRightPadding - shrinkSpeed;

        if (newMainSidebarRightPadding >= 0)
        {
            mainSidebar.style.paddingRight = newMainSidebarRightPadding + "px";
        }
        else
        {
            mainSidebar.style.paddingRight = "0px";
        }

        updateToggleSidebarButtonPosition();

        return;
    }

    clearInterval(intervalState.id);
}

function onToggleSidebarButtonMouseUp()
{
    let intervalState = new IntervalState();

    intervalState.id = setInterval(shrinkMainSidebar, 1, intervalState, 2);
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

let toggleSidebarButton = document.getElementById("toggleSideBarButton");

let mainSidebar = document.getElementById("mainSideBar");

initToggleSidebarButton();
