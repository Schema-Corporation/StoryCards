import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router, RouterEvent } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ExcelService } from 'src/app/util/ExcelService';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  public searchReport: string;

  private REPORTE_AFILIADO_ID: number = 1;

  public reports: any[] = [];

  constructor(public alertCtrl: AlertController,
    public platform: Platform,
    public navCtrl: NavController,
    public toastController: ToastController,
    public router: Router,
    public dbService: NgxIndexedDBService,
    public _loginService: LoginService,
    public _excelService: ExcelService) { }

  ngOnInit() {
    this.getReports();
    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.getReports();
        }
      });
  }

  getReports() {
    this.reports = [
      {
        id: 1,
        description: 'Reporte de afiliados'
      },
      {
        id: 2,
        description: 'Reporte de prueba'
      },
      {
        id: 3,
        description: 'Resultados Sistema D6'
      }
    ];
  }

  getReport(reporteId: number) {
    switch (reporteId) {
      case this.REPORTE_AFILIADO_ID:
        this.dbService.getByIndex('variables', 'name', 'token').subscribe(token => {
          this._loginService.getAffiliateUsers(token.value.token).subscribe(users => {
            const filename = 'Afiliados';
            this._excelService.exportAffiliateUsers(users, filename);
          }, error => {
            this.closeSession();
            console.log('error: ', error);
          })
        }, error => {
          this.closeSession();
          console.log('error: ', error);
        });
        break;
      default:
        break;
    }
  }

  filterByReportDescription(ev) {
    this.searchReport = ev.detail.value;
    if (this.searchReport && this.searchReport.trim() != '') {
      this.reports = this.reports.filter(report => {
          return (report.description.toLowerCase().indexOf(this.searchReport.toLowerCase()) > -1);
      });
    } else {
      this.getReports();
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  closeSession() {
    this.dbService.clear('variables').subscribe((successDeleted) => {
      if (successDeleted) {
        this.navCtrl.navigateForward('login')
      }
    });
  }
}
