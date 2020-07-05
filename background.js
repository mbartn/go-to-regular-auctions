var showForPages = ["*://allegro.pl/*"];

chrome.contextMenus.create({
    id: "go-to-regular-auctions",
    title: "Przejdź do aukcji regularnych",
    contexts: ["page"],
    "documentUrlPatterns": showForPages
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId == "go-to-regular-auctions") {
            goToRegularAuctions(info.pageUrl)
        }

    }
);

function goToRegularAuctions(searchUrl) {
    const Http = new XMLHttpRequest();
    const url = searchUrl + "&p=2";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        alert(Http.responseText)
    }
}

