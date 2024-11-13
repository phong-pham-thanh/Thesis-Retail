import _ from 'lodash';
import * as moment from 'moment';



export class UtilitiesService {
    static convertDateTime(date: Date | string): Date {
        if (date === null || date === undefined) {
          return null;
        }
        if (typeof date === 'string') {
          date = new Date(date);
        }
        if (!(date instanceof Date) || isNaN(date.getTime())) {
          return null;
        }
      
        // Chuyển đổi ngày sang UTC bằng cách loại bỏ ảnh hưởng của múi giờ
        const convertDate = new Date(Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        ));
      
        return convertDate;
      }
  
    static cloneDeep(originalObject: any) {
      return _.cloneDeep(originalObject);
    }
  
    static isEmptyString(str: string): boolean {
      return !str || str.trim().length === 0;
    }

    static convertMomentToDate(input: moment.Moment | Date | string): Date {
      if (moment.isMoment(input)) {
        return input.toDate();
      }
    
      if (typeof input === 'string') {
        const date = new Date(input);
        if (!isNaN(date.getTime())) {
          return date;
        } else {
          throw new Error('Invalid date string');
        }
      }
      return input;
    }

    static isSameDay(date1: Date, date2: Date): boolean {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
    
    static isBeforeDay(date1: Date, date2: Date): boolean {
      const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return d1.getTime() < d2.getTime();
    }
    
    static isAfterDay(date1: Date, date2: Date): boolean {
      const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return d1.getTime() > d2.getTime();
    }

    static isNull(obj: any): boolean {
      if ((obj === 0) || (obj === false) || (obj === "")) {
          return false;
      }
      return (!obj || typeof obj === 'undefined' || obj === null);
    }

    static isNullOrEmpty(obj: any): boolean {
      return this.isNull(obj) || obj === '';
    }

    static removeDiacritics(str: string): string {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
  
  }
  