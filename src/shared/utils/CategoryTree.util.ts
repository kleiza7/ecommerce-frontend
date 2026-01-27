import type { ReqCategoriesGetAllResponse } from "../../api/responses/ReqCategoriesGetAllResponse.model";
import type { CategoryNode } from "../models/CategoryNode.model";

export const buildCategoryTreeWithMap = (
  categories: ReqCategoriesGetAllResponse,
) => {
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

  return { tree, map };
};

export const buildCategorySlugMap = (
  categories: ReqCategoriesGetAllResponse,
): Map<string, CategoryNode> => {
  const map = new Map<string, CategoryNode>();

  categories.forEach((category) => {
    map.set(category.slug, {
      ...category,
      children: [],
    });
  });

  return map;
};

export const buildCategoryPath = (
  categories: ReqCategoriesGetAllResponse,
  initialSelectedCategory: ReqCategoriesGetAllResponse[number] | null,
): CategoryNode[] => {
  if (!initialSelectedCategory || categories.length === 0) {
    return [];
  }

  const map = new Map<number, CategoryNode>();

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  categories.forEach((category) => {
    if (category.parentId !== null) {
      map.get(category.parentId)?.children.push(map.get(category.id)!);
    }
  });

  const path: CategoryNode[] = [];
  let current = map.get(initialSelectedCategory.id);

  while (current) {
    path.unshift(current);

    if (current.parentId === null) {
      break;
    }

    current = map.get(current.parentId);
  }

  return path;
};
