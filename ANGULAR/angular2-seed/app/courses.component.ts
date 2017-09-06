import {Component} from 'angular2/core';
import {CoursesService} from './courses.service';

@Component({
    selector: 'courses',
    template: `
        <h1>{{ title }}</h1>
        <ul>
            <li *ngFor="#course of courses">{{ course }}</li>
        </ul>
    `,
    providers: [CoursesService]
})

export class CoursesComponent { 
    title = "This is the courses page title";    
    courses;

    constructor(courseService: CoursesService){
        this.courses = courseService.getCourse();
    }
}