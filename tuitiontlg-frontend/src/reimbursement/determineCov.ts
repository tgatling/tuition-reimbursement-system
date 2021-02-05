import React from 'react';
import {Coverage} from '../system/coverage';

// Calculation based on event type and specified percentages for each
function determineCov(covType: string, cost: number, availR: number){
    let coverage: number = 0;
    let percentage = new Coverage();

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

    cost = cost * coverage;
    
    if(cost > availR){
        cost = availR;
    }
    
    return cost;
}

export default determineCov;