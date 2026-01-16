import type { CategoryNode } from "../models/CategoryNode.model";

export const buildCategoryTree = (
  categories: Omit<CategoryNode, "children">[],
): CategoryNode[] => {
  const map = new Map<number, CategoryNode>();

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  const tree: CategoryNode[] = [];

  map.forEach((node) => {
    if (node.parentId == null) {
      tree.push(node);
    } else {
      map.get(node.parentId)?.children.push(node);
    }
  });

  return tree;
};

export const buildCategorySlugMap = (tree: CategoryNode[]) => {
  const map = new Map<string, CategoryNode>();

  const walk = (node: CategoryNode) => {
    map.set(node.slug, node);
    node.children.forEach(walk);
  };

  tree.forEach(walk);
  return map;
};
