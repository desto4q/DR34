interface ImageData {
  high_res_file: {
    height: number;
    url: string;
    width: number;
  };
  id: number;
  low_res_file: {
    height: number;
    url: string;
    width: number;
  };
  media_type: 'image';
  preview_file: {
    height: number | null;
    url: string;
    width: number | null;
  };
  rating: 'explicit';
  score: number;
  sources: string[];
  tags: {
    artist: string[];
    character: string[];
    copyright: string[];
    general: string[];
    meta: string[];
  };
}

interface SavedItems {
  high_res_file?: {
    height?: number;
    url?: string;
    width?: number;
  };
  id?: number;
  low_res_file?: {
    height?: number;
    url?: string;
    width?: number;
  };
  media_type?: 'image';
  preview_file?: {
    height?: number | null;
    url?: string;
    width?: number | null;
  };
  rating?: 'explicit';
  score?: number;
  sources?: string[];
  tags?: {
    artist?: string[];
    character?: string[];
    copyright?: string[];
    general?: string[];
    meta?: string[];
  };
}

export type {ImageData, SavedItems};
