export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  video_url: string;
  video_time: number;
  description_list: string[];
  disabled: boolean;
}
