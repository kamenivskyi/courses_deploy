import lessons from '../db/data.json';
import { transformService } from './transformService';

export const lessonsService = {
  getData(mockData, time = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, time);
    });
  },
  async getLessons() {
    const data = await this.getData(lessons, 1000);

    return data.map(transformService.transformLesson);
  },
};
