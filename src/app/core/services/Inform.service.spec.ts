import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { InformService } from "./inform.service";
import { TestBed } from "@angular/core/testing";

describe('InformService', () => {
    let service: InformService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [InformService]
      });
      service = TestBed.inject(InformService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify(); // Verifica que no haya solicitudes pendientes
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('deberiaDarmeTodosLosPacientesPorTherapistId', () => {
        const Patients = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
        const therapistId = 1;
        service.getPatientsAllPatients(therapistId).subscribe(patients => {
          expect(patients.length).toEqual(2);
          expect(patients).toEqual(Patients);
        });
        const req = httpMock.expectOne(`${service.apiUrl}/patients/therapist/${therapistId}`);
        expect(req.request.method).toEqual('GET');
        req.flush(Patients);
        //simula la urlRara
      });
//le paso solo 2 para no crearlo entero
      
    it('traemeSleepTracker', () => {
        const SleepTracker = [{ id: 1, hours: 7, date: '2023-07-21'}, { id: 2, hours: 6, date: '2023-07-22'}];
        const patientId = 1;
        const fromDate = '2023-07-19';
        const toDate = '2023-07-26';
      
        service.getSleepTrackerByIdAndRange(patientId, fromDate, toDate).subscribe(sleepTracker => {
          expect(sleepTracker.length).toEqual(2);
          expect(sleepTracker).toEqual(SleepTracker);
        });
      
        const req = httpMock.expectOne(`${service.apiUrl}/sleepTracker/patients/range/${patientId}?fromDate=${fromDate}&toDate=${toDate}`);
        expect(req.request.method).toBe('GET');
        req.flush(SleepTracker);
      });


      it('traemeMoodTracker', () => {
        const MoodTracker = [{ id: 1, hours: 7, date: '2023-07-21'}, { id: 2, hours: 6, date: '2023-07-22'}];
        const patientId = 1;
        const fromDate = '2023-07-19';
        const toDate = '2023-07-26';
      
        service.getMoodTrackerByIdAndRange(patientId, fromDate, toDate).subscribe(moodTracker => {
          expect(moodTracker.length).toEqual(2);
          expect(moodTracker).toEqual(MoodTracker);
        });
      
        const req = httpMock.expectOne(`${service.apiUrl}/moodTracker/patients/range/${patientId}?fromDate=${fromDate}&toDate=${toDate}`);
        expect(req.request.method).toBe('GET');
        req.flush(MoodTracker);
      });


      it('traeme TherapySession por rango', () => {
        const TherapySession = [{ id: 1, session_feel: 5, date: '2023-07-21'}, { id: 2, session_feel: 5, date: '2023-07-22'}];
        const patientId = 1;
        const fromDate = '2023-07-19';
        const toDate = '2023-07-26';
      
        service.getTherapySessionByIdAndRange(patientId, fromDate, toDate).subscribe(therapySession => {
          expect(therapySession.length).toEqual(2);
          expect(therapySession).toEqual(TherapySession);
        });
      
        const req = httpMock.expectOne(`${service.apiUrl}/therapySession/patients/range/${patientId}?fromDate=${fromDate}&toDate=${toDate}`);
        expect(req.request.method).toBe('GET');
        req.flush(TherapySession);
      });
   
  });
  