import { Faculty } from '../models';
import { faculty } from '@cuconnex/common';

export const insertFaculties = async () => {
  for (let key of Object.keys(faculty)) {
    let code = key;
    let name = faculty[key];
    let imageName = name.toLowerCase().split(" ").join("_")

    let image = `assets/faculties/${imageName}.jpg`;
    await Faculty.create({ code, name, image  });
  }
};
