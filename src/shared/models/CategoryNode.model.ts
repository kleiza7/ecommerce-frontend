export type CategoryNode = {
  id: number;
  name: string;
  slug: string;
  parentId?: number | null; // ✅ FIX
  children: CategoryNode[];
};
