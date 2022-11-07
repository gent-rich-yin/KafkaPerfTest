import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfService {

  ip_map: any = {
    'KafkaPerfPublisher-1': '34.23.73.75',
    'KafkaPerfPublisher-2': '34.23.217.78',
    'KafkaPerfConsumer-1': '35.231.141.111',
    'KafkaPerfConsumer-2': '34.73.124.23'
  };

  constructor(private http: HttpClient) { }

  getPublisherPerfMessage(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:9301/perfMessage`, {responseType: 'text'});
  }

  getPublisherTopic(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:9301/topic`, {responseType: 'text'});
  }

  getPublisherMessageSize(name: string): Observable<number> {
    return this.http.get<number>(`http://${this.ip_map[name]}:9301/messageSize`);
  }

  getPublisherMessagesPerSecond(name: string): Observable<number> {
    return this.http.get<number>(`http://${this.ip_map[name]}:9301/messagesPerSecond`);
  }

  setPublisherTopic(name: string, topic: string): Observable<any> {
    return this.http.post(`http://${this.ip_map[name]}:9301/topic`, topic);
  }

  setPublisherMessageSize(name: string, messageSize: number): Observable<any> {
    return this.http.post(`http://${this.ip_map[name]}:9301/messageSize`, messageSize);
  }

  setPublisherMessagesPerSecond(name: string, messagesPerSecond: number): Observable<any> {
    return this.http.post(`http://${this.ip_map[name]}:9301/messagesPerSecond`, messagesPerSecond);
  }

  getConsumerPerfMessage(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:9401/perfMessage`, {responseType: 'text'});
  }

  getConsumerTopic(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:9401/topic`, {responseType: 'text'});
  }

  setConsumerTopic(name: string, topic: string): Observable<any> {
    return this.http.post(`http://${this.ip_map[name]}:9401/topic`, topic);
  }

  getIP(name: string): string {
    if( name === 'kafkaperfpublisher-1' ) return '34.23.73.75';
    if( name === 'kafkaperfpublisher-2' ) return '34.23.217.78';
    if( name === 'kafkaperfconsumer-1' ) return '35.231.141.111';
    if( name === 'kafkaperfconsumer-2' ) return '34.73.124.23';
    return '';
  }

}
