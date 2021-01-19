package com.a302.webcuration.domain.Sample;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class SampleValidator {

    public void validate(SampleDto.RegSampleRequest regSampleRequest, Errors errors)
    {
        if(regSampleRequest.getUserAge()<0)
        {
            errors.rejectValue("userAge","wrongValue","나이는 0보다 작을 수 없습니다.");
        }
    }
}
