import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SortingVisualiserComponent } from './sorting-visualiser/sorting-visualiser.component';
import { PathFinderVisualiserComponent } from './path-finder-visualiser/path-finder-visualiser.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FormsModule
} from '@angular/forms';

import { 
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSliderModule, 
  MatButtonModule
} from '@angular/material';
import { AlgorithmVisualiserComponent } from './algorithm-visualiser/algorithm-visualiser.component';

@NgModule({
  declarations: [
    AppComponent,
    SortingVisualiserComponent,
    ControlPanelComponent,
    PathFinderVisualiserComponent,
    AlgorithmVisualiserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
