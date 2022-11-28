import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PerfService } from 'src/app/services/perf.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit, OnDestroy {
  @Input() name = "";
  messages = "";

  intervalId: any;

  constructor(private perfService: PerfService) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.perfService.getPublisherPerfMessage(this.name).subscribe(message => {
        this.messages += message + "\n";
      })
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}
