import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Event} from '../../models/event';
import {NgxDropzoneChangeEvent, NgxDropzoneModule} from 'ngx-dropzone';
import {Category} from '../../models/category';
import {Booking} from '../../models/booking';
import {CategoryService} from '../../services/category.service';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  imports: [
    RouterLink,
    NgIf,
    NgxDropzoneModule,
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './add-event.component.html',
  standalone: true,
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit {
  checkoutFromGroup: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  eventId!: number;
  isSubmitting: boolean | null = null;
  imageFile: File | null = null;
  imagePreview!: string;
  imageError: string | null = null;
  categories!: Category[];
  selectedCategory!: Category;

  constructor(private eventService: EventService, private categoryService: CategoryService, private formBuilder: FormBuilder, private router: ActivatedRoute) {
  }


  private getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data
      },
      error => {
        alert(error.message)
      }
    )
  }

  ngOnInit(): void {
    this.getRouterId();
    this.getAllCategories();
    this.validators();
  }


  onSubmit(): void {

    console.log('Submitting with image:', this.imageFile);
    console.log(this.checkoutFromGroup.value)

    const formData = new FormData();
    const formValues = this.checkoutFromGroup.value;
    const eventData = {
      id: this.eventId,
      title: formValues.title,
      date: formValues.date,
      description: formValues.description,
      location: formValues.location,
      price: formValues.price,
      category: this.selectedCategory
    }
    console.log(formValues);
    formData.append('event', new Blob(
      [JSON.stringify(eventData)],
      {type: 'application/json'})
    );
    if (this.imageFile !== null || this.imagePreview !== null) {
      this.imageFile = this.base64ToFile(this.imagePreview, 'event-image.jpg');
      formData.append('photo', this.imageFile);
    } else {
      alert("upload image")
      return;
    }
    if (this.isEditMode) {
      this.updateEvent(formData);
    } else {
      this.addEvent(formData);
    }
  }

  private updateEvent(formData: FormData): void {
    this.eventService.updateEvent(formData).subscribe(data => {
        this.isSubmitting = true;
        this.checkoutFromGroup.reset();
        this.onRemove();
      }, error => {
        alert(error.message)
      }
    )
  }

  private addEvent(formData: FormData): void {
    this.eventService.addEvent(formData).subscribe(
      data => {
        this.isSubmitting = true;
        this.checkoutFromGroup.reset();
        this.onRemove();
      }, error => {
        alert(error.message)
      }
    )
  }

  private getRouterId() {
    this.router.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.eventId = +id;
        this.isEditMode = true;
        this.getEventById(this.eventId);
      }
    })
  }

  private getEventById(eventId: number) {
    this.eventService.getEventById(eventId).subscribe(
      event => {
        this.checkoutFromGroup.patchValue({
          id: event.id,
          title: event.title,
          date: event.date,
          description: event.description,
          location: event.location,
          price: event.price,
          category: event.category.name
        });
        this.imagePreview = 'data:image/jpeg;base64,' + event.photo;

      }
    );

  }

  private base64ToFile(base64Data: string, filename: string): File {
    const arr = base64Data.split(',');
    const mime = arr[0].match(/:(.*?);/)![1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
  }

  private validators() {
    this.checkoutFromGroup = this.formBuilder.group({
      title: new FormControl('',
        [Validators.required]),
      date: new FormControl('',
        [Validators.required]),
      description: new FormControl('',
        [Validators.required]),
      category: new FormControl('',
        [Validators.required]),
      location: new FormControl('',
        [Validators.required]),
      price: new FormControl('',
        [Validators.required]),
    });
  }

  get title() {
    return this.checkoutFromGroup.get('title');
  }

  get date() {
    return this.checkoutFromGroup.get('date');
  }

  get description() {
    return this.checkoutFromGroup.get('description');
  }

  get category() {
    return this.checkoutFromGroup.get('category');
  }

  get location() {
    return this.checkoutFromGroup.get('location');
  }

  get price() {
    return this.checkoutFromGroup.get('price');
  }

  onSelect(event: NgxDropzoneChangeEvent): void {
    const file = event.addedFiles[0];
    if (!file.type.startsWith('image/')) {
      this.imageError = 'Only image files are allowed.';
      return;
    }

    this.imageFile = file;
    this.imageError = null;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onRemove(): void {
    this.imageFile = null;
    this.imagePreview = '';
  }

  onCategoryChange() {
    const selectedName = this.checkoutFromGroup.get('category')?.value;
    for (let i = 0; i < this.categories.length; i++) {
      if (selectedName == this.categories[i].name) {
        this.selectedCategory = this.categories[i];
      }
    }
  }


}
