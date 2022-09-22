import { LightningElement, api,track } from "lwc";
export default class Child extends LightningElement {
    @api selectedOptions;
   @api options;  
   @api iconName = 'standard:account';
   @api labelName;
   @api enableFreeText = false;
   @api enableSelectAll = false;


    @track previousValues = [];   
    @track runningOptions = [];
    searchInput ='';   
    isDialogDisplay = false; 
    isDisplayMessage = false; 
    _showFreeText = false;
freeText;

    
    connectedCallback(){
        this.options = this.options.map(ele =>{
          return {
            ...ele,
            ischecked : this.selectedOptions && this.selectedOptions.indexOf(ele.value)>-1 ? true :false
          }
        })

        this.runningOptions =[].concat(this.options)
        // to reset values while closing
        this.previousValues = [].concat(this.options);
    }  
    

    handleinput(){       
          this.isDialogDisplay = true;
          this.isDisplayMessage = false;
    }

    onchangeSearchInput(event){
        this.searchInput = event.target.value;
        if(this.searchInput.trim().length>0){         
          this.runningOptions = this.options.filter(ele => ele.label.includes(this.searchInput));
        }else if(!this.searchInput){
          this.runningOptions = this.options;
          this.isDisplayMessage = false;
          this.isDialogDisplay = true
        }
        if(this.runningOptions.length === 0 ){ 
            this.isDialogDisplay = false;
            this.isDisplayMessage = true;
        }       
    }

  handleselectAll(event){  
      for( const opt of this.options){
        opt.ischecked = event.target.checked;
      }
      this.runningOptions =[].concat(this.options);
  }

  handleOptionselection(event){
       const toggle = this.template.querySelectorAll('[data-checkall^="checkall"]');      
      this.options = this.options.map(e =>e.value === event.currentTarget.dataset.value
      ? { ...e, ischecked: event.target.checked }: e );  
      this.runningOptions = this.options;
      if(enableSelectAll){
          //check for all checked or Not
        let temp = this.options.filter(ele => ele.ischecked === false);
        console.log('temp',temp)
        toggle[0].checked = temp.length > 0 ? false : true; 
      }     
}


handleOtheroption(event){
  this._showFreeText = event.target.checked;
}
handleFreeText(event){
  this.freeText = event.target.value;  
}
addNewValuetoList(){
  if(this.freeText){
    this.options.push({label : this.freeText, value : this.freeText ,ischecked:true});
    this.runningOptions = [].concat(this.options);
    const toggle = this.template.querySelectorAll('[data-other^="other"]');
    toggle[0].checked = this._showFreeText = false;
    this.freeText = '';
  }    
}

get globalSelectedItems(){     
      return this.options.filter(e=> e.ischecked === true);
    }

handleCancelClick(){
   this.isDialogDisplay = false;
   this.options = [].concat(this.previousValues);
   this.runningOptions = [].concat(this.previousValues)
}

handleDoneClick(){      
    this.isDialogDisplay = false;
    this.callDispatchEvent();
}


handlePillRemoveRecord(event){
   this.options = this.options.map(e =>e.value === event.currentTarget.dataset.value
      ? { ...e, ischecked: false }: e );
    this.runningOptions = this.options;
     this.callDispatchEvent();
}

callDispatchEvent(){    
        const evtCustomEvent = new CustomEvent('selected', {   
            detail: this.globalSelectedItems
            });
        this.dispatchEvent(evtCustomEvent);
 }

}