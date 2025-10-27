import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
  ],
})
export class HomePage implements OnDestroy {
  elapsedMs = 0;
  running = false;

  private startTimestamp = 0;
  private timerInterval: any = null;

  start() {
    if (this.running) return;
    this.running = true;

    // Guarda el momento de arranque corrigiendo el tiempo ya acumulado
    this.startTimestamp = Date.now() - this.elapsedMs;

    this.timerInterval = setInterval(() => {
      this.elapsedMs = Date.now() - this.startTimestamp;
    }, 10);
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    this.clearTimer();
  }

  reset() {
    this.running = false;
    this.clearTimer();
    this.elapsedMs = 0;
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  get formattedTime(): string {
    const totalMs = this.elapsedMs;

    const totalSeconds = Math.floor(totalMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((totalMs % 1000) / 10);

    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');
    const cc = centiseconds.toString().padStart(2, '0');

    return `${mm}:${ss}.${cc}`;
  }
}
