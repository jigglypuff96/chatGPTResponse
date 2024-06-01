console.log("content!!! loaded");
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.matches('[data-message-author-role="assistant"]')) {
          replaceTextInElement(node);
        }
        node
          .querySelectorAll('[data-message-author-role="assistant"]')
          .forEach((el) => replaceTextInElement(el));
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function replaceTextInElement(element) {
  element.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      child.textContent = child.textContent.replace(/apple/gi, "pear");
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      replaceTextInElement(child);
    }
  });
}
