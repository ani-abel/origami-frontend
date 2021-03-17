import { Pipe, PipeTransform } from '@angular/core';

const milliSecondsInDay = 1000 * 3600 * 24;

// Cast as any because typescript typing haven't updated yet
const rtf = new (Intl as any).RelativeTimeFormat('en');

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(utcTime: string): string {
    const diffInMillicseconds: number =
      new Date(utcTime).getTime() - new Date().getTime();
    const diffInDays = Math.round(diffInMillicseconds / milliSecondsInDay);
    if(diffInDays === 0) {
      return "today";
    }
    return rtf.format(diffInDays, "day");
  }

}
