interface TagAttributes {
  id: number;
  name: string;
  belong_id?: number;
  icon_file_name?: string;
  description?: string;
  create_time: Date;
}
interface TagTreeAttributes extends TagAttributes {
  children?: TagAttributes[];
}
export type { TagAttributes, TagTreeAttributes };
