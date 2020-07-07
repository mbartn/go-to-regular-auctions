const showForPages = ["*://allegro.pl/*"];
const pageType = Object.freeze({"promotedOnly": 1, "regularOnly": 2, "mixed": 3})

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'allegro.pl'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


chrome.contextMenus.create({
    id: "go-to-regular-auctions",
    title: "Przejdź do aukcji regularnych",
    contexts: ["page"],
    "documentUrlPatterns": showForPages
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId === "go-to-regular-auctions") {
            goToRegularAuctions(info.pageUrl, tab.id)
        }
    }
);


/*
* Alghoritm:
* if(firstPage ==
*
* val pages
*
*
*  if(pages = 1)
*    return
*  else if pages < 10
*   doBinarySearch()
*  else
*     pagesToFetch = 1/4x, 2/4x, 3/4x, x
*     pages  = fetchAll(pagesToFetch)
*     pages.foreach
*
*
*
*
*
* */


function goToRegularAuctions(searchUrl, tabId) {
    chrome.tabs.sendMessage(tabId, {text: 'get_document'}, (document => {
        const parser = new DOMParser();
        const currentSite = parser.parseFromString(document, 'text/html')
        const page = currentSite.querySelector("span._1h7wt._1fkm6._g1gnj._3db39_3i0GV._3db39_XEsAE").innerHTML
        const pageType = getPageType(currentSite)

        console.log(page);
        console.log(pageType);

        goToSectionWithClass("_9c44d_3UJEh", tabId)

        /*            const url = searchUrl + "&p=" + pageCount;
                    const urlParams = new URLSearchParams(searchUrl);
                    urlParams.set(p, 0)

                    const response = await fetch(url)
                    const html = await response.text()

                    const doc = parser.parseFromString(html, 'text/html');*/
    }));
}


function goToSectionWithClass(id, tabId) {
    chrome.tabs.sendMessage(tabId, {text: 'go_to_section', id: id})
}

function getPageType(document) {
    const headers = document.querySelectorAll("section._9c44d_3UJEh h2._9c44d_pEGMd")
    if (headers.length === 2) {
        return pageType.mixed
    } else if (headers[0].innerHTML === "Oferty promowane") {
        return pageType.promotedOnly
    } else if (headers[0].innerHTML === "Oferty") {
        return pageType.regularOnly
    } else {
        throw Error("Can't detect page type!")
    }
}