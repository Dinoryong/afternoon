package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import com.a302.webcuration.domain.Account.AccountDto;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AccountControllerTest extends BaseControllerTest {

    @Test
    public void follow_성공() throws Exception {

        //When
        AccountDto.FollowRequest followRequest = AccountDto.FollowRequest.builder()
                .aId(1L)
                .bId(2L)
                .build();

        mockMvc.perform(post("/api/account/follow")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(followRequest)))
                .andExpect(status().isOk())
                .andDo(print());

    }

}