import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { By } from '@angular/platform-browser';
import { ConfirmDialog } from './confirm-dialog';

describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;
  let mockDialogRef: jasmine.SpyObj<DialogRef>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('DialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
      providers: [
        { provide: DialogRef, useValue: mockDialogRef },
        { provide: DIALOG_DATA, useValue: { message: 'Czy na pewno chcesz kontynuować?' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dialog title', () => {
    const title = fixture.debugElement.query(By.css('.dialog-title'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toBe('Uwaga!');
  });

  it('should display message from DIALOG_DATA', () => {
    const content = fixture.debugElement.query(By.css('.dialog-content'));
    expect(content).toBeTruthy();
    expect(content.nativeElement.textContent).toBe('Czy na pewno chcesz kontynuować?');
  });

  it('should have close button in header', () => {
    const closeButton = fixture.debugElement.query(By.css('.dialog-close'));
    expect(closeButton).toBeTruthy();
  });

  it('should close dialog with false when close button is clicked', () => {
    const closeButton = fixture.debugElement.query(By.css('.dialog-close'));
    closeButton.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should have two action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.dialog-footer button'));
    expect(buttons.length).toBe(2);
  });

  it('should close dialog with false when cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.query(By.css('.secondary'));
    cancelButton.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true when confirm button is clicked', () => {
    const confirmButton = fixture.debugElement.query(By.css('.primary'));
    confirmButton.nativeElement.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should display correct button labels', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.dialog-footer button'));
    expect(buttons[0].nativeElement.textContent).toBe('Anuluj');
    expect(buttons[1].nativeElement.textContent).toBe('Zatwierdź');
  });
});
