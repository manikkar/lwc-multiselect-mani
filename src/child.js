import { LightningElement, api } from "lwc";
import {options} from './data.js';
export default class Child extends LightningElement {
    
  options = options;
  selectedList = [];

  handleselectAll(event){
    const toggleList = this.template.querySelectorAll('[data-all-options^="toggle"]');
      for (const toggleElement of toggleList) {
          toggleElement.checked = event.target.checked;
      }
      this.selectedList = event.target.checked ? options : [];
  }

  handleOptionselection(event){
    const toggle = this.template.querySelectorAll('[data-checkall^="checkall"]');

    let temp = this.selectedList.filter(ele => ele.value === event.currentTarget.dataset.value);
    
    if(temp.length === 0){
      this.selectedList.push({
          label : event.currentTarget.dataset.label,
          value : event.currentTarget.dataset.value
                          })
    }else{
        this.selectedList = this.selectedList.filter(ele => ele.value !== event.currentTarget.dataset.value);
    }

    toggle[0].checked = this.selectedList.length === this.options.length ? true : false; 
    
    console.log('selected list',selectedList);
}
}