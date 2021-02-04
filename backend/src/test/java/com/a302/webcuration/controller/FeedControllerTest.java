package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseControllerTest;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class FeedControllerTest extends BaseControllerTest {
    @Test
    public void 피드_성공() throws Exception{
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTI4NTA3ODEsImFjY291bnRJZCI6MjAsImFjY291bnRFbWFpbCI6ImRudGpyNDc3MkBuYXZlci5jb20ifQ.2GdyblKPOqCBXnCQoxMYCan3bAkVTE4QY216KjexqEI";
        mockMvc.perform(get("/api/feed")
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}