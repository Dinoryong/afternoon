package com.a302.webcuration.controller.Sample;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Sample.SampleDto;
import com.a302.webcuration.domain.Sample.SampleRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class SampleControllerTest extends BaseControllerTest {

    @Autowired
    SampleRepository sampleRepository;

    @Test
    public void Sample_생성성공() throws Exception {
        //When
        SampleDto.RegSampleRequest regSampleRequest = SampleDto.RegSampleRequest.builder()
                .userName("park")
                .userAge(-1)
                .build();

        mockMvc.perform(post("/api/sample/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(regSampleRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());

    }

}