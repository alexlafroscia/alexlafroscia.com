import rehype from "rehype";

const processor = rehype()
  .use(removeWrappingElements)
  .use(removeTitle)
  .use(addHostToReferences)
  .use(removeClasses);

function getChildWithTagName(node, tagName) {
  return node.children.find((child) => child.tagName === tagName);
}

function removeWrappingElements() {
  return function removeWrappingElementsTransform(tree) {
    const html = getChildWithTagName(tree, "html");
    const body = getChildWithTagName(html, "body");
    const article = getChildWithTagName(body, "article");

    // Remove the `html`, `body` and `article` tags
    tree.children = article.children;

    return tree;
  };
}

function removeTitle() {
  return function removeTitleTransform(tree) {
    const h1 = getChildWithTagName(tree, "h1");

    if (h1) {
      tree.children = tree.children.filter((child) => child !== h1);
    }
  };
}

function removeClasses() {
  return function removeClassesTransform(tree) {
    for (const child of tree.children) {
      if (child.properties?.className) {
        delete child.properties.className;
      }

      if (child.children) {
        removeClassesTransform(child);
      }
    }
  };
}

function addHostToReferences() {
  return function addHostToReferencesTransform(tree) {
    for (const child of tree.children) {
      const src = child.properties?.src;

      if (src && src.startsWith("/")) {
        child.properties.src = "https://alexlafroscia.com" + src;
      }

      if (child.children) {
        addHostToReferencesTransform(child);
      }
    }
  };
}

export async function prepare(content: string): Promise<string> {
  const file = await processor.process(content);

  return file.toString();
}
