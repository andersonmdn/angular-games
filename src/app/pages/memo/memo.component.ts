import { Component, OnInit } from '@angular/core';

import { Memo } from './memo';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit {
  right: number = 0;
  wrong: number = 0;
  memos: Array<Memo> = [];
  //firstMemo: number = -1;
  //lastMemo: number = -1;
  queue: Array<number> = [];

  flipCard(index: number) {
    if (!this.memos[index].active) {
      this.memos[index].active = true;

      this.checkCard(index);
    }
  }

  checkCard(index: number): boolean {
    if (this.queue.indexOf(index) < 0) {
      this.queue.push(index);
      console.log(this.queue);
    }

    if (this.queue.length >= 2) {
      if (this.memos[this.queue[0]].image == this.memos[this.queue[1]].image) {
        this.memos[this.queue[0]].right = true;
        this.memos[this.queue[1]].right = true;
        this.queue.shift();
        this.queue.shift();
        console.log(this.memos);
        this.right++;
      } else {
        this.wrong++;
        setTimeout(() => {
          if (this.queue.length >= 2) {
            this.memos[this.queue[0]].active = false;
            this.memos[this.queue[1]].active = false;
            this.queue.shift();
            this.queue.shift();
            console.log(this.queue);
          }
        }, 1000);
      }
    }

    return false;
  }

  constructor() {}

  ngOnInit(): void {
    let images = [
      '../../../../assets/Aku-Aku.png',
      '../../../../assets/Chibiterasu.png',
      '../../../../assets/crash.png',
      '../../../../assets/Hollow-1.png',
      '../../../../assets/Red_XIII.png',
      '../../../../assets/Hollow-0.png',
      '../../../../assets/Link_Sword.png',
      '../../../../assets/linux.png',
      '../../../../assets/gira-sol.png',
      '../../../../assets/mario-verde.png',
      '../../../../assets/mario-vermelho.png',
      '../../../../assets/Morgana.png',
      '../../../../assets/planta-mario.png',
      '../../../../assets/Under.png',
      '../../../../assets/yoche.png',
      '../../../../assets/bmo.png',
      '../../../../assets/crono_2.png',
      '../../../../assets/kirby_sword.png',
      '../../../../assets/wisp_poke.png',
      '../../../../assets/sif.png',
      '../../../../assets/squid_vodoo.png',
      '../../../../assets/panda.png',
      '../../../../assets/picolo.png',
      '../../../../assets/simba.png',
      '../../../../assets/scar.png',
      '../../../../assets/meowth.png',
      '../../../../assets/gumball.png',
      '../../../../assets/scooby-doo.png',
      '../../../../assets/garfield.png',
      '../../../../assets/thanos.png',
    ];

    for (const image of images) {
      let newIndex = 0;

      do {
        newIndex = Math.floor(Math.random() * (images.length * 2));
      } while (this.memos[newIndex] !== undefined);

      this.memos[newIndex] = {
        image: image,
        active: false,
        right: false,
      };

      do {
        newIndex = Math.floor(Math.random() * (images.length * 2));
      } while (this.memos[newIndex] !== undefined);

      this.memos[newIndex] = {
        image: image,
        active: false,
        right: false,
      };
    }
  }
}
