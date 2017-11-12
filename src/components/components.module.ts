import { NgModule } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard';
import { QuestionCardComponent } from './question-card/question-card';


@NgModule({
	declarations: [GameboardComponent,
    QuestionCardComponent,
    ],
	imports: [],
	exports: [GameboardComponent,
    QuestionCardComponent,
    ]
})
export class ComponentsModule {}
