import {faker} from '@faker-js/faker';

import type {Todo} from '@/types';
import {genTodo} from '@/utils/generator';

export const getFakeTodos = (length = 5) => {
  const todos: Todo[] = Array.from({length}).map(() => {
    const title = faker.lorem.sentence(5);
    const completed = faker.datatype.boolean();
    const createdAt = faker.date.anytime().getTime();
    return genTodo({title, completed, createdAt});
  });
  return todos;
};
