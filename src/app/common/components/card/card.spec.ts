import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';

@Component({
  template: `
    <app-card>
      <div>Test Body</div>
    </app-card>
  `,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHost {}

describe('Card', () => {
  let fixture: ComponentFixture<TestHost>;
  let testHostComponent: TestHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    testHostComponent = fixture.componentInstance;
  });

  it('should create the host component', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should project the card-body content', () => {
    const bodyEl = fixture.debugElement.nativeElement;
    expect(bodyEl.textContent.trim()).toContain('Test Body');
  });
});
