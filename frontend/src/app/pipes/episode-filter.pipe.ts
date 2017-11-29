import {Pipe, PipeTransform} from '@angular/core';
import {Episode} from '../models/Episode';

@Pipe({
  name: 'episodeFilter'
})
export class EpisodeFilterPipe implements PipeTransform {

  transform(episodes: Episode[], searchString: string, cssClass: string): any {
    if (searchString) {
      const filtered = this.makeCopy(episodes).filter(episode => {
        return episode.name.toLowerCase().includes(searchString.toLowerCase());
      });
      return this.withSpan(filtered, searchString.toLowerCase(), cssClass);
    }

    return episodes;
  }

  private withSpan(episodes: Episode[], searchString: string, cssClass: string) {
    const openTag = `<span class=\'${cssClass}\'>`;
    const closingTag = '</span>';

    return episodes.map(episode => {
      const index = episode.name.toLowerCase().indexOf(searchString);
      episode.name = this.insert(episode.name, index, openTag);
      episode.name = this.insert(episode.name, index + openTag.length + searchString.length, closingTag);
      return episode;
    });
  }

  private makeCopy(original: Episode[]) {
    return JSON.parse(JSON.stringify(original));
  }

  private insert(str: string, index: number, value: string) {
    return str.substr(0, index) + value + str.substr(index);
  }
}
