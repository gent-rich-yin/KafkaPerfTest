import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfService {
  publisher_port = 9301;
  consumer_port = 9401;

  cloud_ip_map: any = {
    'KafkaPerfPublisher-1': '34.125.46.47',
    'KafkaPerfPublisher-2': '34.125.55.232',
    'KafkaPerfConsumer-1': '34.125.88.78',
    'KafkaPerfConsumer-2': '34.125.69.151'
  };

  on_premise_ip_map: any = {
    'KafkaPerfPublisher-1': 'snycfiaplnint03',
    'KafkaPerfPublisher-2': 'snycfiaplnint04',
    'KafkaPerfConsumer-1': 'snycfiaplnuat09',
    'KafkaPerfConsumer-2': 'snycfiaplnuat10'
  };

  ip_map: any = this.cloud_ip_map;

  constructor(private http: HttpClient) { }

  getPublisherPerfMessage(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:${this.publisher_port}/perfMessage`, {responseType: 'text'});
  }

  getPublisherTopic(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:${this.publisher_port}/topic`, {responseType: 'text'});
  }

  getPublisherMessageSize(name: string): Observable<number> {
    return this.http.get<number>(`http://${this.ip_map[name]}:${this.publisher_port}/messageSize`);
  }

  setPublisherTopic(name: string, topic: string): Observable<any> {
    return this.http.post(`http://${this.ip_map[name]}:${this.publisher_port}/topic`, topic);
  }

  setPublisherMessageSize(name: string, messageSize: number): Observable<any> {
    return this.http.post(`http://${this.ip_map[name]}:${this.publisher_port}/messageSize`, messageSize);
  }

  getConsumerPerfMessage(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:${this.consumer_port}/perfMessage`, {responseType: 'text'});
  }

  getConsumerTopic(name: string): Observable<string> {
    return this.http.get(`http://${this.ip_map[name]}:${this.consumer_port}/topic`, {responseType: 'text'});
  }

  setConsumerTopic(name: string, topic: string): Observable<any> {
    return this.http.post(`http://${this.ip_map[name]}:${this.consumer_port}/topic`, topic);
  }

}
