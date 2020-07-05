var showForPages = ["*://allegro.pl/*"];

chrome.contextMenus.create({
    id: "go-to-regular-auctions",
    title: "Przejdź do aukcji regularnych",
    contexts: ["page"],
    "documentUrlPatterns": showForPages
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId === "go-to-regular-auctions") {
            goToRegularAuctions(info.pageUrl)
        }
    }
);

function goToRegularAuctions(searchUrl) {
    chrome.tabs.executeScript(null, {code: getPageCountScript},
        async function (pageCount) {
            const parser = new DOMParser();
            // const url = searchUrl + "&p=" + pageCount;
            const url = searchUrl + "&p=" + 0;

            const response = await fetch(url)
            const html = await response.text()
            const doc = parser.parseFromString(html, 'text/html');

            const headers = doc.querySelectorAll("section._9c44d_3UJEh h2._9c44d_pEGMd")
            if (headers.length === 2) {
                alert("Zlamanie!")
            } else if (headers[0].innerHTML === "Oferty promowane") {
                alert("Promowane!")
            } else if (headers[0].innerHTML === "Oferty") {
                alert("Ofery!")
            } else {
                alert("Błąd!")
            }
        });
}


const getPageCountScript = `document.querySelector("span._1h7wt._1fkm6._g1gnj._3db39_3i0GV._3db39_XEsAE").innerHTML`;
