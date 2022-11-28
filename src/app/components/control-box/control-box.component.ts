import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PerfService } from 'src/app/services/perf.service';

interface Broker {
  name: string,
  code: string
}

@Component({
  selector: 'app-control-box',
  templateUrl: './control-box.component.html',
  styleUrls: ['./control-box.component.scss']
})
export class ControlBoxComponent implements OnInit {
  brokers: Broker[];
  selectedBroker: Broker;
  topic = '';
  messageSize = 0;
  started = false;

  constructor(private perfService: PerfService) { 
    this.brokers = [{ name: 'kafka', code: 'kafka' }, { name: 'pulsar', code: 'pulsar'}];
    this.selectedBroker = { name: 'kafka', code: 'kafka' };
  }

  ngOnInit(): void {
  }

  validConfig(): boolean {
    return this.topic !== '' && this.messageSize > 0;
  }

  start(): void {
    forkJoin(
      this.perfService.setConsumerTopic('KafkaPerfConsumer-1', this.topic),
      this.perfService.setConsumerTopic('KafkaPerfConsumer-2', this.topic),
      this.perfService.setPublisherMessageSize('KafkaPerfPublisher-1', this.messageSize),
      this.perfService.setPublisherMessageSize('KafkaPerfPublisher-2', this.messageSize),
      this.perfService.setPublisherTopic('KafkaPerfPublisher-1', this.topic),
      this.perfService.setPublisherTopic('KafkaPerfPublisher-2', this.topic),
    ).subscribe(() => {
      this.started = true;
    });    
  }

  stop(): void {
    forkJoin(
      this.perfService.setConsumerTopic('KafkaPerfConsumer-1', ''),
      this.perfService.setConsumerTopic('KafkaPerfConsumer-2', ''),
      this.perfService.setPublisherTopic('KafkaPerfPublisher-1', ''),
      this.perfService.setPublisherTopic('KafkaPerfPublisher-2', ''),
    ).subscribe(() => {
      this.started = false;
    });    
  }

}
