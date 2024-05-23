import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./home-squares.component.css']
})
export class HomeComponent implements AfterViewInit { 

  constructor() {}

  ngAfterViewInit() {
    
     // Observer 1
     const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          robotinDiv.classList.remove('fixed-robot');
          robotinDiv.classList.add('absolute-robot');
          chatBubbleSection.style.display = 'block';
          imgRobotin.classList.add('bot-section-image');
          imgRobotin.classList.remove('bot-image');
          imgRobotinOjos.classList.add('bot-section-image');
          imgRobotinOjos.classList.remove('bot-image');
          imgRobotinOjos.style.right = '0';
          imgRobotinOjos.style.left = 'unset';
          imgRobotinOjos.style.bottom = '0';
          imgContainerRobot.style.right = '0';
          imgContainerRobot.style.bottom = '0';
          imgContainerRobot.style.left = 'unset';
          chatBubbleDiv.classList.add('d-none');
        } else {
          robotinDiv.classList.add('fixed-robot');
          robotinDiv.classList.remove('absolute-robot');
          chatBubbleSection.style.display = 'none';
          imgRobotin.classList.remove('bot-section-image');
          imgRobotin.classList.add('bot-image');
          imgRobotinOjos.classList.add('bot-image');
          imgRobotinOjos.classList.remove('bot-section-image');
          imgRobotinOjos.style.left = '0';
          imgRobotinOjos.style.right = 'unset';
          imgContainerRobot.style.left = '0';
          imgContainerRobot.style.right = 'unset';
          chatBubbleDiv.classList.remove('d-none');
        }
      });
    });
    
    // Observer 2
    const observer2 = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-fade-in-left');
        }
      });
    });

    const hiddenElementFadeLeft = document.querySelectorAll<HTMLElement>('.hidden-fade-in-left');
    hiddenElementFadeLeft.forEach((el: HTMLElement) => observer2.observe(el));

    // Observer 3
    const observer3 = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-fade-in-right');
        }
      });
    });

    const hiddenElementFadeRight = document.querySelectorAll<HTMLElement>('.hidden-fade-in-right');
    hiddenElementFadeRight.forEach((el: HTMLElement) => observer3.observe(el));

    const imgContainerRobot = document.getElementById('img-container-robot') as HTMLElement;
    const chatBubbleDiv = document.getElementById('chat-bubble1') as HTMLElement;
    const imgRobotin = document.getElementById('img-robotin') as HTMLElement;
    const imgRobotinOjos = document.getElementById('img-robotin-ojos') as HTMLElement;
    const robotinDiv = document.getElementById('robotin') as HTMLElement;
    const chatBubbleSection = document.getElementById('chat-bubble-section') as HTMLElement;
    const sectionElement = document.querySelectorAll<HTMLElement>('.quien-es-robotin');


    sectionElement.forEach((el) => observer.observe(el));
  }

  goToDashboard(){
    window.location.href = '/dashboard';
  }
  }

