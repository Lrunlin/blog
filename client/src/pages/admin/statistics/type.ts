export interface Article {
  admin_reprint_count: number;
  admin_not_reprint_count: number;
  user_reprint_count: number;
  user_not_reprint_count: number;
}

export interface Type {
  type_count: number;
  tag_count: number;
}

export interface User {
  user_count: number;
}

export interface Link {
  link_count: number;
}

export interface Visit {
  time: string;
  view_count: number;
  ip_count: number;
}

export interface Article_ranking {
  id: number;
  title: string;
  view_count: number;
}

export interface Memory {
  occupied: number;
  total: number;
}

export interface Disk {
  occupied: number;
  total: number;
}

export interface System_occupation {
  loadavg: number;
  memory: Memory;
  disk: Disk;
  time: string;
}

export interface Referer {
  refererResult: string;
  count: number;
}

export interface statisticsDataType {
  article: Article;
  type: Type;
  user: User;
  link: Link;
  visits: Visit[];
  article_ranking: Article_ranking[];
  system_occupation: System_occupation[];
  referer: Referer[];
}
