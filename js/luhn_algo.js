let resultContainer = document.getElementById('result');
let form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', function(e){

    e.preventDefault();

    const inputValue = document.getElementById('number').value;
    if(!inputValue) return ;

    //regex to filter out invalid input
    let regex = /(\d{2,})(\s)?(\d{3,4})?(\s)?(\d{3,4})?(\s)?(\d{3,4})?(\s)?/g;
    
   
    if(regex.test(inputValue)){ 
    
     //strip whitespace from input
    let pattern = /\s/g;
    
    var card_number = inputValue.replace(pattern, '');

    }
    else{
        alert('invalid input, number should not be less than 2 digits'); 
    }

    //set the html content to be displayed based on the validity of the card number
    isLuhn(card_number) ?
    resultContainer.innerHTML = `<p>${inputValue} is valid  \u{1F389} \u{1F389} </p>` : 
    resultContainer.innerHTML = `<p>${inputValue} is  not valid  \u{1F641} \u{1F915}</p>` ;

})


const isLuhn = number => {
    let individualNumbers = number.split('');

    // get sum of digits at odd index positions from the right, starting from the check digit
    const checkDigitSum = individualNumbers.reduceRight((acc,num,i)=>{
        if(i%2 !== 0){
        return  acc + parseInt(num)
        }
        return acc
            
    }, 0)

    //split the param into atomic bits and add the atomic bits
    const processNum = num => {
        let bit = num.split('');

        let bitSum = bit.reduce((acc,val)=> acc + parseInt(val), 0);

        return bitSum;
    }

    // get sum of the product of digits times two(2) at even index positions from the right
    const evenPositionSum = individualNumbers.reduceRight((acc,num,i) => {

                if(i%2 ==0){
                    if(num*2 > 9){
                    return acc + processNum((String(num*2)))
                    }
                    else{
                        return acc + parseInt(num*2);
                    }
                }
                return acc;
        }, 0)

        let result  = evenPositionSum + checkDigitSum;
        console.log(result)
        return result%10 === 0 ? true : false;
}

 


    
