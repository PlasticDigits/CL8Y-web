/** Scroll to a page anchor after lazy sections mount. Used for /#token chrome. */
export function scrollToAnchor(id: string, behavior: ScrollBehavior = "auto") {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior, block: "start" });
    return true;
  }
  return false;
}

export function scrollToLocationHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return false;
  return scrollToAnchor(id);
}
