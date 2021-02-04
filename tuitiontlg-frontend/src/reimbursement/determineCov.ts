import React from 'react';
import {Coverage} from '../system/coverage';


function determineCov(covType: string, cost: number, availR: number){
    let coverage: number = 0;
    let percentage = new Coverage();

    console.log('DetermineCov Type: ', covType);
    console.log('DetermineCover Cost: ', cost);

    if(covType === 'University Course'){
        coverage = percentage.universityCourse;
    }else if(covType === 'Seminar' ){
        coverage = percentage.seminar;
    }else if(covType === 'Certification'){
        coverage = percentage.certification;
    }else if(covType === 'Certification Preparation Class'){
        coverage = percentage.certPrepClass;
    }else if(covType === 'Technical Training'){
        coverage = percentage.techTraining;
    }else if(covType === 'Other'){
        coverage = percentage.other;
    }

    console.log('Coverage after statement:', coverage);
    cost = cost * coverage;
    
    console.log('Cost before comparison: ', cost);
    console.log('Available R: ', availR);
    if(cost > availR){
        cost = availR;
    }
    
    console.log('Cost after comparison: ', cost);
    return cost;
}

export default determineCov;