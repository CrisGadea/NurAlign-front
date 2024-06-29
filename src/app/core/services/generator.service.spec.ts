import { TestBed } from '@angular/core/testing';
import { GeneratorService } from './generator.service';

describe('GeneratorService', () => {
  let service: GeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia asignar un valor a una variable', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setData(key, value);
    expect(service.getData(key)).toEqual(value);
  });

  it('deberia setear el valor del sleeptracker', () => {
    const sleepTracker= [
      { id: 1, hours: 7, date: '2023-07-21' },
      { id: 2, hours: 6, date: '2023-07-22' }
    ];

    service.setSleepTrackerData(sleepTracker);
    expect(service.getSleepTrackerData()).toEqual(sleepTracker);
  });
  it('deberia setear el valor del sleeptracker cun un tamaño de 2', () => {
    const sleepTracker= [
      { id: 1, hours: 7, date: '2023-07-21' },
      { id: 2, hours: 6, date: '2023-07-22' }
    ];

    service.setSleepTrackerData(sleepTracker);
    expect(service.getSleepTrackerData().length).toEqual(sleepTracker.length);
  });

  it('deberia setearme el moodTracker', () => {
    const moodData = [
      { id: 1, mood: 5, date: '2023-07-21' },
      { id: 2, mood: 1, date: '2023-07-22' }
    ];

    service.setMoodTrackerData(moodData);
    expect(service.getMoodTrackerData()).toEqual(moodData);
  });

  it('deberia setearme el valor de las terapias', () => {
    const therapyData = [
      { id: 1, session_feel: 5, date: '2023-07-21' },
      { id: 2, session_feel: 5, date: '2023-07-22' }
    ];

    service.setSessionTherapyData(therapyData);
    expect(service.getSessionTherapyData()).toEqual(therapyData);
  });
  it('deberia setearme el valor de las terapias', () => {
    const therapyData = [
      { id: 1, session_feel: 5, date: '2023-07-21' },
      { id: 2, session_feel: 5, date: '2023-07-22' }
    ];

    service.setSessionTherapyData(therapyData);
    expect(service.getSessionTherapyData().length).toEqual(2);
  });


});

