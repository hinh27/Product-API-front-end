import {Component, OnInit} from '@angular/core';
import {DanhMucService} from '../danh-muc.service';
import {publish} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.css']
})
export class DanhMucComponent implements OnInit {

  categories: any[];
  message = '';
  isShow = false;
  isSuccess = true;
  formGroup = new FormGroup({
    categoryId: new FormControl()
  });
  name: any;

  constructor(private categoryService: DanhMucService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(result => {
      this.categories = result;
    });
  }

  public delete(id: number) {
    this.categoryService.deleteCategory(id).subscribe(result => { // status: 200
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Xóa thành công!';
      this.formGroup.reset();
      this.categoryService.getCategory().subscribe(result1 => {
        this.categories = result1;
      });
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Xóa thất bại!';
      this.formGroup.reset();
    });
  }

  public update(id: number) {
    this.categoryService.findById(id).subscribe(result => {
      this.categories = result;
    });
  }

  Search() {
    if (this.name !== '') {
    } else  if (this.name === ''){
      this.ngOnInit();
    }
    this.categories = this.categories.filter(res => {
      return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
    });
  }
}
