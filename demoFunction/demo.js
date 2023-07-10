const data = (info) =>{
    if (info === 'agr') {
        console.log('Agreement data');
    }
    else if(info === 'pay'){
        console.log('Payment data');
    }
    else{
        console.log('value not define');
    }
}

data('pay');

