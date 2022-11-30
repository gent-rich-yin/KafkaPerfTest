import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PerfService } from 'src/app/services/perf.service';

interface Broker {
  name: string,
  code: string
}

interface Source {
  name: string,
  code: string
}

@Component({
  selector: 'app-control-box',
  templateUrl: './control-box.component.html',
  styleUrls: ['./control-box.component.scss']
})
export class ControlBoxComponent implements OnInit {
  sources: Source[];
  selectedSource: string;
  brokers: Broker[];
  selectedBroker: string;
  topic = '';
  messageSize = 0;
  started = false;

  publisher_ports = {
    'kafka': 9301,
    'pulsar': 9311
  };

  consumer_ports = {
    'kafka': 9401,
    'pulsar': 9411
  };

  constructor(private perfService: PerfService) { 
    this.sources = [{ name: 'Cloud', code: 'Cloud' }, { name: 'On Premise', code: 'On Premise'}];
    this.selectedSource = 'Cloud';
    this.brokers = [{ name: 'kafka', code: 'kafka' }, { name: 'pulsar', code: 'pulsar'}];
    this.selectedBroker = 'kafka';
  }

  ngOnInit(): void {
  }

  validConfig(): boolean {
    return this.topic !== '' && this.messageSize > 0;
  }

  changeSource(): void {
    if( this.selectedSource === 'Cloud' ) {
      this.perfService.ip_map = this.perfService.cloud_ip_map;
    } else {
      this.perfService.ip_map = this.perfService.on_premise_ip_map;
    }
  }

  changeBroker(): void {
    this.updatePorts();
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

  updatePorts(): void {
    this.perfService.publisher_port = this.publisher_ports[this.selectedBroker as keyof typeof this.publisher_ports];
    this.perfService.consumer_port = this.consumer_ports[this.selectedBroker as keyof typeof this.consumer_ports];
  }

}
