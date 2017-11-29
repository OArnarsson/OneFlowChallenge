import { Episode } from "./Episode";

export class Series {
  constructor(
      public name = '',
      public summary = '',
      public image = {
        original: '',
        medium: ''
      },
      public episodes: Episode[],
      public createdAt = 0,
      public updatedAt = 0
  ) {}
}
