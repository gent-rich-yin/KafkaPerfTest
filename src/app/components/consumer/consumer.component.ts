import { Component, Input, OnInit } from '@angular/core';
import { PerfService } from 'src/app/services/perf.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  @Input() name = "";
  topic: string = "";
  messages = "";

  intervalId: any;

  constructor(private perfService: PerfService) { }

  ngOnInit(): void {
    this.perfService.getConsumerTopic(this.name).subscribe(topic => this.topic = topic);

    this.intervalId = setInterval(() => {
      this.perfService.getConsumerPerfMessage(this.name).subscribe(message => {
        this.messages += message + "\n";
      })
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  update(): void {
    this.perfService.setConsumerTopic(this.name, this.topic).subscribe(() => {
      this.perfService.getConsumerTopic(this.name).subscribe(topic => this.topic = topic);
    });
  }

}
