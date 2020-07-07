chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    switch (msg.text) {
        case('get_document'): {
            sendResponse(document.body.innerHTML);
            break;
        }
        case('go_to_section'): {
            document.querySelector("section." + msg.id).scrollIntoView(true)

        }
    }
});
