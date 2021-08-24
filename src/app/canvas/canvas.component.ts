import { Component, Input, OnInit } from '@angular/core';
import { ECircleCount } from "../enums/circle-count.enum";
import { LocalStorageService } from "../services/storage.service";
import { IProject } from "../interfaces/project.interface";
import { ICircle } from "../interfaces/circle.interface";
import { IuserInfo } from '../interfaces/iuserInfo';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  @Input() user!: IuserInfo;
  users?: {[key: string] : IuserInfo};
  user_email?: string;
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  selectedProject?:any;
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';

  constructor(private storage: LocalStorageService) { }

  ngOnInit(): void {
    let users = this.storage.get('users');
    if (users) {
      this.users = JSON.parse(users);
    }
    
    this.projectList = this.user?.circlesProject || [];
  }

  onGenerateCircles(): void {
    this.resetColors()
  }

  onSizeSelect(): void {
    if (this.circles.length) {
      this.resetColors()
    }
  }

  onCircleClick(circle: ICircle): void {
    if (this.circles[circle.id].color && this.circles[circle.id].color === this.currentColor) {
      this.circles[circle.id].color = '';
    }else{
      this.circles[circle.id].color = this.currentColor;
    }
  }

  onResetColor(): void {
    if (this.circles.length) {
      this.resetColors();
    }
  }

  resetColors(): void {
    if (this.selectedProject) {
      this.selectedProject = null;
    }
    this.projectName = '';
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      this.circles.push({
        id: i,
        uid: this.newId(),
        color: '',
      });
    }
  }

  onFillCircles(): void {
    if (!this.circles.length) {
      return;
    }

    this.circles.forEach((item) => item.color = this.currentColor);
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  onSave(): void {
    if (!this.circles.length || !this.projectName) {
      return;
    }
    
    let circleInstance = [...this.circles];
    let users = Object.assign({}, this.users);

    if (this.selectedProject) {
      this.projectList.forEach(item => {
        if(item.id === this.selectedProject?.id){
          item.name = this.projectName;
          item.circles = circleInstance;
        }
      });
    }else{
      this.projectList.push({
        id: this.newId(),
        name: this.projectName,
        circles: circleInstance,
      })
    }
    
    users[this.user.email].circlesProject = this.projectList;
    
    this.storage.set('users', JSON.stringify(users));
    this.resetColors();
  }

  selectProject(project: IProject): void {
    this.selectedProject = project;
    this.circles = this.selectedProject?.circles;
    this.projectName = this.selectedProject?.name;
  }

  removeProject(index: number) {
    let users = Object.assign({}, this.users);
    this.projectList.splice(index, 1);
    users[this.user.email].circlesProject = this.projectList;
    this.storage.set('users', JSON.stringify(users));
    this.resetColors();
  }
}
