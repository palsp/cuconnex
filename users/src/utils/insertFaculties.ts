import { Faculty } from '../models';
import { faculty } from '@cuconnex/common';

export const insertFaculties = async () => {
  for (let key of Object.keys(faculty)) {
    let code = key;
    let name = faculty[key];
    let imageName = name.toLowerCase().split(" ").join("_")

    let image = `https://cuconnex-image.s3-ap-southeast-1.amazonaws.com/${imageName}.jpg`;
    await Faculty.create({ code, name, image  });
  }
};
