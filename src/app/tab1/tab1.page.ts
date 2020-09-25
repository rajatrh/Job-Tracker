
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApplicationDataService } from '../services/application-data.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  applications = new Observable<any[]>();
  type: ChartType = 'Bar';
  data: IChartistData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ]
  };

  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 200
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };

  constructor(private authService: AuthService,
    private firestore: AngularFirestore,
    public applicationDataService: ApplicationDataService,
  ) {

    this.applications = firestore.collection('application', ref => ref.where('user', '==', 'rajat.hande@stonybrook.edu')).valueChanges();

    this.applications.subscribe(d => {
      console.log(d);
    })
  }

}
