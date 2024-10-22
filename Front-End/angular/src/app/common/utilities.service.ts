import _ from 'lodash';



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

  
  }
  