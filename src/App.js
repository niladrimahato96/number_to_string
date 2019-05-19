import React from 'react';
import logo from './logo.svg';
import QRCode from 'qrcode.react';
import './App.css';

class App extends React.Component {
  state = {
    inputValue: '',
    stringValue: '',
    error: false
  }

  ones = (val) => {
    let ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    
    let stringNumber = ''
    let num = ones.map((number, index) => {
      if(val === index){
        stringNumber = number;
      }
    });

    if(stringNumber === 'zero'){
      stringNumber = '';
    }
    return stringNumber;
  }

  tens = (val) => {
    let tens = ['zero','ten', 'twenty' , 'thirty', 'forty' ,'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    let stringNumber = '';
    
    let num = tens.map((number, index) => {
      if(val === index){
        stringNumber = number;
      }
    });
    return stringNumber;
  }

  tensRest = (val) => {
    let tensRest = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
    
    let stringNumber = ''
    let num = tensRest.map((number, index) => {
      if(val === index){
        stringNumber = number;
      }
    });
    return stringNumber;
  }

  large = (val) => {
    let large = ['hundred', 'thousand', 'lakh', 'crore'];
    let largeNumString = '';
    let largeNum = large.map((num, index) =>{
      if((val - 3) == index){
        largeNumString = num;
      }
    });
    console.log(largeNum);
    return largeNumString;
  }


  tensHandler = (integerValue) => {
    console.log(integerValue);
    if(integerValue < 20){
      return this.tensRest(integerValue-10); 
    }else{
      let tensPlace = this.tens(Math.floor(integerValue/10));
      let onesPlace = this.ones(integerValue%10);
      console.log(tensPlace + ' ' + onesPlace);
      return tensPlace + ' ' + onesPlace;
    }
  }

  setInputHandler = (val) => {
    let x = val.target.value.toString().length;
    let integerValue = parseInt(val.target.value);
     
    if((integerValue < 100000) && (integerValue > 0)){
      this.setState({error: false});
      let stringValue = '';
    switch(x){
      case 1:
        let number = this.ones(integerValue);
        stringValue = number;
        break;
        
      case 2:
        let onesPlaceNumber = integerValue%10;
        if(onesPlaceNumber === 0){
          let numberTen = this.tens(integerValue/10);
          stringValue = numberTen;
        }else{
          stringValue = this.tensHandler(integerValue);
        }
        break;

      case 3:
        let onesPlaceThree = integerValue%10;
        let tensPlaceThree = Math.floor(integerValue/10)%10;
        let hundredsPlaceThree = Math.floor(integerValue/100);
        if((onesPlaceThree === 0) && (tensPlaceThree === 0)){
          stringValue = this.ones(hundredsPlaceThree) + " " + this.large(x); 
        }else{
          if(tensPlaceThree === 0){
            stringValue = this.ones(hundredsPlaceThree) + " " + this.large(x) + " " + this.ones(onesPlaceThree); 
          }else if(onesPlaceThree === 0){
            stringValue = this.ones(hundredsPlaceThree) + " " + this.large(x) + " " + this.tens(tensPlaceThree);
          }else{
            let combineNumber = tensPlaceThree+ " "+onesPlaceThree;
            combineNumber = combineNumber.replace(/ +/g, "");
            combineNumber = parseInt(combineNumber);
           stringValue = this.ones(hundredsPlaceThree) + " " + this.large(x) + " " + this.tensHandler(combineNumber);
          }
        }
        break;
      case 4:
        let onesPlaceFour = integerValue%10;
        let tensPlaceFour = Math.floor(integerValue/10)%10;
        let hundredsPlaceFour = Math.floor(integerValue/100)%10;
        let thousandPlaceFour = Math.floor(integerValue/1000);
        
        if((hundredsPlaceFour === 0) && (tensPlaceFour === 0) && (onesPlaceFour === 0)){
          stringValue = this.ones(thousandPlaceFour) + " " + this.large(x);
        }else if((hundredsPlaceFour === 0) && (tensPlaceFour === 0)){
          stringValue = this.ones(thousandPlaceFour) + " " + this.large(x) + " " + this.ones(onesPlaceFour);
        }else{
          if(hundredsPlaceFour === 0){
            let combineNumberFour = tensPlaceFour+ " "+onesPlaceFour;
            combineNumberFour = combineNumberFour.replace(/ +/g, "");
            combineNumberFour = parseInt(combineNumberFour);
            stringValue = this.ones(thousandPlaceFour) + " " + this.large(x) + " " +this.tensHandler(combineNumberFour);
          }else if(tensPlaceFour === 0){
            stringValue = this.ones(thousandPlaceFour) + " " + this.large(x) + " " + this.ones(hundredsPlaceFour) + " " + this.large(x - 1) + " " + this.ones(onesPlaceFour);
          }else{
            let combineNumberFour = tensPlaceFour+ " "+onesPlaceFour;
            combineNumberFour = combineNumberFour.replace(/ +/g, "");
            combineNumberFour = parseInt(combineNumberFour);

            stringValue = this.ones(thousandPlaceFour) + " " + this.large(x) + " " + this.ones(hundredsPlaceFour) + " " + this.large(x - 1) + " " + this.tensHandler(combineNumberFour);
          }
        }
        
        break;
      case 5:
        let onesPlaceFive = integerValue%10;
        let tensPlaceFive = Math.floor(integerValue/10)%10;
        let hundredsPlaceFive = Math.floor(integerValue/100)%10;
        let thousandPlaceFive = Math.floor(integerValue/1000)%10;
        let tensThousandPlaceFive = Math.floor(integerValue/10000);
        
        let combineNumberFive = tensThousandPlaceFive+ " "+ thousandPlaceFive;
            combineNumberFive = combineNumberFive.replace(/ +/g, "");
            combineNumberFive = parseInt(combineNumberFive);
        if(((thousandPlaceFive === 0) && (hundredsPlaceFive === 0) && (tensPlaceFive === 0) && (onesPlaceFive === 0)) || ((hundredsPlaceFive === 0) && (tensPlaceFive === 0) && (onesPlaceFive === 0))){
            
          stringValue = this.tensHandler(combineNumberFive) + " " + this.large(x - 1);
        }else if((hundredsPlaceFive === 0) && (tensPlaceFive === 0)){
          stringValue = this.tensHandler(combineNumberFive)  + " " + this.large(x - 1) + " " + this.ones(onesPlaceFive);
        }else if((hundredsPlaceFive === 0)){
          let combineNumberTensFive = tensPlaceFive+ " "+ onesPlaceFive;
            combineNumberTensFive = combineNumberTensFive.replace(/ +/g, "");
            combineNumberTensFive = parseInt(combineNumberTensFive);
          stringValue = this.tensHandler(combineNumberFive)  + " " + this.large(x - 1) + " " + this.tensHandler(combineNumberTensFive);
        }else{
          if(tensPlaceFive === 0){
            stringValue = this.tensHandler(combineNumberFive)  + " " + this.large(x - 1) + " " + this.ones(hundredsPlaceFive) + " " + this.large(x - 2) + " " + this.ones(onesPlaceFive);
          }else{
            let combineNumberTensFive = tensPlaceFive+ " "+ onesPlaceFive;
            combineNumberTensFive = combineNumberTensFive.replace(/ +/g, "");
            combineNumberTensFive = parseInt(combineNumberTensFive);
            stringValue = this.tensHandler(combineNumberFive)  + " " + this.large(x - 1) + " " + this.ones(hundredsPlaceFive) + " " + this.large(x - 2) + " " + this.tensHandler(combineNumberTensFive);
          }
        }

        break;
      default:
        break;
    }


      
      this.setState({
        inputValue: val.target.value,
        stringValue: stringValue
      });

    }else{
      this.setState({inputValue: '', stringValue: '', error: !this.state.error});
    }
    
    
    
    
  }

  render(){
    return (
      <div className="App" style={{marginTop: '10%'}} >
        {/* <QRCode  bgColor="#cccccc" level="M" value="ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c" /> */}
        <input style={{
          textAlign: 'center',
          border: '3px solid #505f9f',
          padding: '5px',
          borderRadius: '10px',
          textIndent: '6px',
          color: '#515151',
          boxShadow: '0px 6px 6px #0d0d0d47',
          outline: 'none',
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '1px',
        }} type="text" onChange={this.setInputHandler} value={this.state.inputValue}/>
        <p style={{
          color: '#e95555',
          fontSize: '13px',
          fontFamily: 'monospace',
          fontWeight: '800',
        }}>{this.state.error ? '0 < Input < 1 Lakh' : ''}</p>
        <p style={{
              fontFamily: 'monospace',
              fontSize: '20px',
              color: '#7a97e7',
              fontWeight: '600',
        }}>{this.state.stringValue}</p>
  
      </div>
    );
  }
}

export default App;
