interface TypeAttributes {
  id: number;
  name: string;
  belong?: number;
  description: string;
  icon_url?: string;
  time: Date;
}
interface TagAttributes {
  id: number;
  name: string;
  belong?: number;
  icon_url?: string;
  time: Date;
}
interface TypeAttributesList extends TypeAttributes {
  children?: TagAttributes[];
}
export type { TypeAttributes,TagAttributes, TypeAttributesList };
