import { LightningElement } from "lwc";

export default class App extends LightningElement {

   selectedOptions  = ['2','3','4'];
   changedOptions = [
      {label: 'Monday',value: '1',status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},
      {label: 'Tuesday',value: '2' ,status:'Pending',icon:'standard:task2',variant:'slds-badge slds-theme_warning'},
      {label: 'Wednesday',value: '3' ,status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},
      {label: 'Thursday',value: '4',status:'Not Started',icon:'standard:task2',variant:'slds-badge slds-theme_error'},
      {label: 'Friday',value: '5',status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},
      {label: 'Saturday',value: '6',status:'Pending',icon:'standard:task2',variant:'slds-badge slds-theme_warning'},
      {label: 'Sunday',value: '7',status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},  
   ]; 

   changedOptions2 = [
      {label: 'Monday',value: '1',},
      {label: 'Tuesday',value: '2' },
      {label: 'Wednesday',value: '3' },
      {label: 'Thursday',value: '4'},
      {label: 'Friday',value: '5'},
      {label: 'Saturday',value: '6'},
      {label: 'Sunday',value: '7'},  
   ];   
  
   iconName // = 'standard:account';
   labelName = 'Custom Multi-Select Picklist';
   enableFreeText = false;
   enableSelectAll = true;
    
  handleSelectedValues(event){
    console.log('json',JSON.parse(JSON.stringify(event.detail)))
  }
}
