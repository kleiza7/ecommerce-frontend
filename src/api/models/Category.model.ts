export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  displayOrder: number;
  parentId?: number | null;
};
