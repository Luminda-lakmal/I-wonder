import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  nameForm!: FormGroup;
  greeting = "";
  imageUrl = "";
  expression = "";
  hideImage = true;
  constructor(private appService: AppService){

  }
  ngOnInit(): void {
      this.nameForm = new FormGroup({
        name: new FormControl('')
      })
  }

  submit(){
    if(this.nameForm.valid){
      const name = this.nameForm.get('name')?.value;
      this.appService.getGreeting(name).subscribe(
        data => {
          this.greeting = data.message;
        }
      )
    }
  }

  getImage(){
    console.log("image");
    
    this.appService.getNasaImageUrl().subscribe(
      data => {
        this.imageUrl = data;
        this.hideImage = false;
        console.log("inage data", this.imageUrl);
        
      }
    )
  }
}
