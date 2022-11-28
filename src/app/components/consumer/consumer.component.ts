import { Component, Input, OnInit } from '@angular/core';
import { PerfService } from 'src/app/services/perf.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  @Input() name = "";

  messages = "";

  intervalId: any;

  constructor(private perfService: PerfService) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.perfService.getConsumerPerfMessage(this.name).subscribe(message => {
        this.messages += message + "\n";
      })
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }


}
