import { LightningElement, api,track } from "lwc";
export default class Child extends LightningElement {
    @api selectedOptions = ['2','3'];
   @track changedOptions = [
      {label: 'Monday',value: '1',status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},
      {label: 'Tuesday',value: '2' ,status:'Pending',icon:'standard:task2',variant:'slds-badge slds-theme_warning'},
      {label: 'Wednesday',value: '3' ,status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},
      {label: 'Thursday',value: '4',status:'Not Started',icon:'standard:task2',variant:'slds-badge slds-theme_error'},
      {label: 'Friday',value: '5',status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},
      {label: 'Saturday',value: '6',status:'Pending',icon:'standard:task2',variant:'slds-badge slds-theme_warning'},
      {label: 'Sunday',value: '7',status:'Completed',icon:'standard:task2',variant:'slds-badge slds-theme_success'},  
   ];  
 
   @track options = [];
   @track iconName = 'standard:account';
   @api labelName;
    
    
    searchInput ='';   
    isDialogDisplay = false; 
    isDisplayMessage = false; 

    get globalSelectedItems(){
      let temp = this.changedOptions.filter(e=> e.ischecked === true);
      return temp;
    }

    connectedCallback(){
        this.changedOptions = this.changedOptions.map(ele =>{
          return {
            ...ele,
            ischecked : this.selectedOptions && this.selectedOptions.indexOf(ele.value)>-1 ? true :false
          }
        })

        this.options = this.changedOptions;
    }  
    

    handleinput(){       
          this.isDialogDisplay = true;
          this.isDisplayMessage = false;
    }

    onchangeSearchInput(event){
        this.searchInput = event.target.value;
        if(this.searchInput.trim().length>0){         
          this.options = this.changedOptions.filter(ele => ele.label.includes(this.searchInput));
        }else if(!this.searchInput){
          this.options = this.changedOptions;
          this.isDisplayMessage = false;
          this.isDialogDisplay = true
        }

        if(this.options.length === 0 ){ 
            this.isDialogDisplay = false;
            this.isDisplayMessage = true;
        }       
    }

  handleselectAll(event){  
      for( const opt of this.changedOptions){
        opt.ischecked = event.target.checked;
      }
  }

  handleOptionselection(event){
      let temp = this.changedOptions.map(e =>e.value === event.currentTarget.dataset.value
      ? { ...e, ischecked: event.target.checked }: e );

      this.changedOptions = temp   
}

handleCancelClick(){
   this.isDialogDisplay = false;
}

handleDoneClick(){      
    console.log('Final data after',JSON.parse(JSON.stringify(this.globalSelectedItems)));
    this.isDialogDisplay = false;
}

handlePillRemoveRecord(event){
   let temp = this.changedOptions.map(e =>e.value === event.currentTarget.dataset.value
      ? { ...e, ischecked: false }: e );

      this.changedOptions = temp  
}

}