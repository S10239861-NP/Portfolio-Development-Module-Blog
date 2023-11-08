function onSidebarOptionClick(eventObj)
{
    let mappedHTMLElement = sidebarOptionToHTMLElementMap.get(eventObj.target);

    let targetScrollTop = mappedHTMLElement.offsetTop;

    if (mappedHTMLElement.tagName != "BLOG-POST-CARD")
    {
        targetScrollTop -= 8;
    }

    if (mappedHTMLElement != undefined)
    {
        window.scroll(
            {
                left: 0,
                top: targetScrollTop,
                behavior: "smooth"
            }
        );
    }
}

let mainSidebar = document.getElementById("mainSidebar");

let blogPostCards = document.getElementsByTagName("blog-post-card");

let contactSidebarOption = null;

let sidebarOptionToHTMLElementMap = new Map();

for (let currentSidebarOptionIndex = 0; currentSidebarOptionIndex < mainSidebar.childNodes.length; currentSidebarOptionIndex++)
{
    let currentSidebarOption = mainSidebar.childNodes.item(currentSidebarOptionIndex);

    if (currentSidebarOption.innerText == "Contact")
    {
        contactSidebarOption = currentSidebarOption;

        break;
    }
}

for (let currentBlogPostCardIndex = 0; currentBlogPostCardIndex < blogPostCards.length; currentBlogPostCardIndex++)
{
    let currentBlogPostCard = blogPostCards.item(currentBlogPostCardIndex);

    let newSidebarOption = document.createElement("a");

    newSidebarOption.innerText = currentBlogPostCard.getAttribute("header");

    newSidebarOption.addEventListener("click", onSidebarOptionClick);

    newSidebarOption.classList.add("main-sidebar-option");

    mainSidebar.insertBefore(newSidebarOption, contactSidebarOption);

    sidebarOptionToHTMLElementMap.set(newSidebarOption, currentBlogPostCard);

    let currentBlogPostCardSubHeaders = currentBlogPostCard.getElementsByTagName("h3");

    for (let currentBlogPostCardSubHeaderIndex = 0; currentBlogPostCardSubHeaderIndex < currentBlogPostCardSubHeaders.length; currentBlogPostCardSubHeaderIndex++)
    {
        let newSidebarSubOption = document.createElement("a");

        newSidebarSubOption.innerText = currentBlogPostCardSubHeaders[currentBlogPostCardSubHeaderIndex].innerText;

        newSidebarSubOption.style["marginLeft"] = "10px";

        newSidebarSubOption.addEventListener("click", onSidebarOptionClick);

        newSidebarSubOption.classList.add("main-sidebar-option");

        mainSidebar.insertBefore(newSidebarSubOption, contactSidebarOption);

        sidebarOptionToHTMLElementMap.set(newSidebarSubOption, currentBlogPostCardSubHeaders[currentBlogPostCardSubHeaderIndex]);
    }
}



