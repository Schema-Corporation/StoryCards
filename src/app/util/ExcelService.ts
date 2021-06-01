import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs'
const EXCEL_TYPE = 'application/vnd.openxmlformats- officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'SistemaD6': worksheet }, SheetNames: ['SistemaD6'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public exportAffiliateUsers(users: any[], excelFileName: string): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Afiliados");
    worksheet.columns = [
      {
        header: 'Nombres y apellidos',
        key: 'name',
        width: 48,
        style: {
          alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }
        }
      },
      {
        header: 'Correo electrónico',
        key: 'email',
        width: 48,
        style: {
          alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }
        }
      },
      {
        header: 'País',
        key: 'country',
        width: 24,
        outlineLevel: 1,
        style: {
          alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }
        }
      },
      {
        header: 'Teléfono',
        key: 'phone',
        width: 48,
        outlineLevel: 1,
        style: {
          alignment: { vertical: 'middle', horizontal: 'left', wrapText: true },
        }
      },
      {
        header: 'Fecha de creación',
        key: 'created_date',
        width: 48,
        outlineLevel: 1,
        style: {
          alignment: { vertical: 'middle', horizontal: 'left', wrapText: true },
        }
      }
    ];

    worksheet.getRow(1).eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:'FF003399' }
      }
      cell.font = {
        color: {
          argb: 'FFFFFFFF'
        },
        bold: true
      }
    });

    const rows = [];
    users.forEach(user => {
      const { fullName, email, countryName, countryCode, phone, createdDate } = user;
      let date = new Date(createdDate);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let parsedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      const row = [fullName, email, countryName, `${countryCode} ${phone}`, parsedDate];
      rows.push(row);
    });

    for (const row of rows) {
      worksheet.addRow(row);
    }

    workbook.xlsx.writeBuffer().then(excelBuffer => {
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }, error => {
      console.log('error: ', error);
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}