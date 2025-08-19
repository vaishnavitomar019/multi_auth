import { TestBed } from '@angular/core/testing';

import { StreamsummaryService } from './streamsummary.service';

describe('StreamsummaryService', () => {
  let service: StreamsummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamsummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
