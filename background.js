var showForPages = ["*://allegro.pl/*"];

chrome.contextMenus.create({
    id: "go-to-regular-auctions",
    title: "Przejdź do aukcji regularnych",
    contexts: ["page"],
    "documentUrlPatterns": showForPages
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "go-to-regular-auctions") {
        window.alert("yay!");
    }
});