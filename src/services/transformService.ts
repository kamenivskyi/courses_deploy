import { FIRST_ITEM_ID } from 'src/constants';
import { Lesson } from 'src/models';

export const transformService = {
  transformLesson(lesson: Lesson) {
    return {
      ...lesson,
      disabled: lesson.id !== FIRST_ITEM_ID,
    };
  },
};
