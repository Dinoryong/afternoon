package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class SearchControllerTest extends BaseControllerTest {
    @Test
    public void Account_검색_성공() throws Exception {
        String nickname="GS재웅";
        mockMvc.perform(get("/api/search/" +nickname)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}