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
    public void Sample_생성_성공() throws Exception {
        //When
        SampleDto.RegSampleRequest regSampleRequest = SampleDto.RegSampleRequest.builder()
                .userName("park")
                .userAge(30)
                .userEmail("test@test.com")
                .build();

        mockMvc.perform(post("/api/sample/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(regSampleRequest)))
                .andExpect(status().isCreated())
                .andDo(print());

    }

    @Test
    public void Sample_생성_실패_404() throws Exception {
        //When
        SampleDto.RegSampleRequest regSampleRequest = SampleDto.RegSampleRequest.builder()
                .userName("")
                .userAge(30)
                .userEmail("123")
                .build();

        mockMvc.perform(post("/api/sample/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(regSampleRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());

    }

    @Test
    //@TestDescription("아무런 값도 들어오지 않는 경우")
    public void createTodolist_Bad_Request_Empty_Input() throws Exception {

        SampleDto.RegSampleRequest regSampleRequest = SampleDto.RegSampleRequest.builder().build();

        mockMvc.perform(post("/api/sample")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(regSampleRequest)))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

}