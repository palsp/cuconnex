import { Faculty } from '../models';
import { faculty } from '@cuconnex/common';

export const insertFaculties = async () => {
  for (let key of Object.keys(faculty)) {
    let code = key;
    let name = `${faculty[key]}`;
    let imagePath = name.toLowerCase();
    let image = `src/assets/faculties/${imagePath}.png`;
    await Faculty.create({ code, name, image });
  }
};
