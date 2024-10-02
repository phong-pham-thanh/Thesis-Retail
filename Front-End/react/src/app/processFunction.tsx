import React from "react";

import { Tag } from "antd";


///// DISPLAY ////////

//// show date&time in Export/Import Transaction
export const ProcessStatus = ({ status }: { status: number }) => {
  switch (status) {
    case 0:
      return (<Tag color="error">Đã hủy</Tag>)
    case 1:
      return <Tag color="success">Hoàn thành</Tag>
    case 2:
      return <Tag color="processing">Đang xử lý</Tag>
    default:
      break;
  }
  return;
}

export const ProcessDate = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString.toLocaleString());
  const hour = date.getHours().toLocaleString('en-ES', { minimumIntegerDigits: 2 });
  const min = date.getMinutes().toLocaleString('en-ES', { minimumIntegerDigits: 2 });
  const timeString = hour + ":" + min;
  const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formattedDate = formatter.format(date);
  const newDateString = "";
  //return formattedDate;
  return (<div>{timeString}<br />{formattedDate}</div>);
};

///// WHY I CAN'T DO { api_link.url =  api_link.url + String(id) } //////// Import/Export Transaction
export const processAPIPostLink = (link: string, id: number | string ) => {
  const words1 = link.split('/');
  words1.pop(); words1.push(String(id));
  const strCopy1 = words1.join('/');
  return strCopy1;
}