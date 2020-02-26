import {Component, OnInit} from '@angular/core';
import {DanhMucService} from '../danh-muc.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-them-danh-muc',
  templateUrl: './them-danh-muc.component.html',
  styleUrls: ['./them-danh-muc.component.css']
})
export class ThemDanhMucComponent implements OnInit {
  message = '';
  isShow = false;
  isSuccess = true;
  formGroup = new FormGroup({
    categoryName: new FormControl(),
    categoryGia: new FormControl(),
    categoryLoai: new FormControl(),
    categoryDescription: new FormControl()
  });

  constructor(private categoryService: DanhMucService) {
  }

  ngOnInit() {
  }

  save() {
    const name = this.formGroup.get('categoryName').value;
    const gia = this.formGroup.get('categoryGia').value;
    const loai = this.formGroup.get('categoryLoai').value;
    const description = this.formGroup.get('categoryDescription').value

    this.categoryService.addCategory(name, gia, loai, description).subscribe(result => { // status: 200
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Thêm thành công!';
      this.formGroup.reset();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Thêm thất bại!';
      this.formGroup.reset();
    });
  }


}
