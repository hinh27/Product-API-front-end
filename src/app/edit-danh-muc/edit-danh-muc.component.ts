import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DanhMucService} from '../danh-muc.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-danh-muc',
  templateUrl: './edit-danh-muc.component.html',
  styleUrls: ['./edit-danh-muc.component.css']
})
export class EditDanhMucComponent implements OnInit {
  category: any;
  id: number;
  message = '';
  isShow = false;
  isSuccess = true;

  formGroup = new FormGroup({
    categoryName: new FormControl(),
    categoryGia: new FormControl(),
    categoryLoai: new FormControl(),
    categoryDescription: new FormControl(),
    categoryId: new FormControl()
  });

  constructor(private categoryService: DanhMucService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe(params => {
      console.log(params);
      const idSearch = params.get('id');
      this.categoryService.findById(idSearch).subscribe(
        category => {
          this.category = category;
          console.log(this.category);
          this.formGroup.controls.categoryName.setValue(this.category.name);
          this.formGroup.controls.categoryGia.setValue(this.category.gia);
          this.formGroup.controls.categorylastName.setValue(this.category.loai);
          this.formGroup.controls.categoryDescription.setValue(this.category.description);
          this.id = Number(idSearch);
        }
      );
    });

  }

  edit() {
    const name = this.formGroup.get('categoryName').value;
    const gia = this.formGroup.get('categoryGia').value;
    const loai = this.formGroup.get('categorylastName').value;
    const description = this.formGroup.get('categoryDescription').value;
    this.categoryService.editCategory(name, gia, loai, description, this.id).subscribe(result => { // status: 200
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Sửa thành công!';
      this.formGroup.reset();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Sửa thất bại!';
      this.formGroup.reset();
    });
  }


}
