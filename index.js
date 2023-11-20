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

function onContactMainSidebarOptionClick()
{

}

function onViewGithubRepoMainSidebarOptionClick()
{
    window.open("https://github.com/S10239861-NP/Portfolio-Development-Module-Blog", "_blank");
}

let mainSidebar = document.getElementById("mainSidebar");

let blogPostCards = document.getElementsByTagName("blog-post-card");

let contactMainSidebarOption = document.getElementById("contactMainSidebarOption");

let viewGithubRepoMainSidebarOption = document.getElementById("viewGithubRepoMainSidebarOption");

let sidebarOptionToHTMLElementMap = new Map();

/*
let mainSidebarChildListMutationObserver = new MutationObserver((mutations) =>
{
    for (const mutation of mutations)
    {
        if (mutation.type == "childList")
        {
            mainSidebar.setAttribute(
                "sidebar-height",
                window.getComputedStyle(mainSidebar).height + 500
            );
        }
    }
});

mainSidebarChildListMutationObserver.observe(mainSidebar, {
    childList: true
});
*/

contactMainSidebarOption.addEventListener("click", onContactMainSidebarOptionClick);

viewGithubRepoMainSidebarOption.addEventListener("click", onViewGithubRepoMainSidebarOptionClick);

for (let currentBlogPostCardIndex = 0; currentBlogPostCardIndex < blogPostCards.length; currentBlogPostCardIndex++)
{
    let currentBlogPostCard = blogPostCards.item(currentBlogPostCardIndex);

    let newSidebarOption = document.createElement("a");

    newSidebarOption.innerText = currentBlogPostCard.getAttribute("header");

    newSidebarOption.addEventListener("click", onSidebarOptionClick);

    newSidebarOption.classList.add("main-sidebar-option");

    mainSidebar.insertBefore(newSidebarOption, contactMainSidebarOption);

    sidebarOptionToHTMLElementMap.set(newSidebarOption, currentBlogPostCard);

    let currentBlogPostCardSubHeaders = currentBlogPostCard.getElementsByTagName("h3");

    for (let currentBlogPostCardSubHeaderIndex = 0; currentBlogPostCardSubHeaderIndex < currentBlogPostCardSubHeaders.length; currentBlogPostCardSubHeaderIndex++)
    {
        let newSidebarSubOption = document.createElement("a");

        newSidebarSubOption.innerText = currentBlogPostCardSubHeaders[currentBlogPostCardSubHeaderIndex].innerText;

        newSidebarSubOption.style["marginLeft"] = "10px";

        newSidebarSubOption.addEventListener("click", onSidebarOptionClick);

        newSidebarSubOption.classList.add("main-sidebar-option");

        mainSidebar.insertBefore(newSidebarSubOption, contactMainSidebarOption);

        sidebarOptionToHTMLElementMap.set(newSidebarSubOption, currentBlogPostCardSubHeaders[currentBlogPostCardSubHeaderIndex]);
    }
}



