import { Component } from '@angular/core';
import { LoadingServiceService } from './shared/services/loading-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public loadingService: LoadingServiceService) {}
}
