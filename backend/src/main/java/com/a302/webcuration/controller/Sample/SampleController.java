package com.a302.webcuration.controller.Sample;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Sample.Sample;
import com.a302.webcuration.domain.Sample.SampleDto;
import com.a302.webcuration.domain.Sample.SampleRepository;
import com.a302.webcuration.domain.Sample.SampleValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/sample")
public class SampleController {
    private final SampleRepository sampleRepository;
    private final SampleValidator sampleValidator;

    public SampleController(SampleRepository sampleRepository, SampleValidator sampleValidator) {
        this.sampleRepository = sampleRepository;
        this.sampleValidator = sampleValidator;
    }

    //Test 생성 단축키 : ctrl + shift + t
    @PostMapping
    public ResponseEntity regSample(@RequestBody @Valid SampleDto.RegSampleRequest regSampleRequest, Errors errors)
    {
        //데이터 바인딩 과정에서 error 발생(ex.id 같은 입력될 수 없는 값이 들어와서 데이터를 바인딩할 수 없는 경우)
        if(errors.hasErrors())
        {
            return ResponseEntity.badRequest().body(errors);
        }

        //유효성 검사
        sampleValidator.validate(regSampleRequest,errors);

        //유효하지 않은 값이 입력되는 경우 (ex. 나이에 -1값이 들어오는 경우) + xxValidator 에서 체크한다.
        if(errors.hasErrors())
        {
            return ResponseEntity.badRequest().body(errors);
        }

        //DTO -> Entity
        Sample sample = regSampleRequest.toEntity();

        //Repo에 저장
        this.sampleRepository.save(sample);

        //정상 작동 메세지 전달
        return ResponseEntity.ok().body(sample);

    }


}
