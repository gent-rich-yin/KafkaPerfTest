import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PerfService } from 'src/app/services/perf.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit, OnDestroy {
  @Input() name = "";
  topic: string = "";
  messageSize = 0;
  messagesPerSecond = 0;
  messages = "";

  intervalId: any;

  constructor(private perfService: PerfService) { }

  ngOnInit(): void {
    this.perfService.getPublisherTopic(this.name).subscribe(topic => this.topic = topic);
    this.perfService.getPublisherMessageSize(this.name).subscribe(messageSize => this.messageSize = messageSize);
    this.perfService.getPublisherMessagesPerSecond(this.name).subscribe(messagesPerSecond => this.messagesPerSecond = messagesPerSecond);

    this.intervalId = setInterval(() => {
      this.perfService.getPublisherPerfMessage(this.name).subscribe(message => {
        this.messages += message + "\n";
      })
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  update(): void {
    this.perfService.setPublisherTopic(this.name, this.topic).subscribe(() => {
      this.perfService.getPublisherTopic(this.name).subscribe(topic => this.topic = topic);
    });
    this.perfService.setPublisherMessageSize(this.name, this.messageSize).subscribe(() => {
      this.perfService.getPublisherMessageSize(this.name).subscribe(messageSize => this.messageSize = messageSize);
    })
    this.perfService.setPublisherMessagesPerSecond(this.name, this.messagesPerSecond).subscribe(() => {
      this.perfService.getPublisherMessagesPerSecond(this.name).subscribe(messagesPerSecond => this.messagesPerSecond = messagesPerSecond);
    });
  }
}
